const { Documents } = require("../models/index");


const aboutUs = "aboutUs";
const profile = "Profile";
const propic= "profilepic";
module.exports.resolver = {
  aboutUs: async () => {
    try {
      return await Documents.findOne({ where: { title: aboutUs } });
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  profile: async () => {
    try {
      return await Documents.findOne({ where: { title: profile } });
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  profilePic: async () => {
    try {
      return await Documents.findOne({ where: { title: propic } });
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editAboutUs: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const input = args.html;
    const check = await Documents.findOne({ where: { title: aboutUs } });

    if (!check) {
      try {
        return await Documents.create({
          title: aboutUs,
          page: input
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await Documents.update(
        {
          page: input
        },
        {
          where: {
            title: aboutUs
          }
        }
      );
      return { page: input };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editProfile: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const input = args.html;
    const check = await Documents.findOne({ where: { title: profile } });
    if (!check) {
      try {
        return await Documents.create({
          title: profile,
          page: input
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await Documents.update(
        {
          page: input
        },
        {
          where: {
            title: profile
          }
        }
      );
      return { page: input };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  editProfilePic: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const input = args.html;
    const check = await Documents.findOne({ where: { title: propic } });
    if (!check) {
      try {
        return await Documents.create({
          title: propic,
          page: input
        });
      } catch (err) {
        // console.log(err)
        throw err;
      }
    }
    try {
      await Documents.update(
        {
          page: input
        },
        {
          where: {
            title: propic
          }
        }
      );
      return { page: input };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  }
};
module.exports.schema = {
  type: `
  type Dochtml{
    page: String
}`,
  query: `profile: Dochtml!
  profilePic: Dochtml!
  aboutUs: Dochtml!
  `,
  mutation: `editProfile(html: String!): Dochtml!
  editProfilePic(html: String!): Dochtml!
  editAboutUs(html: String!): Dochtml!
  `
};