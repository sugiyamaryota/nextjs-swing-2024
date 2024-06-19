import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Section } from '@radix-ui/themes';
import type { Database } from '../libs/database.type'

export default async function Page() {
  const supabase = createServerComponentClient<Database>({cookies})
  const {data: {session}} = await supabase.auth.getSession()
    return (
      <Section>
        {session ? 'logined' : 'not login'}
      </Section>
    )
  }