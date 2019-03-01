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
  // Subscription,
  AuthPayload,
}
