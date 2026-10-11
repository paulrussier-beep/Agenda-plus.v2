import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BookOpen, CalendarDays, Check, ChevronRight, Clock3, LayoutDashboard, Plus, Sparkles, Target, Trash2, X } from 'lucide-react'
import './styles.css'

type Task = { id: number; title: string; subject: string; date: string; duration: number; priority: 'Haute' | 'Moyenne' | 'Basse'; done: boolean }
type Subject = { name: string; color: string; average: string }

const initialSubjects: Subject[] = [
  { name: 'Mathématiques', color: '#6c63ff', average: '14,5' },
  { name: 'Français', color: '#f59e0b', average: '15,2' },
  { name: 'Histoire-Géo', color: '#10b981', average: '13,8' },
  { name: 'Anglais', color: '#ef6c83', average: '16,1' },
]
const initialTasks: Task[] = [
  { id: 1, title: 'Exercices sur les fonctions', subject: 'Mathématiques', date: 'Aujourd’hui', duration: 45, priority: 'Haute', done: false },
  { id: 2, title: 'Fiche de lecture — L’Étranger', subject: 'Français', date: 'Aujourd’hui', duration: 30, priority: 'Moyenne', done: false },
  { id: 3, title: 'Réviser la Guerre froide', subject: 'Histoire-Géo', date: 'Demain', duration: 50, priority: 'Haute', done: false },
  { id: 4, title: 'Vocabulaire unité 4', subject: 'Anglais', date: 'Jeudi 15 mai', duration: 20, priority: 'Basse', done: true },
]

