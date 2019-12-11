const { sessions } = require("../models/index");

module.exports.resolver = {
  allSessions: async (args, req) => {
    try {
      const result = await sessions.findAll();
      //   console.log(result);
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  sessions: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const lim = args.size;
    const off = args.page * lim;
    try {
      const result = await sessions.findAndCountAll({
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

  editSessions: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await sessions.create({
          title: args.title
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await sessions.update(
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
  deleteSessions: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    try {
      const result = await sessions.destroy({
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
  type sessions{
    id: Int!
    title: String
}
type sessionPaginate {
    count : Int!
    page: Int!
    rows : [sessions]!
}`,
  query: `allSessions: [sessions]!
  sessions(size: Int!,page: Int!) : sessionPaginate
  `,
  mutation: `editSessions(id: Int,title: String!): sessions
  deleteSessions(id: Int!): Boolean
  `
};