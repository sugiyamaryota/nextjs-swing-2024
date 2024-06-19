import { createClient } from '../../../utils/supabase/server'
import { cookies } from 'next/headers'
import { Section,Link } from '@radix-ui/themes';

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: categories } = await supabase.from("categories").select();
    return (
      <Section>
        {categories?.map((category) =>
          <Link key={category.id} href={`/items/categories/${category.id}`}>{category.name}</Link>
        )}
      </Section>
    )
  }