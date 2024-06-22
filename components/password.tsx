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
    password: z.string().min(6, {message: '6文字以上入力する必要があります'}),
    confirmation: z.string().min(6, {message: '6文字以上入力する必要があります'}),
}).refine((data) => data.password === data.confirmation, {
    message: '新しいパスワードと確認用のパスワードが一致しません',
    path: ['confirmation']
})

const Password = () => {
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
        defaultValues: { password: '', confirmation: '' },
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')
        try {
            const { error } = await supabase.auth.updateUser({
                password: data.password
            })
            if(error){
                setMessage('エラーが発生しました'+error.message)
                return
            }
            reset()
            setMessage('パスワードは正常に更新されました')
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
                <div>
                    <input
                        type="password"
                        id="password"
                        {...register('password', {required: true})}
                    />
                    <div>{errors?.password?.message}</div>
                </div>
                <div>
                    <input
                        type="password"
                        id="confirmation"
                        {...register('confirmation', {required: true})}
                    />
                    <div>{errors?.confirmation?.message}</div>
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

export default Password