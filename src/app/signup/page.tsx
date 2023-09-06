import type { Metadata } from 'next'
import Form from './form'

export const metadata: Metadata = {
  title: 'Sign up - Test',
}

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      <div className='grid gap-y-6 justify-items-center w-full max-w-sm py-4'>

        {/* Header */}
        <h1 className='text-2xl font-bold leading-9 tracking-tight mt-6'>Let&apos;s Get Started!</h1>

        {/* Form sign up */}
        <Form />
        
      </div>
    </div>
  )
}