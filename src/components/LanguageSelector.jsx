import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Globe2 } from 'lucide-react'
import useLanguage from '../utils/useLanguage.js'

const languages = [
  { id: 'en', flag: '🇺🇸', label: 'English' },
  { id: 'uz', flag: '🇺🇿', label: "O'zbekcha" },
  { id: 'ru', flag: '🇷🇺', label: 'Русский' },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const selected = languages.find((item) => item.id === language) || languages[0]

  useEffect(() => {
    if (!open) return undefined
    function closeOutside(event) {
      if (!root.current?.contains(event.target)) setOpen(false)
    }
    function closeOnEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  function chooseLanguage(id) {
    setLanguage(id)
    setOpen(false)
  }

  return <div className="language-selector" ref={root}>
    <button className="language-selector__trigger" type="button" aria-label={`Language: ${selected.label}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
      <Globe2 size={15} /><span>{selected.flag} {selected.label}</span><ChevronDown size={13} className={open ? 'is-open' : ''} />
    </button>
    {open && <div className="language-selector__menu" role="listbox" aria-label="Choose language">{languages.map((item) => <button className={item.id === language ? 'is-selected' : ''} type="button" role="option" aria-selected={item.id === language} key={item.id} onClick={() => chooseLanguage(item.id)}><span>{item.flag}</span><span>{item.label}</span>{item.id === language && <Check size={14} />}</button>)}</div>}
  </div>
}