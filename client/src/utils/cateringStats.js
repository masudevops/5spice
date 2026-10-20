import { CATERING_STATS } from '../config/site';
import { toMilestone } from './milestone';

// Each metric shows only once its verified total reaches `minimum`.
const METRICS = [
    { key: 'guestsServed', label: 'Guests Served Through Catering', minimum: 100 },
    { key: 'eventsCompleted', label: 'Catering Events Completed', minimum: 10 },
];

// Catering milestones ready to display, e.g. [{ key, label, value: '1,000+' }].
// Empty when no metric has a verified total, so callers can hide themselves.
export const getCateringMetrics = () => METRICS
    .map((metric) => ({ ...metric, value: toMilestone(CATERING_STATS[metric.key], metric.minimum) }))
    .filter((metric) => metric.value);
