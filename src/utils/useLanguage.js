import { useContext } from 'react'
import { LanguageContext, messages } from './language-data.js'

export default function useLanguage() {
  return useContext(LanguageContext) || { language: 'en', setLanguage: () => {}, t: (key) => messages.en[key] || key }
}