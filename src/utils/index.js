import teams from '../data/teams.json';

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

export const getWinner = (series) => {
  let teamWinner = {};
  let totalGames = 0;

  if (series.topRow.isSeriesWinner) {
    teamWinner = series.topRow;
  }

  if (series.bottomRow.isSeriesWinner) {
    teamWinner = series.bottomRow;
  }

  totalGames += parseInt(series.topRow.wins);
  totalGames += parseInt(series.bottomRow.wins);

  return {
    team: (teams[teamWinner.teamId] || {}).tricode,
    games: totalGames.toString()
  };
};