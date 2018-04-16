export const iconNBALink = tricode => `http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${tricode}.svg`

export const roundNames = {
  1: "First Round",
  2: "Semi-Finals",
  3: "Conference Finals",
  4: "Finals",
};

export const checkSeriesLocked = series => (
  !series.isScheduleAvailable ||
  series.isSeriesCompleted ||
  series.isGameLive ||
  series.gameNumber > 1
);