const { Query } = require('./Query')
// const { Subscription } = require('./Subscription')
const { auth } = require('./Mutation/auth')
const { group } = require('./Mutation/group')
const { pick } = require('./Mutation/pick')
const { AuthPayload } = require('./AuthPayload')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...group,
    ...pick,
  },
  User: {
    groups(parent, args, ctx, info) {
      return ctx.prisma.user({ id: parent.id }).groups();
    },
    picks(parent, args, ctx, info) {
      return ctx.prisma.user({ id: parent.id }).picks();
    }
  },
  Group: {
    users(parent, args, ctx, info) {
      return ctx.prisma.group({ id: parent.id }).users();
    }
  },
  Pick: {
    user(parent, args, ctx, info) {
      return ctx.prisma.pick({ id: parent.id }).user();
    },
  },
  // Subscription,
  AuthPayload,
}
