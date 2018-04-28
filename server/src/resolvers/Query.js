const { getUserId } = require('../utils')
const rp = require('request-promise');


const NBA_BRACKETS_URL = 'https://data.nba.net/prod/v1/2017/playoffsBracket.json';

const Query = {
  // feed(parent, args, ctx, info) {
  //   return ctx.db.query.posts({ where: { isPublished: true } }, info)
  // },

  // drafts(parent, args, ctx, info) {
  //   const id = getUserId(ctx)

  //   const where = {
  //     isPublished: false,
  //     author: {
  //       id
  //     }
  //   }

  //   return ctx.db.query.posts({ where }, info)
  // },

  // post(parent, { id }, ctx, info) {
  //   return ctx.db.query.post({ where: { id } }, info)
  // },


  getNBABracket(parent, args, ctx, info) {
    return rp({ uri: NBA_BRACKETS_URL })
      .then(data => JSON.parse(data).series)
      .catch(data => {});
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
