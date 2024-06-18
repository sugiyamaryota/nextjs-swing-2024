import { createClient } from '../../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Section,Link } from '@radix-ui/themes';

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: brands } = await supabase.from("brands").select();
    return (
      <Section>
        {brands?.map((brand) =>
          <Link key={brand.id} href={`/brands/${brand.id}`}>{brand.name}</Link>
        )}
      </Section>
    )
  }