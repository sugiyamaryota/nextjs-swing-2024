import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Section,Link } from '@radix-ui/themes';

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: users } = await supabase.from("users").select();
    return (
      <Section>
        {users?.map((user) =>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        )}
      </Section>
    )
  }