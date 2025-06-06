'use client'

import GenericPage from '../../components/GenericPage'

export default function App () {
  return (
    <main className='flex-1 gap-8 px-10 pb-10'>
      <div className='flex-1'>
        <GenericPage />
        {/* <TransactionTable /> */}
      </div>
      {/* <RightSidebar /> */}
    </main>
  )
}
