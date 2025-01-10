import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    imageUrl: {
        type: String,
        required: true
    }
});

export default mongoose.model("Post", postSchema);