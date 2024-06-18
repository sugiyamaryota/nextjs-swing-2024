import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Section,Link } from '@radix-ui/themes';

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: reviews } = await supabase.from("reviews").select();

    return (
      <Section>
        {reviews?.map((review) =>
          <Link key={review.id} href={`/reviews/${review.id}`}>{review.content}</Link>
        )}
      </Section>
    )
  }