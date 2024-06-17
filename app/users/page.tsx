import { Section,Link } from '@radix-ui/themes';

export default function Page() {
    return (
      <Section>
        users
        <Link href="/users/1">user A</Link>
      </Section>
    )
  }