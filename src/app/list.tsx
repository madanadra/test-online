'use client'

import { useState, useEffect } from "react"
import { deleteCookie } from "cookies-next";
import axios from "axios"

export default function List() {
    const [load, setLoad] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [user, setUser] = useState<[{
        id?: number,
        email?: string,
        first_name?: string,
        last_name?: string,
        avatar?: string
    }]>([{}])

    const getData = (page?: number) => {
        setLoad(true)
        axios.get(process.env.NEXT_PUBLIC_BASE_API+'api/users?page='+page)
        .then((res) => {
            setUser(res.data.data)
            setPerPage(res.data.per_page)
            setTotal(res.data.total)
            setTotalPages(res.data.total_pages)
            setLoad(false)
        })
    }

    useEffect(() => {
        getData(page)
    }, [page])

    if (!load && (user.length > 1 || Object.keys(user[0]).length)) {
        return (<>
            <div className="flex gap-x-4 text-sm text-slate-500">
                <h1>{perPage} in page</h1>
                <h1>{total} in total</h1>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {user.map((item, i) => 
                    <div key={i} className="flex gap-x-4 p-4 rounded-md bg-slate-100 hover:bg-slate-200 
                    border border-slate-300 cursor-pointer animation-show">
                        <div className="grow grid content-center">
                            <h1 className="font-semibold leading-7">{item.first_name} {item.last_name}</h1>
                            <h2 className="text-slate-500">{item.email}</h2>
                        </div>
                        <img src={item.avatar} alt="Avatar" className="w-14 aspect-square rounded-full shadow-md shadow-slate-400" />
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center gap-x-4">
                <div className="flex gap-x-4">
                    {[...Array(totalPages)].map((_, i) =>
                        <button key={i} onClick={() => setPage(i+1)} 
                        className={`${i+1 === page ? 'bg-slate-950 text-slate-50' : 
                        'bg-slate-100 hover:bg-slate-200 border border-slate-300'} rounded-md py-1.5 px-3 
                        text-sm font-semibold leading-6 tabular-nums`}>{i+1}</button>
                    )}
                </div>
                <a href="/signup" rel="noopener noreferrer" onClick={() => deleteCookie('test-token')} 
                className="text-sm text-red-700 hover:underline">Log out</a>
            </div>
        </>)
    }

    return (   
        <div className="bg-slate-100 overflow-hidden"><div className="w-3/4 h-1 bg-slate-200 animation-linear" /></div> 
    )
}