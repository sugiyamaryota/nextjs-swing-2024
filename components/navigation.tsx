'use client'
import Link from 'next/link'
import type {Session} from '@supabase/auth-helpers-nextjs'
import useStore from '../store'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Database } from "../libs/database.type";
type ProfileType = Database['public']['Tables']['profiles']['Row']

const Navigation = ({
    session,
    profile
    }: {
    session: Session | null
    profile: ProfileType | null
}) => {
    const { setUser } = useStore()
    useEffect(() => {
        setUser({
            id: session ? session.user.id: '',
            email: session ? session.user.email!: '',
            name: session && profile ? profile.name: '',
            introduce: session && profile ? profile.introduce: '',
            avatar_url: session && profile ? profile.avatar_url: ''
        })
    },[session, setUser, profile])
    return (
        <>
        {session ? (
            <Link href="/settings/profile">
                <div className="relative w-10 h-10">
                    <Image src={profile && profile.avatar_url ? profile.avatar_url : ''} alt="avatar" fill />
                </div>
            </Link>
        ) : (
            <>
                <Link href="/auth/login">
                    login
                </Link>
                <Link href="/auth/signup">
                    sign up
                </Link>
            </>
        )}
        </>
    )
}

export default Navigation