const { Users } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.resolver = {
  users: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    try {
      return await Users.findAll();
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  createUser: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const input = args.userInput;
    try {
      const hashedpass = await bcrypt.hash(input.password, 12);
      if (!hashedpass) throw new Error("Failed to hash pass");
      return await Users.create({
        name: input.name,
        email: input.email,
        password: hashedpass,
        phone: input.phone
      });
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },
  login: async args => {
    const input = args.credentials;
    if (!input.access) throw new Error("Authentication Type Error");
    let admin;
    if (input.access === "admin") {
      admin = await Users.findOne({ where: { email: input.email } });
    } else {
      admin = "";
    }
    if (!admin) throw new Error("Authentication Error");
    const isauthorized = await bcrypt.compare(input.password, admin.password);
    if (!isauthorized) throw new Error("Authentication Error");
    const token = await jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_PRIVATE,
      {
        expiresIn: "1h"
      }
    );
    return { id: admin.id, token: token, access: input.access };
  }
};
module.exports.schema = {
  type: `
  type Users {
    id: Int!
    name: String!
    email: String!
    phone: String
}
type jwt{
    id: Int!
    token: String!
    access: String!
}
input login {
    email: String!
    password: String!
    access: String
}
input UserInput {
    name: String!
    email: String!
    password : String!
    phone: String
}`,
  query: `users: [Users!]!
  login(credentials: login): jwt!
  `,
  mutation: `createUser(userInput: UserInput!): Users!
  `
};