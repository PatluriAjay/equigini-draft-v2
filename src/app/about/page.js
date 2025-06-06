"use client";

import { useRouter } from "next/navigation";

export default function About() {

  const router = useRouter()
  return (<>
    <div>About</div>
    <button className="mt-4" onClick={() => router.push('/')}>
      Go to Login
    </button>
  </>);
}
