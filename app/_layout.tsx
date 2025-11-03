import '../global.css'
import '@/locales'
import { PortalHost } from '@rn-primitives/portal'
import { Stack } from 'expo-router'

import { Theme } from '@/components/theme'

export default function Layout() {
  return (
    <Theme>
      <Stack />
      <PortalHost />
    </Theme>
  )
}
