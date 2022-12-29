const { GraphQLList, GraphQLID } = require("graphql");

const { UserType, PostType } = require("./types");

const { User, Post } = require("../models");
const { findById } = require("../models/User");

const users = {
    type: new GraphQLList(UserType),
    description: "Get all users",
    resolve(parent, args) {
        return User.find();
    }
}


const user = {
    type: UserType,
    description: "Get one user",
    args: { id: {type: GraphQLID} },
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

const posts = {
    type: new GraphQLList(PostType),
    description: "Get all list of posts",
    resolve(){
        return Post.find()
    }
}

const post = {
    type: PostType,
    description: "Get one of posts",
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Post.findById(args.id)
    }
}

module.exports = { users, user, posts, post }