const { videos } = require("../../models/index");

module.exports = {
  filterVideos: async args => {
    try {
      const result = await videos.findAll({
        where: {
          chapterid: args.chapterid
        }
      });
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  videos: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await videos.findAndCountAll({ limit: lim, offset: off });
      //   console.log(result);
      result.page = args.page;
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editVideos: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await videos.create({
          chapterid: args.chapterid,
          title: args.title,
          file: args.file
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await videos.update(
        {
          chapterid: args.chapterid,
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
  deleteVideos: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    try {
      const result = await videos.destroy({
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
