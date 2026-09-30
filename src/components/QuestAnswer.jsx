import { useId } from 'react'

const trueFalseOptions = ['true', 'false']

export default function QuestAnswer({ quest, value, onChange, disabled = false }) {
  const inputId = useId()

  if (quest.type === 'multiple_choice' || quest.type === 'true_false') {
    const options = quest.type === 'true_false' ? trueFalseOptions : quest.options
    return <div className="quest-answer-options" role="radiogroup" aria-label="Answer choices">{options.map((option) => <label className={`answer-choice${value === option ? ' is-selected' : ''}`} key={option}><input type="radio" name={inputId} value={option} checked={value === option} onChange={() => onChange(option)} disabled={disabled} /><span>{option[0].toUpperCase() + option.slice(1)}</span></label>)}</div>
  }

  if (quest.type === 'match_pairs') {
    const options = quest.pairs.map((pair) => pair.right)
    return <div className="match-pairs-list">{quest.pairs.map(({ left }) => <label className="match-pair-row" key={left}><span>{left}</span><select aria-label={`Match ${left}`} value={value?.[left] || ''} onChange={(event) => onChange({ ...value, [left]: event.target.value })} disabled={disabled}><option value="">Choose a match</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>)}</div>
  }

  if (quest.type === 'mini_challenge') {
    return <div className="mini-challenge-list">{quest.tasks.map((task) => <label className="mini-challenge-item" key={task.id}><span>{task.prompt}</span><input value={value?.[task.id] || ''} onChange={(event) => onChange({ ...value, [task.id]: event.target.value })} placeholder="Your answer" autoComplete="off" disabled={disabled} /></label>)}</div>
  }

  return <input id={inputId} className="quest-answer-input" aria-label={`Answer to ${quest.question}`} value={value} onChange={(event) => onChange(event.target.value)} placeholder={quest.type === 'fill_blank' ? 'Fill in the blank' : 'Type your answer'} autoComplete="off" disabled={disabled} />
}