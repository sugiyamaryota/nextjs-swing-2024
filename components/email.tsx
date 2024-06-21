'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { Database } from '../libs/database.type'
type Schema = z.infer<typeof schema>

const schema = z.object({
    email: z.string().email({message: 'メールアドレスの形式ではありません。'}),
})


const Email = ({email}: {email: string}) => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: { email: '' },
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')
        try {
            const {error: updateUserError} = await supabase.auth.updateUser(
                {email: data.email},
                {emailRedirectTo: `${location.origin}/auth/login`}
            )
            if(updateUserError){
                setMessage('エラーが発生しました。'+updateUserError.message)
                return
            }
            setMessage('確認用のURLを記載したメールを送信しました。')

            const {error: signOutError} = await supabase.auth.signOut()
            if(signOutError){
                setMessage('エラーが発生しました。'+signOutError.message)
                return
            }
            router.push('/auth/login')

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>{email}</div>
                <div>
                    <input
                        type="text"
                        id="email"
                        {...register('email', {required: true})}
                    />
                    <div>{errors?.email?.message}</div>
                </div>
                <div>
                    {loading ? <div>loading</div>:
                        <button type='submit'>change</button>
                    }
                </div>
            </form>
            {message && <div>{message}</div>}
        </div>
    )
}

export default Email