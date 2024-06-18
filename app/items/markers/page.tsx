import { createClient } from '../../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Section,Link } from '@radix-ui/themes';

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: markers } = await supabase.from("markers").select();
    return (
      <Section>
        {markers?.map((marker) =>
          <Link key={marker.id} href={`/markers/${marker.id}`}>{marker.name}</Link>
        )}
      </Section>
    )
  }