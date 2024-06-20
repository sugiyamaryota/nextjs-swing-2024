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
    name: z.string().min(2,{message: '2文字以上入力する必要があります'}),
    email: z.string().email({message: 'メールアドレスの形式ではありません'}),
    password: z.string().min(6, {message: '6文字以上入力する必要があります'}),
})

const Signup = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {name: '', email: '', password: ''},
        resolver: zodResolver(schema)
    })
    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        try{
            const {error: errorSignup} = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`
                }
            })
            if(errorSignup) {
                setMessage('エラーが発生しました'+errorSignup.message)
                return
            }
            const {error: updateError} = await supabase
            .from('profiles')
            .update({name: data.name})
            .eq('email',data.email)
            if(updateError) {
                setMessage('エラーが発生しました'+updateError.message)
                return
            }

            reset()
            setMessage('本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。')
        }catch(error){
            setMessage('エラーが発生しました'+error)
            return
        } finally{
            setLoading(false)
            router.refresh()
        }
    }


    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type='text'
                        id='name'
                        {...register('name',{required: true})}
                    />
                    <div>{errors.name?.message}</div>
                </div>
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
                            sign up
                        </button>
                    }
                </div>
            </form>
            {message && <div>{message}</div>}
            <Link href="/auth/login">
                login
            </Link>
        </div>
    )
}

export default Signup