import { differenceInCalendarDays, parseISO, isToday, isYesterday } from 'date-fns';

export function calculateStreak(completedDates) {
    if (!completedDates || completedDates.length === 0) return 0;

    // Sort dates descending
    const sortedDates = [...completedDates].sort((a, b) => new Date(b) - new Date(a));

    // Check if the streak is active (completed today or yesterday)
    const lastCompleted = sortedDates[0];
    const lastDate = parseISO(lastCompleted);

    if (!isToday(lastDate) && !isYesterday(lastDate)) {
        return 0;
    }

    let streak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
        const current = parseISO(sortedDates[i]);
        const next = parseISO(sortedDates[i + 1]);

        const diff = differenceInCalendarDays(current, next);

        if (diff === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}
