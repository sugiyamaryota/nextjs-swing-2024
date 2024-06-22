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
})

const ResetPassword = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {email: ''},
        resolver: zodResolver(schema)
    })
    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')
        try{
            const {error} = await supabase.auth.resetPasswordForEmail(data.email,{
                redirectTo: `${location.origin}/auth/reset-password/confirm`
            })
            if(error) {
                setMessage('エラーが発生しました'+error.message)
                return
            }
            setMessage('パスワードリセットに必要なメールを送信しました。')
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
                        type="text"
                        id="email"
                        {...register('email',{required: true})}
                    />
                    {errors.email?.message}
                </div>
                <div>
                    {loading ? (<div>loading</div>) :
                        <button type='submit'>
                            reset password
                        </button>
                    }
                </div>
                {message && <div>{message}</div>}
            </form>
        </div>
    )
}

export default ResetPassword