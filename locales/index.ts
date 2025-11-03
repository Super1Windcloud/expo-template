import * as Localization from 'expo-localization'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import zh from './zh.json'

const resources = {
  en: { translation: en },
  zh: { translation: zh },
} as const

type SupportedLanguage = keyof typeof resources

const FALLBACK_LANGUAGE: SupportedLanguage = 'en'
const SUPPORTED_LANGUAGES = Object.keys(resources) as SupportedLanguage[]

const normalizeLanguageCode = (code?: string | null): SupportedLanguage => {
  if (!code) {
    return FALLBACK_LANGUAGE
  }

  const normalized = code.toLowerCase().split('-')[0] as SupportedLanguage

  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : FALLBACK_LANGUAGE
}

const getInitialLanguage = (): SupportedLanguage => {
  try {
    const locales = Localization.getLocales()
    if (Array.isArray(locales) && locales.length > 0) {
      return normalizeLanguageCode(locales[0]?.languageCode)
    }
  } catch (error) {
    // Accessing expo-localization during SSR on web can throw.
    console.warn('Unable to detect locales via expo-localization:', error)
  }

  return normalizeLanguageCode(Localization.locale)
}

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      fallbackLng: FALLBACK_LANGUAGE,
      lng: getInitialLanguage(),
      supportedLngs: SUPPORTED_LANGUAGES,
      nonExplicitSupportedLngs: true,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    })
    .catch((error) => {
      console.error('Failed to initialize i18next:', error)
    })
}

export const availableLanguages = SUPPORTED_LANGUAGES

export const changeLanguage = (language: SupportedLanguage) => i18next.changeLanguage(language)

export default i18next