function App() {
  const [active, setActive] = useState('Tableau de bord')
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [subjects, setSubjects] = useState(initialSubjects)
  const [showAdd, setShowAdd] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', subject: 'Mathématiques', duration: 30 })

  const remaining = tasks.filter(t => !t.done)
  const completed = tasks.filter(t => t.done).length
  const totalMinutes = remaining.reduce((sum, t) => sum + t.duration, 0)
  const progress = Math.round((completed / tasks.length) * 100)
  const nextTest = { subject: 'Mathématiques', title: 'Contrôle — Fonctions', date: 'Vendredi 16 mai', days: 3 }
  const today = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  const toggleTask = (id: number) => setTasks(current => current.map(task => task.id === id ? { ...task, done: !task.done } : task))
  const addTask = () => {
    if (!newTask.title.trim()) return
    setTasks(current => [...current, { id: Date.now(), title: newTask.title, subject: newTask.subject, date: 'Aujourd’hui', duration: newTask.duration, priority: 'Moyenne', done: false }])
    setNewTask({ title: '', subject: 'Mathématiques', duration: 30 }); setShowAdd(false)
  }
  const deleteTask = (id: number) => setTasks(current => current.filter(task => task.id !== id))

  const nav = [
    { label: 'Tableau de bord', icon: LayoutDashboard },
    { label: 'Mon planning', icon: CalendarDays },
    { label: 'Mes matières', icon: BookOpen },
  ]

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Sparkles size={18} /></div><span>agenda<span className="brand-accent">+</span></span></div>
      <div className="profile"><div className="avatar">PR</div><div><strong>Paul</strong><small>Lycée · Seconde</small></div><ChevronRight size={16} className="muted" /></div>
      <nav>{nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)}><Icon size={18} />{label}</button>)}</nav>
      <div className="sidebar-bottom"><div className="tip-card"><Sparkles size={17} /><strong>Petit pas, grand progrès</strong><p>15 minutes de révision aujourd’hui valent mieux qu’une heure demain.</p></div><button className="settings">⚙ <span>Réglages</span></button></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div><span className="eyebrow">{today}</span><h1>{active === 'Tableau de bord' ? 'Bonjour Paul 👋' : active}</h1></div><button className="add-button" onClick={() => setShowAdd(true)}><Plus size={18} /> Nouvelle tâche</button></header>
      {active === 'Tableau de bord' ? <>
        <section className="hero-row"><div><p className="hero-kicker">Ton espace de travail</p><h2>Avance sereinement,<br /><span>un jour à la fois.</span></h2><p className="hero-copy">Voici ce qui t’attend aujourd’hui. Tu as déjà fait le plus dur : commencer.</p></div><div className="ring-card"><div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` } as React.CSSProperties}><div>{progress}<small>%</small></div></div><div><strong>Ta progression</strong><p>{completed} tâche{completed > 1 ? 's' : ''} terminée{completed > 1 ? 's' : ''}</p></div></div></section>
        <section className="stats"><div className="stat-card"><div className="stat-icon violet"><Clock3 size={20} /></div><div><span>Temps prévu</span><strong>{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}min</strong><small>pour aujourd’hui</small></div></div><div className="stat-card"><div className="stat-icon amber"><Target size={20} /></div><div><span>Prochain contrôle</span><strong>{nextTest.days} jours</strong><small>{nextTest.subject}</small></div></div><div className="stat-card"><div className="stat-icon green"><Check size={20} /></div><div><span>Tâches complétées</span><strong>{completed} / {tasks.length}</strong><small>cette semaine</small></div></div></section>
        <div className="content-grid"><section className="panel tasks-panel"><div className="panel-heading"><div><h3>Tes tâches du jour</h3><p>Organisées par priorité</p></div><button className="text-button" onClick={() => setActive('Mon planning')}>Voir le planning <ChevronRight size={15} /></button></div><div className="task-list">{tasks.filter(t => t.date === 'Aujourd’hui').map(task => <TaskRow key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />)}{tasks.filter(t => t.date === 'Aujourd’hui').length === 0 && <Empty text="Aucune tâche pour aujourd’hui." />}</div><button className="add-inline" onClick={() => setShowAdd(true)}><Plus size={16} /> Ajouter une tâche</button></section><section className="panel exam-panel"><div className="panel-heading"><div><h3>À venir</h3><p>Ne laisse rien au hasard</p></div><CalendarDays size={19} className="muted" /></div><div className="exam-card"><div className="date-block"><strong>16</strong><span>MAI</span></div><div><span className="tag">Contrôle</span><h4>{nextTest.title}</h4><p><Clock3 size={13} /> 10:00 · Salle B204</p></div></div><div className="upcoming"><div className="mini-dot green-dot" /><div><strong>Devoir maison — Anglais</strong><span>À rendre jeudi 15 mai</span></div></div><div className="upcoming"><div className="mini-dot amber-dot" /><div><strong>Exposé Histoire-Géo</strong><span>À rendre lundi 19 mai</span></div></div></section></div>
        <section className="panel subjects-panel"><div className="panel-heading"><div><h3>Mes matières</h3><p>Ta vue d’ensemble</p></div><button className="text-button" onClick={() => setActive('Mes matières')}>Gérer <ChevronRight size={15} /></button></div><div className="subject-list">{subjects.map(subject => <div className="subject-item" key={subject.name}><span className="subject-dot" style={{ background: subject.color }} /><strong>{subject.name}</strong><div className="subject-bar"><span style={{ width: `${Number(subject.average.replace(',', '.')) * 5.5}%`, background: subject.color }} /></div><b>{subject.average}<small>/20</small></b></div>)}</div></section>
      </> : active === 'Mon planning' ? <Planning tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onAdd={() => setShowAdd(true)} /> : <Subjects subjects={subjects} setSubjects={setSubjects} />}
    </main>
    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">Organisation</span><h3>Ajouter une tâche</h3></div><button className="icon-button" onClick={() => setShowAdd(false)}><X size={18} /></button></div><label>Nom de la tâche<input autoFocus value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} placeholder="Ex : Relire le chapitre 3" /></label><label>Matière<select value={newTask.subject} onChange={e => setNewTask({ ...newTask, subject: e.target.value })}>{subjects.map(s => <option key={s.name}>{s.name}</option>)}</select></label><label>Durée estimée<select value={newTask.duration} onChange={e => setNewTask({ ...newTask, duration: Number(e.target.value) })}><option value={15}>15 minutes</option><option value={30}>30 minutes</option><option value={45}>45 minutes</option><option value={60}>1 heure</option></select></label><button className="primary-button" onClick={addTask}>Ajouter au planning</button></div></div>}
  </div>
}

function TaskRow({ task, onToggle, onDelete }: { task: Task; onToggle: (id: number) => void; onDelete: (id: number) => void }) { return <div className={task.done ? 'task-row done' : 'task-row'}><button className="check-button" onClick={() => onToggle(task.id)}>{task.done && <Check size={14} />}</button><div className="task-info"><strong>{task.title}</strong><span>{task.subject} · {task.duration} min</span></div><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span><button className="delete-button" onClick={() => onDelete(task.id)}><Trash2 size={15} /></button></div> }
function Planning({ tasks, onToggle, onDelete, onAdd }: { tasks: Task[]; onToggle: (id: number) => void; onDelete: (id: number) => void; onAdd: () => void }) { return <div className="page-block"><div className="page-intro"><div><span className="eyebrow">Semaine du 12 au 18 mai</span><h2>Ton planning de travail</h2><p>Un rythme réaliste, construit pour toi.</p></div><button className="primary-button" onClick={onAdd}><Sparkles size={17} /> Générer mon planning</button></div><div className="planning-board">{['Aujourd’hui', 'Demain', 'Jeudi 15 mai', 'Vendredi 16 mai'].map(day => <div className="day-column" key={day}><div className="day-title"><strong>{day}</strong><span>{tasks.filter(t => t.date === day).length} tâche{tasks.filter(t => t.date === day).length > 1 ? 's' : ''}</span></div>{tasks.filter(t => t.date === day).map(task => <TaskRow key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)}{tasks.filter(t => t.date === day).length === 0 && <div className="empty-day">Journée libre</div>}</div>)}</div></div> }
function Subjects({ subjects, setSubjects }: { subjects: Subject[]; setSubjects: (s: Subject[]) => void }) { const [name, setName] = useState(''); return <div className="page-block"><div className="page-intro"><div><span className="eyebrow">Suivi scolaire</span><h2>Mes matières</h2><p>Visualise tes efforts et tes résultats.</p></div></div><div className="subject-grid">{subjects.map(s => <div className="big-subject" key={s.name}><span className="subject-dot" style={{ background: s.color }} /><h3>{s.name}</h3><strong>{s.average}<small>/20</small></strong><div className="big-bar"><span style={{ width: `${Number(s.average.replace(',', '.')) * 5}%`, background: s.color }} /></div><span className="subject-label">Moyenne actuelle</span></div>)}<div className="big-subject add-subject"><Plus size={22} /><input value={name} onChange={e => setName(e.target.value)} placeholder="Nouvelle matière" onKeyDown={e => { if (e.key === 'Enter' && name) { setSubjects([...subjects, { name, color: '#9b8cff', average: '—' }]); setName('') } }} /><small>Entrée pour ajouter</small></div></div></div> }
function Empty({ text }: { text: string }) { return <div className="empty-state">{text}</div> }

createRoot(document.getElementById('root')!).render(<App />)
