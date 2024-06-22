import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import type { Database } from '../../../libs/database.type'
import Password from '../../../components/password'

const PasswordPage = async () => {
    const supabase = createServerComponentClient<Database>({cookies})
    const {data: {session}} = await supabase.auth.getSession()
    if(!session){
        redirect('/auth/login')
    }
    return <Password />
}

export default PasswordPage