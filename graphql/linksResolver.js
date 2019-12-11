const { links } = require("../models/index");


module.exports.resolver = {
  filterLinks: async args => {
    try {
      const result = await links.findAll({
        where: {
          catagoryid: args.catagoryid
        }
      });
      //   console.log(result);
      result.page = args.page;
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  links: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await links.findAndCountAll({ limit: lim, offset: off });
      //   console.log(result);
      result.page = args.page;
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editLinks: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await links.create({
          catagoryid: args.catagoryid,
          title: args.title,
          link: args.link
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await links.update(
        {
          catagoryid: args.catagoryid,
          title: args.title,
          link: args.link
        },
        {
          where: {
            id: id
          }
        }
      );
      return { title: args.title, link: args.link };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  deleteLinks: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    try {
      const result = await links.destroy({
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
  type links {
    id: Int!
    catagoryid:Int!
    title: String
    link: String
}
type linkPaginate {
    count : Int!
    page: Int!
    rows : [links]!
}`,
  query: `links(size: Int!,page: Int!) : linkPaginate
  filterLinks(catagoryid:Int!): [links]!
  `,
  mutation: `editLinks(id: Int,catagoryid: Int!title: String!,link: String): links
  deleteLinks(id: Int!): Boolean
  `
};