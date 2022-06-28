import { IntlProvider } from 'react-intl'
import { observer } from 'mobx-react'
import langRu from './translations/ru.json'
import langEn from './translations/en.json'
import langKg from './translations/kg.json'
import { createContext, useContext, useEffect } from 'react'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import localeRu from 'date-fns/locale/ru'
import localeEn from 'date-fns/locale/en-US'
import { useStore } from 'hooks'

const messages = {
  ru: langRu,
  en: langEn,
  kg: langKg,
}

registerLocale('ru', localeRu)
registerLocale('en', localeEn)

const IntlContext = createContext({
  switchToEnglish: () => {},
  switchToRussian: () => {},
  switchToKyrgyz: () => {},
})

const IntlProviderWrapper = observer(({ children }) => {
  const appStore = useStore('appStore')

  useEffect(() => {
    setDefaultLocale(appStore.currentLanguage)
  }, [appStore.currentLanguage])

  const switchToEnglish = () => {
    appStore.setLanguage('en')
  }

  const switchToRussian = () => {
    appStore.setLanguage('ru')
  }

  const switchToKyrgyz = () => {
    appStore.setLanguage('kg')
  }

  const lang = appStore.currentLanguage || 'ru'

  return (
    <IntlContext.Provider value={{ switchToEnglish, switchToRussian, switchToKyrgyz }}>
      <IntlProvider
        locale={lang}
        messages={messages[lang]}
        defaultLocale={lang}
        onError={err => {
          lang === 'kg' ? null : console.error(err)
        }}
        key={lang}
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  )
})

const useIntlContext = () => useContext(IntlContext)

export { IntlContext, useIntlContext }
export default IntlProviderWrapper
