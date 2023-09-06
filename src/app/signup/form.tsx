'use client'

import axios from 'axios'
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Form() {
    const router = useRouter()
    const [load, setLoad] = useState<boolean>(false)
    const [notif, setNotif] = useState<string>('')

    {/* Signing up */}
    const signup = (e: React.FormEvent<HTMLFormElement>) => {
        setLoad(true)
        e.preventDefault()
        axios.post(process.env.NEXT_PUBLIC_BASE_API+'api/register',
        {email: e.currentTarget.email.value, password: e.currentTarget.password.value})
        .then((res) => {
            setCookie('test-token', res.data.token, {maxAge: 60 * 60 * 24 * 7})
            router.push('/')
        })
        .catch((err) => {
            setNotif(err.response.data.error)
        })
        .then(() => setLoad(false))
    }

    return (
        <form onSubmit={signup} className='mt-2 w-full grid gap-y-6 rounded-md bg-slate-100 border border-slate-300 p-4'>

            {/* error notif */}
            <h1 className={`${!notif && 'hidden'} text-red-700 text-sm text-center`}>{notif}</h1>

            {/* Email input */}
            <div>
              <label htmlFor='email' className='text-sm font-medium'>Email</label>
              <input type='email' id='email' name='email' autoComplete='email' autoCapitalize='off' autoCorrect='off' required
              className='mt-2 w-full rounded-md outline-none text-sm leading-6 py-1.5 px-3 border 
              border-slate-300 bg-slate-50 focus:border-slate-950' />
            </div>

            {/* Password input */}
            <div>
              <label htmlFor='password' className='text-sm font-medium'>Password</label>
              <input type='password' id='password' name='password' autoComplete='password' required
              className='mt-2 w-full rounded-md outline-none text-sm leading-6 py-1.5 px-3 border 
              border-slate-300 bg-slate-50 focus:border-slate-950' />
            </div>

            {/* Submit button */}
            <button type="submit" disabled={load} className="rounded-md bg-slate-950 text-slate-50 py-1.5 px-3 disabled:opacity-50
            text-sm leading-6 font-semibold">{load ? 'Signing up' : 'Sign up'}</button>

        </form>
    )
}