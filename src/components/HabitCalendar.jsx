import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { calculateStreak } from '../utils';

export function HabitCalendar({ habit, onToggleDate, onBack }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Grid helper: pad start of month
    const startDay = monthStart.getDay(); // 0 = Sunday
    const paddingDays = Array(startDay).fill(null);

    const streak = calculateStreak(habit.completedDates);

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    return (
        <div className="fade-in">
            {/* Header */}
            <div style={{
                marginBottom: 'var(--spacing-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <button onClick={onBack} style={{
                    color: 'var(--text-secondary)',
                    padding: '8px',
                    fontSize: '1.5rem',
                    lineHeight: 1
                }}>
                    ‹
                </button>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                    }}>
                        {habit.name}
                    </h2>
                    <p style={{
                        margin: 0,
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                    }}>
                        {streak} day streak
                    </p>
                </div>
                <div style={{ width: '40px' }}></div> {/* Spacer for alignment */}
            </div>

            {/* Calendar Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-md)'
            }}>
                <button onClick={handlePrevMonth} style={{ color: 'var(--text-secondary)', padding: '4px' }}>←</button>
                <span style={{ fontWeight: 500 }}>{format(currentDate, 'MMMM yyyy')}</span>
                <button onClick={handleNextMonth} style={{ color: 'var(--text-secondary)', padding: '4px' }}>→</button>
            </div>

            {/* Calendar Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                textAlign: 'center'
            }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        paddingBottom: '8px'
                    }}>
                        {day}
                    </div>
                ))}

                {paddingDays.map((_, i) => (
                    <div key={`pad-${i}`} />
                ))}

                {daysInMonth.map(day => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const isCompleted = habit.completedDates.includes(dateStr);
                    const isCurrentDay = isToday(day);

                    return (
                        <button
                            key={dateStr}
                            onClick={() => onToggleDate(habit.id, dateStr)}
                            style={{
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                fontSize: '0.9rem',
                                color: isCompleted ? 'var(--text-primary)' : 'var(--text-primary)',
                                position: 'relative',
                                transition: 'all 0.2s ease',
                                backgroundColor: isCurrentDay ? '#f5f5f5' : 'transparent',
                            }}
                        >
                            <span style={{ opacity: isCompleted ? 0.5 : 1 }}>{format(day, 'd')}</span>

                            {/* Crossed animation */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pointerEvents: 'none'
                            }}>
                                <div style={{
                                    width: isCompleted ? '70%' : '0%',
                                    height: '1.5px',
                                    backgroundColor: 'var(--text-primary)',
                                    transform: 'rotate(-45deg)',
                                    transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    opacity: 0.8
                                }} />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
