import type { Metadata } from 'next'
import List from './list'

export const metadata: Metadata = {
  title: 'User list - Test',
}
export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-4'>
      <div className='w-full max-w-4xl grid gap-y-6 py-4'>

        {/* Header */}
        <h1 className='text-lg font-bold leading-9 mt-6'>User list</h1>

        {/* User list */}
        <List />
        
      </div>
    </main>
  )
}
