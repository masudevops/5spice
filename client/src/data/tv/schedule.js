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

// Meal serving hours, separate from when slides show: a meal's slides can
// play all day while saying whether it's being served right now.
//   hours: { startTime: '11:00', endTime: '15:00', days: optional }
const WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const clock = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return { text: `${hour % 12 || 12}${minute ? `:${String(minute).padStart(2, '0')}` : ''}`, meridiem: hour < 12 ? 'AM' : 'PM' };
};

// '11:00'–'15:00' → '11 AM–3 PM'; '17:00'–'21:00' → '5–9 PM'.
export const formatHours = ({ startTime, endTime }) => {
    const start = clock(startTime);
    const end = clock(endTime);
    return start.meridiem === end.meridiem
        ? `${start.text}–${end.text} ${end.meridiem}`
        : `${start.text} ${start.meridiem}–${end.text} ${end.meridiem}`;
};

// 'now' (being served), 'later' (later today), 'tomorrow', or 'other'.
export const servingStatus = (hours, now = chicagoNow()) => {
    if (isScheduled(hours, now)) return 'now';
    const servedOn = (day) => !hours.days || hours.days.includes(day);
    if (servedOn(now.day) && now.time < hours.startTime) return 'later';
    return servedOn(WEEK[(WEEK.indexOf(now.day) + 1) % 7]) ? 'tomorrow' : 'other';
};

// The line a slide shows: 'Now serving · until 3 PM', 'Today · 5–9 PM' (later
// today), or just the hours once today's serving is over: 'Served 7–11 AM'.
export const servingLabel = (hours, now = chicagoNow()) => {
    const range = formatHours(hours);
    const end = clock(hours.endTime);
    return {
        now: `Now serving · until ${end.text} ${end.meridiem}`,
        later: `Today · ${range}`,
        tomorrow: `Served ${range}`,
        other: `Served ${range}`,
    }[servingStatus(hours, now)];
};
