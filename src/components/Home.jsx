import React, { useState } from 'react';
import { calculateStreak } from '../utils';
import { EditHabitModal } from './EditHabitModal';

export function Home({ habits, onSelectHabit, onEdit, onDelete, onAdd }) {
    const [editingHabitId, setEditingHabitId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleEditClick = (e, habitId) => {
        e.stopPropagation();
        setEditingHabitId(habitId);
    };

    const handleSave = (id, newName) => {
        if (isAdding) {
            onAdd(newName);
            setIsAdding(false);
        } else {
            onEdit(id, newName);
            setEditingHabitId(null);
        }
    };

    const handleDelete = (id) => {
        onDelete(id);
        setEditingHabitId(null);
    };

    const handleClose = () => {
        setEditingHabitId(null);
        setIsAdding(false);
    };

    return (
        <div className="fade-in">
            <header style={{ marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-lg)' }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)'
                }}>
                    Habits
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </header>

            <ul>
                {habits.map(habit => {
                    const streak = calculateStreak(habit.completedDates);
                    return (
                        <li key={habit.id} style={{ marginBottom: 'var(--spacing-md)' }}>
                            <div
                                onClick={() => onSelectHabit(habit.id)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: 'var(--spacing-md)',
                                    backgroundColor: 'var(--surface-color)',
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: 'var(--shadow-subtle)',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                                    position: 'relative' // Needed for positioning if we add absolute elements
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                                }}
                            >
                                <div>
                                    <h3 style={{
                                        margin: 0,
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                        color: 'var(--text-primary)'
                                    }}>
                                        {habit.name}
                                    </h3>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {streak > 0 && (
                                        <span style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-secondary)',
                                            backgroundColor: '#f5f5f5',
                                            padding: '4px 8px',
                                            borderRadius: '12px'
                                        }}>
                                            {streak} day{streak !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                    <button
                                        onClick={(e) => handleEditClick(e, habit.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: 'var(--text-secondary)',
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0.6,
                                            transition: 'opacity 0.2s'
                                        }}
                                        title="Edit"
                                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                        onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <span style={{ color: 'var(--text-secondary)' }}>›</span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <button
                onClick={() => setIsAdding(true)}
                style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    marginTop: 'var(--spacing-md)',
                    backgroundColor: 'transparent',
                    border: '2px dashed var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Habit
            </button>

            {habits.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--spacing-lg)'
                }}>
                    No habits yet. Click "Add Habit" to start.
                </div>
            )}

            {(editingHabitId || isAdding) && (
                <EditHabitModal
                    habit={editingHabitId ? habits.find(h => h.id === editingHabitId) : null}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}
