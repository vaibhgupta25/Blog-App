const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    body: {
        type: Object,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tags: {
        type: [String],
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "PostCategories"
    }]
},
    { timestamps: true, toJSON: { virtuals: true } }
);


//creating a relation between post and comment model
//So, we use virtual property
PostSchema.virtual("comments", {
    ref: "Comment",          //referencing to comment model
    localField: "_id",       //local feild of post
    foreignField: "post"   //id of post will be used as postId in other schema
})
const Post = model("Post", PostSchema);
module.exports = Post;