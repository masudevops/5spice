// Collapses a per-day hours array (Monday...Sunday) into display-friendly
// ranges, e.g. [{days:'Mon - Thu', time:'9:00 AM - 10:00 PM'}, ...], by
// grouping consecutive days that share the same hours string.
const DAY_ABBREVIATIONS = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
};

export const summarizeHours = (hours = []) => {
    const groups = [];

    hours.forEach(({ day, hours: time }) => {
        const last = groups[groups.length - 1];
        if (last && last.time === time) {
            last.lastDay = day;
        } else {
            groups.push({ firstDay: day, lastDay: day, time });
        }
    });

    return groups.map((group) => ({
        days: group.firstDay === group.lastDay
            ? DAY_ABBREVIATIONS[group.firstDay] ?? group.firstDay
            : `${DAY_ABBREVIATIONS[group.firstDay] ?? group.firstDay} - ${DAY_ABBREVIATIONS[group.lastDay] ?? group.lastDay}`,
        time: group.time,
    }));
};
