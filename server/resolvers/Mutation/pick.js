const { getUserId } = require('../../utils')

const pick = {
  async upsertPick(parent, { data }, ctx, info) {
    const userId = getUserId(ctx);

    return data.map(async(pick) => {
      const { id, ...pickData } = pick;

      if (userId) {
        if (id) {
          return await ctx.prisma.updatePick({
            where: {
              id,
            },
            data: pickData
          });
        } else {
          return await ctx.prisma.createPick({
            ...pickData,
            user: {
              connect: {
                id: userId
              }
            },
          });
        }
      }
    })
  },

  async deletePick(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      return ctx.prisma.deletePick({ id }, info);
    }
  },
}

module.exports = { pick }
