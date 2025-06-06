"use client";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  return (<>
    <div>Login</div>
    <button className="mt-4" onClick={() => router.push('/app')}>
      Go to App Home
    </button>
  </>);
}
