const { getUserId } = require('../../utils')

const group = {
  async createGroup(parent, { data }, ctx, info) {
    const userId = getUserId(ctx)

    if (userId) {
      return ctx.prisma.createGroup({
        ...data,
      }, info);
    }
  },

  async updateGroup(parent, { where, groupId, data }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      return ctx.prisma.updateGroup({ where, data }, info);
    }
  },

  async addUserToGroup(parent, { groupId, userId }, ctx, info) {
    console.log(ctx.prisma)
    const groupExists = await ctx.prisma.$exists.group({ id: groupId });

    if (!userId) {
      throw new Error(`User not found`)
    }

    if (!groupExists) {
      throw new Error(`Group not found`)
    }

    return ctx.prisma.updateGroup({
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

  async deleteGroup(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);

    if (userId) {
      return ctx.prisma.deleteGroup({ id }, info);
    }
  },
}

module.exports = { group }
