const AuthPayload = {
  user: async ({ user: { id } }, args, ctx, info) => {
    return ctx.prisma.user({ id }, info)
  },
}

module.exports = { AuthPayload }