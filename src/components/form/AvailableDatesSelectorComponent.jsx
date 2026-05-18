import React from 'react'
import { useAvailableDatesSelectorComponent } from './useAvailableDatesSelectorComponent'

const AvailableDatesSelectorComponent = ({ availableDates, setAvailableDates, calendarMonth, setCalendarMonth }) => {
  const { today, year, month, monthName, weeks, toKey, toggleDate, prevMonth, nextMonth, availableThisMonth, DAYS } =
    useAvailableDatesSelectorComponent({ availableDates, setAvailableDates, calendarMonth, setCalendarMonth })

  return (
    <div className="calendar-wrapper">
      {/* Header navegación */}
      <div className="d-flex align-items-center justify-content-between px-3 py-2 calendar-header">
        <button type="button" className="btn btn-sm p-0 border-0 text-white calendar-nav-btn" onClick={prevMonth}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <span className="fw-bold text-white text-capitalize">{monthName}</span>
        <button type="button" className="btn btn-sm p-0 border-0 text-white calendar-nav-btn" onClick={nextMonth}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Cabecera días semana */}
      <div className="calendar-weekdays">
        {DAYS.map(d => (
          <div key={d} className="calendar-weekday-cell">{d}</div>
        ))}
      </div>

      {/* Semanas */}
      <div className="calendar-body">
        {weeks.map((w, wi) => (
          <div key={wi} className="calendar-week">
            {w.map((day, di) => {
              if (!day) return <div key={`e-${wi}-${di}`} className="calendar-day-empty"></div>
              const date = new Date(year, month, day)
              const key = toKey(day)
              const isToday = date.getTime() === today.getTime()
              const isPast = date < today
              const isAvail = availableDates.includes(key)

              const numberClass = isPast ? 'calendar-day-number-past'
                : isAvail ? 'calendar-day-number-available'
                : isToday ? 'calendar-day-number-today'
                : ''

              return (
                <div
                  key={key}
                  className={`calendar-day-cell${isPast ? ' calendar-day-cell-past' : ''}`}
                  onClick={() => toggleDate(day)}
                  title={isPast ? '' : isAvail ? 'Disponible · Clic para quitar' : 'No disponible · Clic para marcar disponible'}
                >
                  <span className={`calendar-day-number ${numberClass}`}>{day}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 d-flex align-items-center justify-content-between calendar-footer">
        <span className="small text-muted">
          <i className="bi bi-calendar-check me-1 calendar-footer-count"></i>
          <strong className="calendar-footer-count-value">{availableThisMonth}</strong> disponibles este mes
        </span>
        <span className="small text-muted">{availableDates.length} en total</span>
      </div>
    </div>
  )
}

export default AvailableDatesSelectorComponent
