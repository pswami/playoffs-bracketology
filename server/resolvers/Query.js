const { getUserId } = require('../utils')
const rp = require('request-promise');

const Query = {
  group(parent, args, ctx, info) {
    return ctx.prisma.group({ id: args.id }, info)
  },

  groups(parent, args, ctx, info) {
    return ctx.prisma.groups(args, info)
  },

  users(parent, args, ctx, info) {
    return ctx.prisma.users(args, info)
  },

  picks(parent, args, ctx, info) {
    return ctx.prisma.picks(args, info)
  },

  NBABracket(parent, args, ctx, info) {
    const year = args.year || 2020;

    if (year < 2020) {
      const NBA_BRACKETS_URL = `https://data.nba.net/prod/v1/${year}/playoffsBracket.json`;

      return rp({ uri: NBA_BRACKETS_URL })
        .then(data => JSON.parse(data).series)
        .catch(data => {});
    } else {
      const NBA_BRACKETS_STATS_URL = `https://stats.nba.com/stats/playoffbracket?LeagueID=00&SeasonYear=${year}&State=2`;

      return rp({ uri: NBA_BRACKETS_STATS_URL })
        .then(data => {
          const json = JSON.parse(data);

          return json.bracket.playoffBracketSeries.map((series) => {
            return {
              "roundNum": series.roundNumber,
              "confName": series.seriesConference,
              "seriesId": parseInt(series.seriesId.split('_').map(a => a.slice(-3)).join('')),
              "isScheduleAvailable": true,
              "isSeriesCompleted": series.seriesWinner > 0,
              "summaryStatusText": series.seriesText,
              "gameNumber": parseInt((series.nextGameNumber || '0').slice(-1)),
              "isGameLive": series.nextGameStatus > 1,
              "topRow": {
                "teamId": series.highSeedId,
                "seedNum": series.highSeedRank,
                "wins": series.highSeedSeriesWins,
                "isSeriesWinner": series.highSeedId == series.seriesWinner
              },
              "bottomRow": {
                "teamId": series.lowSeedId,
                "seedNum": series.lowSeedRank,
                "wins": series.lowSeedSeriesWins,
                "isSeriesWinner": series.lowSeedId == series.seriesWinner
              }
            };
          });
        })
        .catch(data => {});
    }
  },

  currentUser(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.prisma.user({ id }, info)
  },
}

module.exports = { Query }
