import { Link } from '@radix-ui/themes';

export function Sidebar() {
    return (
        <aside>
            <ul className='list-none bg-[#1da1f2]'>
                <li>ホーム</li>
                <li>
                    <Link href="/users">
                        ユーザー管理
                    </Link>
                </li>
                <li>
                    <Link href="/reviews">
                        レビュー管理
                    </Link>
                </li>
            </ul>
        </aside>
    )
}