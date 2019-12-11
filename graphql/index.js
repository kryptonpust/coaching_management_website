const { buildSchema } = require("graphql");

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const graphql = {
  types: "",
  querys: "",
  mutations: ""
};
let resolver = {};

fs.readdirSync(__dirname )
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const input = require(path.join(__dirname , file));
    if(input.resolver)
    {
        resolver = { ...resolver, ...input.resolver };
    }
    const schema = input.schema;
    if (schema) {
      graphql.types = graphql.types.concat(schema.type);
      graphql.querys = graphql.querys.concat(schema.query);
      graphql.mutations = graphql.mutations.concat(schema.mutation);
    }
  });
//    console.log(graphql)

module.exports.resolver = resolver;
const build=`
scalar Date
${graphql.types}
type RootQuery {
    ${graphql.querys}
}
type RootMutation { 
    ${graphql.mutations}  
}
schema {
    query: RootQuery
    mutation: RootMutation
}    
`

module.exports.schema = buildSchema(build);
