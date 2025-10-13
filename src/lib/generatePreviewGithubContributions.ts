import type { ContributionsCollection, ContributionsWeek } from "@/types/widget-types";

export const generateContributionsData = (): ContributionsCollection => {
  const weeks = 10; // Number of weeks to generate data for
  const colors = [
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39"
  ];

  const contributions = [];

  for (let i = 0; i < weeks; i++) {
    const week: ContributionsWeek = {
      firstDay: new Date(2024, 3, 10 + i * 7).toISOString(),
      contributionDays: []
    };

    for (let j = 0; j < 7; j++) {
      const contributionCount = Math.floor(Math.random() * 20);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const date = new Date(2024, 3, 10 + i * 7 + j).toISOString();
      week.contributionDays.push({
        color,
        contributionCount,
        date,
        weekday: j
      });
    }

    contributions.push(week);
  }

  return {
    colors: colors,
    weeks: contributions,
    totalContributions: 0
  };
};