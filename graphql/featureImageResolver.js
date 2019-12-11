const { featureimages } = require("../models/index");

module.exports.resolver = {
  allFeatureimages: async args => {
    try {
      const result = await featureimages.findAll();
      return result;
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

//   featureimages: async (args, req) => {
//     if (!req.isAuth) throw new Error("UnAuthenticated");
//     const lim = args.size;
//     const off = args.page * lim;
//     try {
//       const result = await featureimages.findAndCountAll({ limit: lim, offset: off });
//       //   console.log(result);
//       result.page = args.page;
//       return result;
//     } catch (err) {
//       // console.log(err)
//       throw err;
//     }
//   },

  editFeatureimages: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const id = args.id;
    if (!id) {
      try {
        return await featureimages.create({
          src: args.src
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await featureimages.update(
        {
          sessionid: args.sessionid,
          src: args.src
        },
        {
          where: {
            id: id
          }
        }
      );
      return {src: args.src };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  deleteFeatureimages: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const src = args.src;
    try {
      const result = await featureimages.destroy({
        where: {
          src: src
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
  type featureimages {
    id: Int!
    src: String!
}`,
  query: `allFeatureimages: [featureimages]!
  `,
  mutation: `editFeatureimages(id: Int,src: String): featureimages
  deleteFeatureimages(src: String!): Boolean
  `
};
