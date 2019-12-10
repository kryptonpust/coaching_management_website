const { notices } = require("../../models/index");

module.exports = {
  latestNotices: async (args, req) => {
    // if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    try {
      const result = await notices.findAll({
        limit: lim,
        order: [["createdAt", "DESC"]]
      });
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  allNotices: async args => {
    try {
      const result = await notices.findAll();
      //   console.log(result);
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  notices: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await notices.findAndCountAll({ limit: lim, offset: off });
      //   console.log(result);
      result.page = args.page;
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editNotices: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await notices.create({
          title: args.title,
          file: args.file
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await notices.update(
        {
          title: args.title,
          file: args.file
        },
        {
          where: {
            id: id
          }
        }
      );
      return { title: args.title, file: args.file };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  deleteNotices: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    try {
      const result = await notices.destroy({
        where: {
          id: id
        }
      });
      console.log(result);
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  }
};
