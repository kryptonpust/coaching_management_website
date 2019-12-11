const { videos } = require("../models/index");

module.exports.resolver = {
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
module.exports.schema = {
  type: `
  type videos {
    id: Int!
    chapterid: Int!
    title: String
    file: String
    updatedAt: Date!
}
type videoPaginate {
    count : Int!
    page: Int!
    rows : [videos]!
}
`,
  query: `
  videos(size: Int!,page: Int!) : videoPaginate
  filterVideos(chapterid: Int!): [videos]!
  `,
  mutation: `
  editVideos(id: Int,chapterid: Int!,title: String!,file: String): videos
    deleteVideos(id: Int!): Boolean
  `
};