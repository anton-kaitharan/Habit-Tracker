import React, { useState } from 'react';
import { Home } from './components/Home';
import { HabitCalendar } from './components/HabitCalendar';

const INITIAL_HABITS = [
    {
        id: '1',
        name: 'Morning Meditation',
        completedDates: ['2024-05-20', '2024-05-19', '2024-05-18']
    },
    {
        id: '2',
        name: 'Read 30 Mins',
        completedDates: []
    },
    {
        id: '3',
        name: 'Workout',
        completedDates: ['2024-05-20']
    },
    {
        id: '4',
        name: 'Drink Water',
        completedDates: []
    },
    {
        id: '5',
        name: 'Journal',
        completedDates: []
    }
];

function App() {
    const [habits, setHabits] = useState(INITIAL_HABITS);
    const [selectedHabitId, setSelectedHabitId] = useState(null);

    const toggleHabitDate = (habitId, dateStr) => {
        setHabits(prev => prev.map(habit => {
            if (habit.id !== habitId) return habit;

            const exists = habit.completedDates.includes(dateStr);
            let newDates;
            if (exists) {
                newDates = habit.completedDates.filter(d => d !== dateStr);
            } else {
                newDates = [...habit.completedDates, dateStr];
            }
            return { ...habit, completedDates: newDates };
        }));
    };

    const editHabit = (id, newName) => {
        setHabits(prev => prev.map(habit =>
            habit.id === id ? { ...habit, name: newName } : habit
        ));
    };

    const addHabit = (name) => {
        const newHabit = {
            id: Date.now().toString(),
            name,
            completedDates: []
        };
        setHabits(prev => [...prev, newHabit]);
    };

    const deleteHabit = (id) => {
        if (window.confirm('Are you sure you want to delete this habit?')) {
            setHabits(prev => prev.filter(habit => habit.id !== id));
        }
    };

    const selectedHabit = habits.find(h => h.id === selectedHabitId);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
            {selectedHabit ? (
                <HabitCalendar
                    habit={selectedHabit}
                    onToggleDate={toggleHabitDate}
                    onBack={() => setSelectedHabitId(null)}
                />
            ) : (
                <Home
                    habits={habits}
                    onSelectHabit={setSelectedHabitId}
                    onEdit={editHabit}
                    onDelete={deleteHabit}
                    onAdd={addHabit}
                />
            )}
        </div>
    );
}

export default App;
