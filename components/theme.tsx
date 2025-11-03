import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { useEffect } from 'react'
import { Platform, useColorScheme } from 'react-native'

type ThemeProps = {
  children: React.ReactNode
}

export function Theme({ children }: ThemeProps) {
  const colorScheme = useColorScheme() ?? 'light'

  useEffect(() => {
    if (Platform.OS === 'web') {
      const root = document.documentElement
      if (colorScheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    } else {
      SystemUI.setBackgroundColorAsync(colorScheme === 'dark' ? '#0c0a09' : '#ffffff').catch(() => {
        // noop - setting background color can fail on some platforms (e.g. web/ssr)
      })
    }
  }, [colorScheme])

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </>
  )
}
