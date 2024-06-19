import '../styles/globals.css'
import '@radix-ui/themes/styles.css';
import { Flex,Box } from '@radix-ui/themes';
import { Header } from '../components/layouts/Header'
import { Sidebar } from '../components/layouts/Sidebar'
import SupabaseListener from '../components/supabase-listener'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="ja">
        <body>
          <SupabaseListener />
          <Header />
          <Flex>
            <Box width={'240px'}><Sidebar /></Box>
            <Box width={'auto'}>{children}</Box>
          </Flex>
        </body>
      </html>
    )
  }