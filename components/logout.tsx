'use client'

import { FormEvent,useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'
import type { Database } from '../libs/database.type'


const Logout = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { error } = await supabase.auth.signOut()
            if(error){
                setMessage('エラーが発生しました'+error.message)
                return
            }
            router.push('/')
        } catch (error) {
            setMessage('エラーが発生しました'+error)
            return
        } finally {
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    {loading ? <div>loading</div>:
                        <button type='submit'>logout</button>
                    }
                </div>
            </form>
            {message && <div>{message}</div>}
        </div>
    )
}

export default Logout