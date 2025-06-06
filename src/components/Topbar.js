// Topbar.js
"use client";
import { MdNotificationsActive } from 'react-icons/md';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <header className="w-full flex items-center justify-between mb-5 rounded-2xl min-h-[56px] py-0 px-0">
      {/* <input
        type="text"
        placeholder="Search in EquiGini..."
        className="bg-white/70 border border-gray-200 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
        style={{ minHeight: '40px' }}
      /> */}
      <div className="flex items-center ms-auto gap-4 relative">
        <input
        type="text"
        placeholder="Search in EquiGini..."
        className="bg-white/70 border border-gray-200 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-1 focus:ring-[#A330AE] shadow-sm"
        style={{ minHeight: '40px' }}
      /> 
        <button className="bg-gray-100/80 rounded-full p-2 shadow min-h-[40px] min-w-[40px] flex items-center justify-center">
          <MdNotificationsActive size={25} />
        </button>
        <div className="relative" ref={menuRef}>
          <button
            className="w-10 h-10 rounded-full bg-gray-300/80 flex items-center justify-center shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="User menu"
          >
            <span className="font-bold text-gray-700">A</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 animate-fade-in">
              <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 transition">
                <FiSettings className="text-blue-500" />
                Settings
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 w-full text-left transition"
                onClick={() => {/* Add logout logic here */}}
              >
                <FiLogOut className="text-red-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
