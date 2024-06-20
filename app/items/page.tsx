import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Section,Link } from '@radix-ui/themes';

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: items } = await supabase.from("items").select();
    return (
      <Section>
        {items?.map((item) =>
          <Link key={item.id} href={`/items/${item.id}`}>{item.id}</Link>
        )}
      </Section>
    )
  }