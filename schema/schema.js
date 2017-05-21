const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      // resolve function is where we actually go to our database and
      // find the data we are actually looking for
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3030/users/${args.id}`)
          .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
