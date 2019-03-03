const { getUserId } = require('../../utils')

const pick = {
  async upsertPick(parent, { groupId, pickId, data }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      if (pickId) {
        return await ctx.updatePick({
          where: {
            id: pickId
          },
          data
        });
      } else {
        const groupExists = await ctx.prisma.$exists.group({ id: groupId });

        if (!groupExists) {
          throw new Error(`Group not found`)
        }

        return await ctx.prisma.createPick({
          ...data,
          user: {
            connect: {
              id: userId
            }
          },
          group: {
            connect: {
              id: groupId
            }
          }
        });
      }

    }
  },

  async deletePick(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      return ctx.prisma.deletePick({ id }, info);
    }
  },
}

module.exports = { pick }
