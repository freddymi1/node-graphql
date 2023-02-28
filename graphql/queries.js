const { GraphQLList, GraphQLID } = require("graphql");

const { UserType, PostType, CommentType } = require("./types");

const { User, Post, Comment } = require("../models");
const { findById } = require("../models/User");

const users = {
    type: new GraphQLList(UserType),
    description: "Get all users",
    resolve(parent, args, {verifiedUser}) {
        console.log("Verified User:", verifiedUser);
        if(!verifiedUser) {
            throw new Error("Acces refusé");
        }
        return User.find();
    }
}


const user = {
    type: UserType,
    description: "Get one user",
    args: { id: {type: GraphQLID} },
    resolve(parent, args, { verifiedUser }) {
        console.log("Verified User:", verifiedUser);
        if(!verifiedUser) {
            throw new Error("Acces refusé");
        }
        return User.findById(args.id)
    }
}

const posts = {
    type: new GraphQLList(PostType),
    description: "Get all list of posts",
    resolve() {
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

const comments = {
    type: new GraphQLList(CommentType),
    description: ("Get all lists of comments"),
    resolve(parent, args) {
        return Comment.find()
    }
}

const comment = {
    type: CommentType,
    description: ("Get one of comments"),
    args: {id: {type: GraphQLID}},
    resolve(_,args) {
        return Comment.findById(args.id)
    }
}

module.exports = { users, user, posts, post, comments, comment }