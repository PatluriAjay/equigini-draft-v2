import Link from "next/link";

export default function AppLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <aside>
        <ul>
          <li><Link href="/app">Home</Link></li>
          <li><Link href="/app/deals">Deals</Link></li>
          <li><Link href="/app/deals/view-deal/123">View Deal</Link></li>
          <li><Link href="/app/settings">Settings</Link></li>
          <li><Link href="/login">Logout</Link></li>
        </ul>
      </aside>
      <main>
        {children} {/* This is where the page content goes */}
      </main>
    </div>
  );
}
