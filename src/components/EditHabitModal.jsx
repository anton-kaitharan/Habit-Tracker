import React, { useState } from 'react';

export function EditHabitModal({ habit, onSave, onDelete, onClose }) {
    const [name, setName] = useState(habit ? habit.name : '');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--surface-color)',
                padding: 'var(--spacing-lg)',
                borderRadius: 'var(--radius-lg)',
                width: '90%',
                maxWidth: '400px',
                boxShadow: 'var(--shadow-elevation-medium)'
            }} onClick={e => e.stopPropagation()}>
                <h2 style={{
                    marginTop: 0,
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--text-primary)'
                }}>{habit ? 'Edit Habit' : 'New Habit'}</h2>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: 'var(--spacing-sm)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>
                        Habit Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Drink Water"
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-md)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                        autoFocus
                    />
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                    {habit && (
                        <button
                            onClick={() => onDelete(habit.id)}
                            style={{
                                marginRight: 'auto',
                                padding: '8px 16px',
                                color: '#e53935',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.95rem'
                            }}
                        >
                            Delete
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(habit ? habit.id : null, name)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                        disabled={!name.trim()}
                    >
                        {habit ? 'Save' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
}
