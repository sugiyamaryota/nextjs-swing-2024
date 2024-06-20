'use client'

import {useState} from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import * as z from 'zod'
import type { Database } from '../libs/database.type'
type Schema = z.infer<typeof schema>

const schema = z.object({
    email: z.string().email({message: 'メールアドレスの形式ではありません'}),
    password: z.string().min(6, {message: '6文字以上入力する必要があります'}),
})

const Login = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {email: '', password: ''},
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        try{
            const {error} = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            })
            if(error) {
                setMessage('エラーが発生しました'+error.message)
                return
            }
            router.push('/')
        }catch(error){
            setMessage('エラーが発生しました'+error)
            return
        } finally{
            setLoading(false)
            router.refresh()
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type='email'
                        id='email'
                        {...register('email',{required: true})}
                    />
                    <div>{errors.email?.message}</div>
                </div>
                <div>
                    <input
                        type='password'
                        id='password'
                        {...register('password',{required: true})}
                    />
                    <div>{errors.password?.message}</div>
                </div>
                <div>
                    {loading ? (<div>loading</div>) :
                        <button type='submit'>
                            login
                        </button>
                    }
                </div>
            </form>
            {message && <div>{message}</div>}
            <Link href="/auth/reset-password">
                    forgot password
            </Link>
            <Link href="/auth/signup">
                    sign up
            </Link>
        </div>
    )
}

export default Login