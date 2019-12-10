const { videocomments } = require("../../models/index");


module.exports = {
  filterVideocomments: async args => {
    try {
      const result = await videocomments.findAll({
        where: {
          videoid: args.videoid
        }
      });
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  //   videocomments: async args => {
  //     const lim = args.size;
  //     const off = args.page * lim;
  //     try {
  //       const result = await videocomments.findAndCountAll({ limit: lim, offset: off });
  //       //   console.log(result);
  //       result.page = args.page;
  //       return result;
  //     } catch (err) {
  //       // console.log(err)
  //       throw err;
  //     }
  //   },

  editVideocomments: async (args, req) => {
    const id = args.id;
    if (!id) {
      try {
        return await videocomments.create({
          videoid: args.videoid,
          title: args.title,
          comment: args.comment
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    // try {
    //   await videocomments.update(
    //     {
    //       videoid: args.videoid,
    //       chapterid: args.chapterid,
    //       title: args.title,
    //       comment: args.comment
    //     },
    //     {
    //       where: {
    //         id: id
    //       }
    //     }
    //   );
    //   return { title: args.title, comment: args.comment };
    // } catch (err) {
    //   // console.log(err)
    //   throw err;
    // }
  },
  deleteVideocomments: async args => {
    const id = args.id;
    try {
      const result = await videocomments.destroy({
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
