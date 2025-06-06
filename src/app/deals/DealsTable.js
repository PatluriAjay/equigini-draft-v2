import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function DealsTable({ deals, page, totalPages, setPage }) {
  return (
    <div className="flex-1 bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col">
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-left bg-blue-50">
              <th className="py-3 px-4 rounded-tl-xl">Name</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4 rounded-tr-xl text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-t border-gray-100 hover:bg-blue-50/40 transition">
                <td className="py-3 px-4 font-medium text-gray-800">{deal.name}</td>
                <td className="py-3 px-4">{deal.value}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${deal.status === 'Active' ? 'bg-green-100 text-green-700' : ''}
                    ${deal.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${deal.status === 'Closed' ? 'bg-gray-200 text-gray-600' : ''}
                  `}>{deal.status}</span>
                </td>
                <td className="py-3 px-4">{deal.created}</td>
                <td className="py-3 px-4 text-center">
                  <button className="inline-flex items-center justify-center text-blue-500 hover:bg-blue-100 rounded-full p-2 mr-2 transition"><FiEdit2 size={16} /></button>
                  <button className="inline-flex items-center justify-center text-red-500 hover:bg-red-100 rounded-full p-2 transition"><FiTrash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-100 text-gray-500 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-gray-600 text-sm">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-100 text-gray-500 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
