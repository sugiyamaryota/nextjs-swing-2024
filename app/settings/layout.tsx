'use client'

import { usePathname } from "next/navigation"
import Link from 'next/link'

const subNavigation = [
    {
        name: 'プロフィール',
        href: '/settings/profile'
    },
    {
        name: 'メールアドレス',
        href: 'settings/email'
    },
    {
        name: 'パスワード',
        href: 'settings/password'
    },
    {
        name: 'ログアウト',
        href: 'settings/logout'
    },
]

const SettingsLayout = ({ children }: {children: React.ReactNode}) => {
    const pathname = usePathname()
    return (
        <div>
            {subNavigation.map((item, index) => (
                <Link key={index} href={item.href}>
                    {item.name}
                </Link>
            ))}
            <div>{children}</div>
        </div>
    )
}

export default SettingsLayout