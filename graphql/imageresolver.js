const { images } = require("../models/index");
const fs = require('fs');
module.exports.resolver = {
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
    fs.unlink('../public_html'+src,async function(err){
      try {
        if(err) throw err;
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
    })
    
  }
};
module.exports.schema = {
  type: `
  type images {
    id: Int!
    sessionid: Int!
    link: String
}
type imagePaginate {
    count : Int!
    page: Int!
    rows : [images]!
}`,
  query: `images(size: Int!,page: Int!) : imagePaginate
  filterImages(sessionid: Int!): [images]!
  `,
  mutation: `editImages(id: Int,sessionid: Int!,link: String): images
  deleteImages(src: String!): Boolean
  `
};