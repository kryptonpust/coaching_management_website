const { notes } = require("../../models/index");


module.exports = {
  filterNotes: async args => {
    try {
      const result = await notes.findAll({
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

  notes: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await notes.findAndCountAll({ limit: lim, offset: off });
      //   console.log(result);
      result.page = args.page;
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editNotes: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await notes.create({
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
      await notes.update(
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
  deleteNotes: async args => {
    const id = args.id;
    try {
      const result = await notes.destroy({
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
