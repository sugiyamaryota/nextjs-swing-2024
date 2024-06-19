'use client'
import Link from 'next/link'
import type {Session} from '@supabase/auth-helpers-nextjs'

const Navigation = ({
    session
    }: {
    session: Session | null
}) => {
    return (
        <>
        {session ? (
            <Link href="/settings/profile">
                profile
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