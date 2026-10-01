import { useMemo, useState } from 'react'
import { LANGUAGE_KEY, LanguageContext, messages, readLanguage } from './language-data.js'

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readLanguage)
  function setLanguage(value) {
    if (!Object.hasOwn(messages, value)) return
    setLanguageState(value)
    try {
      localStorage.setItem(LANGUAGE_KEY, value)
    } catch {}
  }
  const value = useMemo(() => ({ language, setLanguage, t: (key) => messages[language][key] || messages.en[key] || key }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}