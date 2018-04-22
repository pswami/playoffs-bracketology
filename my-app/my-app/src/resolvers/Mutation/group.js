const { getUserId } = require('../../utils')

const group = {
  async createGroup(parent, { data }, ctx, info) {
    const userId = getUserId(ctx)

    if (userId) {
      return ctx.db.mutation.createGroup({
        data: {
          ...data,
          users: {
            connect: {
              id: userId
            }
          }
        },
      });
    }
  },

  async addUserToGroup(parent, { groupId, userId }, ctx, info) {
    const groupExists = await ctx.db.exists.Group({ id: groupId });

    if (!groupExists || !userId) {
      throw new Error(`Group not found or you do not have access`)
    }

    return ctx.db.mutation.updateGroup({
      where: { id: groupId },
      data: {
        users: {
          connect: {
            id: userId
          }
        }
      },
    }, info);
  },

  // async deletePost(parent, { id }, ctx, info) {
  //   const userId = getUserId(ctx)
  //   const postExists = await ctx.db.exists.Post({
  //     id,
  //     author: { id: userId },
  //   })
  //   if (!postExists) {
  //     throw new Error(`Post not found or you're not the author`)
  //   }

  //   return ctx.db.mutation.deletePost({ where: { id } })
  // },
}

module.exports = { group }
