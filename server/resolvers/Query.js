const { getUserId } = require('../utils')
const rp = require('request-promise');


const NBA_BRACKETS_URL = 'https://data.nba.net/prod/v1/2017/playoffsBracket.json';

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

  NBABracket(parent, args, ctx, info) {
    return rp({ uri: NBA_BRACKETS_URL })
      .then(data => JSON.parse(data).series)
      .catch(data => {});
  },

  currentUser(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.prisma.user({ id }, info)
  },
}

module.exports = { Query }
