// TradeTable.tsx
import Link from 'next/link';
import { TradeData } from '../../lib/web3'

interface TradeTableProps {
  tradeData: TradeData[];
}

const TradeTable: React.FC<TradeTableProps> = ({ tradeData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-100">Date</th>
            <th className="px-4 py-2 bg-gray-100">Type</th>
            <th className="px-4 py-2 bg-gray-100">Token 0 Volume</th>
            <th className="px-4 py-2 bg-gray-100">Token 1 Volume</th>
            <th className="px-4 py-2 bg-gray-100">Transactor</th>
            <th className="px-4 py-2 bg-gray-100">Transaction Link</th>
          </tr>
        </thead>
        <tbody>
          {tradeData.map((trade, index) => (
            
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border px-4 py-2">{trade.date.toLocaleString()}</td>
              <td className="border px-4 py-2">{trade.tradeType}</td>
              <td className="border px-4 py-2">{trade.token0Volume}</td>
              <td className="border px-4 py-2">{trade.token1Volume}</td>
              <td className="border px-4 py-2">{trade.transactor}</td>
              <td className="border px-4 py-2">
                <Link href={`https://etherscan.io/tx/${trade.transactionHash}`}>
                  <h3>View Transaction</h3>
                </Link>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeTable;
