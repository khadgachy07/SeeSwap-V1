import Web3 from "web3";
import pairABI from "../constant/pairAbi.json";

const web3 = new Web3(
  "wss://eth-mainnet.g.alchemy.com/v2/hjW_pAvF0PuZS3SRnT4t9K3STzOZ2sZD"
);

export interface TradeData {
  date: Number | Date;
  tradeType: string;
  token0Volume: number;
  token1Volume: number;
  transactor: string;
  transactionHash: string;
}

export async function fetchTradeData(
  pairAddress: string
): Promise<TradeData[]> {
  try {
    const contract = new web3.eth.Contract(pairABI, pairAddress);
    const tradeInfo: TradeData[] = [];
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const events = await contract.getPastEvents("Swap", {
      fromBlock: Number(latestBlockNumber) - 15000,
      toBlock: latestBlockNumber,
    });

    const eventPromises = events.map(async (event) => {
      const transaction = await web3.eth.getTransaction(event.transactionHash);
      const block = await web3.eth.getBlock(transaction.blockNumber);
      const date: Date = new Date(Number(BigInt(block.timestamp) * BigInt(1000)));

      // const eventTimestamp = BigInt(block.timestamp) * BigInt(1000);
      // const currentTimestamp = Date.now();
      // const timeDifferenceMs = Number(currentTimestamp) - Number(eventTimestamp);
      
      // // Convert milliseconds to days
      // const minutesAgo = Math.floor(timeDifferenceMs / (1000 * 60));

      const tradeType = event.returnValues.amount0In > 0 ? "Buy" : "Sell";
      const token0Volume =
        tradeType === "Buy"
          ? Number(event.returnValues.amount0In)
          : Number(event.returnValues.amount0Out);
      const token1Volume =
        tradeType === "Buy"
          ? Number(event.returnValues.amount1Out)
          : Number(event.returnValues.amount1In);

      const tradeData: TradeData = {
        date,
        tradeType,
        token0Volume,
        token1Volume,
        transactor: event.returnValues.sender,
        transactionHash: event.transactionHash,
      };
      return tradeData;
    });

    return await Promise.all(eventPromises);
  } catch (error) {
    console.error("Error retrieving trade data:", error);
    throw error;
  }
}
