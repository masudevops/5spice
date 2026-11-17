// Rounds a verified total DOWN to a public milestone: below 1,000 to a set
// step (e.g. 620 → "500+"), from 1,000 to the nearest hundred (e.g.
// 1640 → "1,600+"), and from 10,000 to the nearest 5,000. Returns null when the total is missing or below `minimum`, so the metric
// stays hidden instead of showing a small or made-up number.
const MILESTONES = [50, 100, 250, 500, 750];

export const toMilestone = (total, minimum = 1) => {
    if (!Number.isFinite(total) || total < minimum) return null;
    let step;
    if (total >= 10000) step = Math.floor(total / 5000) * 5000;
    else if (total >= 1000) step = Math.floor(total / 100) * 100;
    else step = [...MILESTONES].reverse().find((milestone) => milestone <= total);
    return step ? `${step.toLocaleString('en-US')}+` : null;
};
