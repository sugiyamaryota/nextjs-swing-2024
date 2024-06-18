import { Link } from '@radix-ui/themes';

export function Sidebar() {
    const list = [
        {name: 'ホーム', path: '/'},
        {name: 'ユーザー管理', path: '/users'},
        {name: 'レビュー管理', path: '/reviews'},
        {name: '商品登録管理', path: '/items'},
        {name: 'カテゴリー', path: '/items/categories'},
        {name: 'ブランド', path: '/items/brands'},
        {name: 'メーカー', path: '/items/markers'},
    ]
    return (
        <aside>
            <ul className='list-none bg-[#1da1f2]'>
                {list.map(item =>
                    <li key={item.name}>
                        <Link href={`${item.path}`}>
                            {item.name}
                        </Link>
                    </li>
                )}
            </ul>
        </aside>
    )
}