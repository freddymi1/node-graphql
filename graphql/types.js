const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");

const { User, Post, Comment } = require("../models");


const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        lastName: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        displayName: { type: GraphQLString },
    })
});

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Post type",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { 
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.authorId)
            }
        },
        comments: { 
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                return Comment.find({postId: parent.id})
            }
        },
    })
});

const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "Comment type",
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId)
            }
        },
        post: {
            type: PostType,
            resolve(parent, args){
                return Post.findById(parent.postId)
            }
        }
    })
});

module.exports = { UserType, PostType, CommentType }