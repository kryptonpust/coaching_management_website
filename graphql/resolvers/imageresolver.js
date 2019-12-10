const { images } = require("../../models/index");

module.exports = {
  filterImages: async args => {
    try {
      const result = await images.findAll({
        where: {
          sessionid: args.sessionid
        }
      });
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  images: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await images.findAndCountAll({ limit: lim, offset: off });
      //   console.log(result);
      result.page = args.page;
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editImages: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await images.create({
          sessionid: args.sessionid,
          link: args.link
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await images.update(
        {
          sessionid: args.sessionid,
          link: args.link
        },
        {
          where: {
            id: id
          }
        }
      );
      return {link: args.link };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  deleteImages: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const src = args.src;
    try {
      const result = await images.destroy({
        where: {
          link: src
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
