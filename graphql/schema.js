// Import all required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Import queries
const {users, user, posts, post} = require("./queries")

// Import mutations
const {registerUser, login, addPost} = require("./mutation")

// Define QueryTypes
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { users, user, posts, post },
})  

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: { registerUser, login, addPost },
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})