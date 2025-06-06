// TransactionTable.js
export default function TransactionTable() {
  const transactions = [
    { id: '#0025', desc: 'Payment from', amount: '$560.00', status: 'Completed', date: 'Today, 16:36' },
    { id: '#0024', desc: 'Process refunds to', amount: '$150.00', status: 'Completed', date: 'Yesterday, 14:12' },
    { id: '#0023', desc: 'Payment failed from', amount: '$250.00', status: 'Declined', date: 'Today, 09:45' },
  ];
  return (
    <div className="bg-white/80 rounded-2xl shadow p-6 mt-4">
      <div className="font-semibold text-lg mb-4">Transaction History</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="py-2">PAYMENT NUMBER</th>
            <th className="py-2">AMOUNT</th>
            <th className="py-2">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx} className="border-t border-gray-100">
              <td className="py-2">
                <div className="font-medium text-gray-700">{tx.desc} {tx.id}</div>
                <div className="text-xs text-gray-400">{tx.date}</div>
              </td>
              <td className="py-2">{tx.amount}</td>
              <td className="py-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{tx.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-2">
        <Link href="/transactions" className="text-blue-600 text-xs font-medium">View All Transactions</Link>
      </div>
    </div>
  );
}

import Link from "next/link";
