const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  categories: forwardTo('db'),
  category: forwardTo('db'),
  introSliders: forwardTo('db'),
  introSlider: forwardTo('db'),
  orders: forwardTo('db'),
  order: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  settingses: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },

  async users(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    return ctx.db.query.users({}, info);
  },

/*  async order(parent, args, ctx, info){
    if(!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const order = await ctx.db.query.order({
      where: { id: args.id },
    }, info);

    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if(!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You cannot see this');
    }
    return order;
  },

  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if(!userId) {
      throw new Error('You must be logged in!');
    }
    return ctx.db.query.orders({
      where: {
        user: { id: userId },
      },
    }, info);
  }, */
};

module.exports = Query;
