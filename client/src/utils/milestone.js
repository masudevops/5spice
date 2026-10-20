// Rounds a verified total DOWN to a public milestone, e.g. 1240 → "1,000+".
// Returns null when the total is missing or below `minimum`, so the metric
// stays hidden instead of showing a small or made-up number.
const MILESTONES = [50, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000];

export const toMilestone = (total, minimum = 1) => {
    if (!Number.isFinite(total) || total < minimum) return null;
    const step = total >= 10000
        ? Math.floor(total / 5000) * 5000
        : [...MILESTONES].reverse().find((milestone) => milestone <= total);
    return step ? `${step.toLocaleString('en-US')}+` : null;
};
