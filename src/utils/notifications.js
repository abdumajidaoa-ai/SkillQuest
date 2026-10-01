const NOTIFICATION_KEY = 'skillquest.notifications'

export function getNotifications() {
  try {
    const value = JSON.parse(localStorage.getItem(NOTIFICATION_KEY) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function addNotification({ title, message, type = 'info' }) {
  const notification = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title, message, type, createdAt: new Date().toISOString(), read: false }
  try {
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify([notification, ...getNotifications()].slice(0, 30)))
  } catch {}
  window.dispatchEvent(new Event('skillquest:notification-change'))
  return notification
}

export function updateNotifications(notifications) {
  try {
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notifications))
  } catch {}
  window.dispatchEvent(new Event('skillquest:notification-change'))
}