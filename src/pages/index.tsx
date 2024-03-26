import { TradeData, fetchTradeData } from "@/lib/web3";
import React, { ChangeEvent, FormEvent, useState } from "react";
import TradeTable from "./listTable";

export default function Home() {
  const [contractAddress, setContractAddress] = useState('');
  const [tradeData, setTradeData] = useState<TradeData[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fetchedTradeData: TradeData[] = await fetchTradeData(contractAddress);
    setTradeData(fetchedTradeData);
    console.log(fetchedTradeData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContractAddress(event.target.value);
  };

  return (
    <div>
      <div className="">
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="contractAddress" className="block text-sm font-medium text-gray-700 mb-2">Contract Address</label>
        <input
          type="text"
          id="contractAddress"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter contract address"
          value={contractAddress}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </form>
      </div>
    
    <TradeTable tradeData={tradeData}/>
    </div>
  );
}
