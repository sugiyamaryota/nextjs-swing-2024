import { createClient } from '../../../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Section,Link } from '@radix-ui/themes';

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

    return (
      <Section>

      </Section>
    )
  }