const { chapters } = require("../models/index");

module.exports.resolver = {
  allChapters: async (args, req) => {
    try {
      const result = await chapters.findAll();
      //   console.log(result);
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  chapters: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await chapters.findAndCountAll({
        limit: lim,
        offset: off
      });
      //   console.log(result);
      result.page = args.page;
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editChapters: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await chapters.create({
          title: args.title
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await chapters.update(
        {
          title: args.title
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
  deleteChapters: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    try {
      const result = await chapters.destroy({
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
module.exports.schema = {
  type: `
  type chapters{
    id: Int!
    title: String
}
type chapterPaginate {
    count : Int!
    page: Int!
    rows : [chapters]!
}`,
  query: `allChapters: [chapters]!
  chapters(size: Int!,page: Int!) : chapterPaginate
  `,
  mutation: `editChapters(id: Int,title: String!): chapters
  deleteChapters(id: Int!): Boolean
  `
};
