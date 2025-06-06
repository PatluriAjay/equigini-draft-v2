// Sidebar.js
"use client";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiBookOpen,
  FiUser,
  FiFile,
  FiEdit,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  // Icon mapping for each link
  const iconClass = "text-[22px] text-[#b57cf6] min-w-[22px]";
  const links = [
    { href: "/", label: "Dashboard", icon: FiHome },
    { href: "/investors", label: "Investors", icon: FiUsers },
    { href: "/deals", label: "Deals", icon: FiBriefcase },
    { href: "/eoi", label: "EOI", icon: FiFileText },
    { href: "/documents", label: "Documents", icon: FiFile },
    { href: "/users", label: "Users", icon: FiUser },
    { href: "/blogs", label: "Blogs", icon: FiBookOpen },
    { href: "/profile", label: "Profile", icon: FiEdit },
  ];

  return (
    <aside
      className={`bg-white/60 backdrop-blur-xl shadow-lg rounded-2xl p-3 min-h-screen flex flex-col justify-between border border-white/30 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
    >
      <div>
        <div className={`flex items-center gap-2 mb-10 ${collapsed ? "justify-center" : ""}`}>
          <button
            className="rounded-lg p-2 hover:bg-white/40 transition"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
          </button>
          {!collapsed && (
            <Image src="/equigini-logo.webp" alt="Logo" width={120} height={50} className="object-contain" priority />
          )}
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-3
                  ${isActive ?
                    "text-white bg-gradient-to-r from-[a330ae] via-[a330ae] to-[a330ae] shadow-lg border-l-0 scale-[1.04]" :
                    "text-gray-700 border-l-0 bg-lavender-gradient hover:text-white hover:shadow-lg hover:scale-[1.04]"
                  }
                  ${collapsed ? "justify-center px-0" : ""}
                `}
                style={isActive ? { boxShadow: "0 4px 24px 0 #3b82f655", background: 'linear-gradient(to right, #a330ae, #a330ae90)' } : {}}
              >
                <span
                  className={
                    `${iconClass} ${isActive ? "text-white" : ""} group-hover:text-white transition-colors`
                  }
                >
                  {link.icon && (() => {
                    const Icon = link.icon;
                    return <Icon />;
                  })()}
                </span>
                {!collapsed && <span className="ml-2 z-10">{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-8">
        <div className="bg-lavender-100/70 rounded-xl p-4 flex flex-col items-center">
          <div className="w-12 h-12 bg-white-300 flex align-center justify-center rounded-full mb-2">
            <Image src="/favicon.png" alt="Icon" width={30} height={30} className="object-contain" />
          </div>
          {!collapsed && (
            <>
              <span className="text-xs text-gray-600 mb-2 text-center">Initiative by <br /> <strong>Pantomath Group</strong></span>
              <button className="bg-lavender text-white rounded-lg px-4 py-1 text-xs">Know More</button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
