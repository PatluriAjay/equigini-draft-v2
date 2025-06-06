'use client'

import StatCards from '../components/StatCards'

export default function App () {
  return (
    <main className='flex-1 gap-8 px-10 pb-10'>
      <div className='flex-1'>
        <StatCards />
        {/* <TransactionTable /> */}
      </div>
      {/* <RightSidebar /> */}
    </main>
  )
}
