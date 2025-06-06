// RightSidebar.js
import UserList from './UserList';

export default function RightSidebar() {
  return (
    <aside className="w-80 flex flex-col gap-6">
      <div className="bg-white/80 rounded-2xl shadow p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-400">Payments</div>
            <div className="font-bold text-2xl">560</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Overall</div>
            <div className="font-bold text-2xl">$21K</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Orders</span>
            <span>75/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Goal Value</span>
            <span>$560 / $40,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>
        </div>
      </div>
      <UserList />
    </aside>
  );
}
