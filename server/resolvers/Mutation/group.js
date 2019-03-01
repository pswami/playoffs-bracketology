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

  async updateGroup(parent, { groupId, data }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      return ctx.db.mutation.updateGroup({ data }, info);
    }
  },

  async addUserToGroup(parent, { groupId, userId }, ctx, info) {
    const groupExists = await ctx.db.exists.Group({ id: groupId });

    if (!userId) {
      throw new Error(`User not found`)
    }

    if (!groupExists) {
      throw new Error(`Group not found`)
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

  async deleteGroup(parent, { where }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      return ctx.db.mutation.deleteGroup({ where }, info);
    }
  },
}

module.exports = { group }
