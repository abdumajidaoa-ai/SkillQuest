import { Bell } from 'lucide-react'
import useLanguage from '../utils/useLanguage.js'

const locales = { en: 'en', uz: 'uz-UZ', ru: 'ru-RU' }

export default function NotificationPanel({ notifications, open, onToggle, onClear }) {
  const { language, t } = useLanguage()
  const hasUnread = notifications.some((item) => !item.read)
  return <div className="notification-anchor">
    <button className="topbar-icon-button notification-trigger" type="button" onClick={onToggle} aria-label={`${t('notifications')}${hasUnread ? ', unread notifications' : ''}`} aria-expanded={open} title={t('notifications')}><Bell size={17} />{hasUnread && <i className="notification-unread-dot" />}</button>
    {open && <section className="notification-popover" aria-label={t('notifications')}><div className="notification-popover__header"><b>{t('notifications')}</b>{notifications.length > 0 && <button type="button" onClick={onClear}>{t('clearNotifications')}</button>}</div>{notifications.length ? <div className="notification-list">{notifications.map((item) => <article className={`notification-item${item.read ? '' : ' is-unread'}`} key={item.id}><span className={`notification-item__icon notification-item__icon--${item.type}`}><Bell size={14} /></span><span><b>{item.title}</b><small>{item.message}</small><time dateTime={item.createdAt}>{new Intl.DateTimeFormat(locales[language] || 'en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(item.createdAt))}</time></span></article>)}</div> : <div className="notification-empty"><Bell size={18} /><p>{t('emptyNotifications')}</p></div>}</section>}
  </div>
}