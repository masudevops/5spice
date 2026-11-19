// Scheduling for TV promotions, always in Murphy's time zone (America/Chicago)
// whatever time zone the TV stick itself is set to.
const TIME_ZONE = 'America/Chicago';

// Now in Chicago: { date: '2026-11-18', time: '14:05', day: 'wed' }.
export const chicagoNow = (at = new Date()) => {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-US', {
            timeZone: TIME_ZONE,
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short',
        }).formatToParts(at).map((part) => [part.type, part.value]),
    );
    return {
        date: `${parts.year}-${parts.month}-${parts.day}`,
        time: `${parts.hour}:${parts.minute}`,
        day: parts.weekday.slice(0, 3).toLowerCase(),
    };
};

// Whether a schedule allows showing now. Every field is optional:
//   startDate / endDate   'YYYY-MM-DD', both days included
//   days                  e.g. ['mon', 'tue', 'wed', 'thu', 'fri']
//   startTime / endTime   'HH:MM' (24-hour); a window like 22:00–02:00 runs
//                         past midnight
export const isScheduled = (schedule, now = chicagoNow()) => {
    if (!schedule) return true;
    const { startDate, endDate, days, startTime, endTime } = schedule;
    if (startDate && now.date < startDate) return false;
    if (endDate && now.date > endDate) return false;
    if (days && !days.includes(now.day)) return false;
    if (startTime && endTime && startTime > endTime) return now.time >= startTime || now.time < endTime;
    if (startTime && now.time < startTime) return false;
    if (endTime && now.time >= endTime) return false;
    return true;
};

// A campaign or slide shows when it isn't switched off and its schedule allows.
export const isLive = (entry, now) => entry.enabled !== false && isScheduled(entry.schedule, now);
