const { PostType, CommentType } = require("./types");

const { User, Post, Comment } = require("../models");

const { GraphQLString } = require("graphql");

const { createJwtToken } = require("../utils/auth");
const { json } = require("body-parser");

/**
 * @author Freddy Michel
 * @description register User using graphQl
 */

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

/**
 * @author Freddy Michel
 * @description login using graphQl
 */

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

            throw new Error("Erreur d'authentification, verifier votre username ou mot de passe!");

        }

        const token = createJwtToken(user);
        return token;
    }
}

/**
 * @author Freddy Michel
 * @description create post data using graphQl
 */

const addPost = {
    type: PostType,
    description: "Creation article",
    args: {
        title: {type: GraphQLString},
        description: {type: GraphQLString},
    },
    resolve(parent, args, {verifiedUser}) {
        console.log("Verified User:", verifiedUser);
        // Levé une exception
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

/**
 * @author Freddy Michel
 * @description Update post by ID using graphQl
 */

const updatePost = {
    type: PostType,
    description: "Update post",
    args: {
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    },
    async resolve(parent, args, { verifiedUser }) {
        if (!verifiedUser) {
            throw new Error("Access refusé")
        }

        const postUpdated = await Post.findByIdAndUpdate({
            _id: args.id,
            userId: verifiedUser._id
        }, {
            title: args.title,
            description: args.description
        }, {
            new: true,
            runValidators: true
        });

        if (!postUpdated) {
            throw new Error(`Erreur lors de la mise ajour du post ${args.title}`)
        }

        return postUpdated;
    }
}

/**
 * @author Freddy Michel
 * @description Delete post by id using graphQl
 */

const deletePost = {
    type: GraphQLString,
    description: "Delete post",
    args: {
        postId: {type: GraphQLString}
    },
    async resolve(parent, args, { verifiedUser }) {
        console.log("UU", verifiedUser)
        if (!verifiedUser) {
            throw new Error(`Delete post ${args.postId} failed`)
        }

        const postDeleted = await Post.findOneAndDelete({
            _id: args.postId,
            authorId: verifiedUser._id
        });

        if (!postDeleted) {
            throw new Error(`Delete failed or post unintrouvable`)
        }

        return 'postDeleted';
    }
}

/**
 * @author Freddy Michel
 * @description add comment in post using graphQl
 */

const postComment =  {
    type: CommentType,
    description: "Create a comment for the post",
    args: {
        comment: {type: GraphQLString},
        postId: {type: GraphQLString}
    },
    resolve(parent, args, { verifiedUser }) {
        if(!verifiedUser) {
            throw new Error("Acces refusé");
        } 

        const comment = new Comment({
                authorId: verifiedUser._id,
                comment: args.comment,
                postId: args.postId
            });
        return comment.save();
        
    }
}

/**
 * @author Freddy Michel
 * @description Update comment using graphQl
 */

const updateComment = {
    type: CommentType,
    description: "Update comment",
    args: {
        id: {type: GraphQLString},
        comment: {type: GraphQLString},
    },
    async resolve(parent, args, { verifiedUser }) {
        if (!verifiedUser) {
            throw new Error("Access refusé")
        }

        const updateComment = await Comment.findByIdAndUpdate({
            _id: args.id,
            authorId: verifiedUser._id
        }, {
            comment: args.comment,
        }, {
            new: true,
            runValidators: true
        });

        if (!updateComment) {
            throw new Error(`Erreur lors de la modification du commentaire ${args.comment}`)
        }

        return updateComment;
    }
}

/**
 * @author Freddy Michel
 * @description delete comment by id using graphQl
 */

const deleteComment = {
    type: GraphQLString,
    description: "Delete comment",
    args: {
        commentId: {type: GraphQLString}
    },
    async resolve(parent, args, { verifiedUser }) {
        console.log("UU", verifiedUser._id)
        if (!verifiedUser) {
            throw new Error(`Delete comment ${args.commentId} failed`)
        }

        const commentDeleted = await Comment.findOneAndDelete({
            _id: args.commentId,
            authorId: verifiedUser._id
        });
        console.log("UUxxxx", args.commentId)

        if (!commentDeleted) {
            throw new Error(`Le commentaire ${args.commentId} n'existe plus`)
        }

        return "Success";
    }
}

module.exports = { registerUser, login, addPost, postComment, updatePost, updateComment, deletePost, deleteComment }