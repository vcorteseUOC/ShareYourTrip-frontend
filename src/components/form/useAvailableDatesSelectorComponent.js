const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

export const useAvailableDatesSelectorComponent = ({ availableDates, setAvailableDates, calendarMonth, setCalendarMonth }) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const year = calendarMonth.getFullYear()
  const month = calendarMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7
  const monthName = calendarMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  const toKey = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const toggleDate = (day) => {
    const date = new Date(year, month, day)
    if (date < today) return
    const key = toKey(day)
    setAvailableDates(prev =>
      prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]
    )
  }

  const prevMonth = () => setCalendarMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCalendarMonth(new Date(year, month + 1, 1))

  const totalCells = firstDow + daysInMonth
  const weeks = []
  let week = []
  for (let i = 0; i < Math.ceil(totalCells / 7) * 7; i++) {
    const day = i - firstDow + 1
    week.push(day >= 1 && day <= daysInMonth ? day : null)
    if (week.length === 7) { weeks.push(week); week = [] }
  }

  const availableThisMonth = availableDates.filter(d =>
    d.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)
  ).length

  return { today, year, month, monthName, weeks, toKey, toggleDate, prevMonth, nextMonth, availableThisMonth, DAYS }
}
