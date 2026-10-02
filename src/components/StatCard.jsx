export default function StatCard({ icon: Icon, label, value, tone, caption }) {
  return caption
    ? <article className="progress-metric"><span className={`stat-icon stat-icon--${tone}`}><Icon size={17} /></span><span className="stat-label">{label}</span><b>{value}</b><small>{caption}</small></article>
    : <article className="stat-item"><span className={`stat-icon stat-icon--${tone}`}><Icon size={16} /></span><span className="stat-label">{label}</span><b>{value}</b></article>
}