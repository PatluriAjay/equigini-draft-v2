// UserList.js
export default function UserList() {
  const users = [
    { name: 'Dr. Esther', avatar: '', status: 'online' },
    { name: 'Wenfemi', avatar: '', status: 'offline' },
    { name: 'Testimonial', avatar: '', status: 'offline' },
  ];
  return (
    <div className="bg-white/80 rounded-2xl shadow p-6 mt-4">
      <div className="font-semibold text-lg mb-4">Supervisors</div>
      <ul className="space-y-3">
        {users.map((user, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ${user.status === 'online' ? 'ring-2 ring-green-400' : ''}`}>
              <span className="font-bold text-gray-700 text-sm">{user.name[0]}</span>
            </div>
            <span className="text-gray-700 text-sm">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
