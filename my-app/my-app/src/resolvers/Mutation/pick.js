const { getUserId } = require('../../utils')

const pick = {
  async upsertPick(parent, { groupId, pickId, data }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      if (pickId) {
        return await ctx.db.mutation.updatePick({
          where: {
            id: pickId
          },
          data
        });
      } else {
        const groupExists = await ctx.db.exists.Group({ id: groupId });

        if (!groupExists) {
          throw new Error(`Group not found`)
        }

        return await ctx.db.mutation.createPick({
          data: {
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
          }
        });
      }

    }
  },

  // async updatePick(parent, { groupId, data }, ctx, info) {
  //   const userId = getUserId(ctx);

  //   if (userId) {
  //     return ctx.db.mutation.updatePick({ data }, info);
  //   }
  // },
}

module.exports = { pick }
