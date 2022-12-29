const { PostType } = require("./types");

const { User, Post } = require("../models");

const { GraphQLString } = require("graphql");

const { createJwtToken } = require("../utils/auth");

const registerUser = {
    type: GraphQLString,
    args: {
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
        displayName: {type: GraphQLString}
    },
    async resolve(parent, args) {
        const {
            name,
            lastName,
            username,
            password,
            email,
            displayName,
        } = args;
        const user = new User({
            name,
            lastName,
            username,
            password,
            email,
            displayName
        });

        await user.save();

        const token = createJwtToken(user);
        return JSON.stringify(token);
    }
}

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type:GraphQLString },
    },

    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email}).select("+password");
        console.log("USER", user);
        if(!user || args.password !== user.password) {

            throw new Error("Erreur d'authentification");

        }

        const token = createJwtToken(user);
        return token;
    }
}

const addPost = {
    type: PostType,
    description: "Creation article",
    args: {
        title: {type: GraphQLString},
        description: {type: GraphQLString},
    },
    resolve(parent, args, {verifiedUser}) {
        console.log("Verified User:", verifiedUser);
        if(!verifiedUser) {
            throw new Error("Acces refusé");
        }

        const post = new Post({
            authorId: verifiedUser._id,
            title: args.title,
            description: args.description
        });

        return post.save();
    }
}

module.exports = { registerUser, login, addPost }