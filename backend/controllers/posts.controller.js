
import Post from '../models/post.model.js';

const getPosts = async (req, res) => {
    try{
        const posts = await Post.find()
        res.send(posts);
    }catch(err){
        console.log(err)
    }
}

const createPost = async (req, res) => {
    try{
        const post = await Post.create({
            caption: "test",
            imageUrl: "test"})
        res.send(post);
    }catch(err){
        console.log(err)
    }
}

export { getPosts, createPost }
