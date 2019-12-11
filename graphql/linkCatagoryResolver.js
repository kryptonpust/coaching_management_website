const { linkCatagories } = require("../models/index");


module.exports.resolver = {
  allLinkCatagories: async args => {
    try {
      const result = await linkCatagories.findAll();
      //   console.log(result);
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  linkCatagories: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await linkCatagories.findAndCountAll({
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

  editLinkCatagories: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await linkCatagories.create({
          title: args.title
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await linkCatagories.update(
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
  deleteLinkCatagories: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    try {
      const result = await linkCatagories.destroy({
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
  type linkCatagories{
    id: Int!
    title: String
}
type linkCatagoriesPaginate {
    count : Int!
    page: Int!
    rows : [linkCatagories]!
}`,
  query: ` allLinkCatagories: [linkCatagories]!
  linkCatagories(size: Int!,page: Int!) : linkCatagoriesPaginate
  `,
  mutation: `editLinkCatagories(id: Int,title: String!): linkCatagories
  deleteLinkCatagories(id: Int!): Boolean
  `
};