const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = {
  async googleSSO(parent, args, ctx, info) {
    let user = await ctx.prisma.user({ email: args.email })

    if (!user) {
      user = await ctx.prisma.createUser({
        username: `${args.info.givenName} ${args.info.familyName}`,
        email: args.email,
        password: args.info.googleId,
        sso: 'google',
      })
    }

    return {
      token: jwt.sign({ userId: user.id }, 'process.env.APP_SECRET'),
      user,
    }
  },

  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({
      ...args,
      password,
    })

    return {
      token: jwt.sign({ userId: user.id }, 'process.env.APP_SECRET'),
      user,
    }
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.prisma.user({ email })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, 'process.env.APP_SECRET'),
      user,
    }
  },
}

module.exports = { auth }
