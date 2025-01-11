
import Post from '../models/post.model.js';
import { s3, getBucketName } from '../config/S3Client.js';
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { nanoid } from 'nanoid';

const getPosts = async (req, res) => {
    try{
        const posts = await Post.find()
       for(let post of posts){
            const command = new GetObjectCommand({
                Bucket: getBucketName() + "",
                Key: post.imageUrl
            })
            const url = await getSignedUrl(s3, command, {
                expiresIn: 3600
            })
            post.imageUrl = url
        }
        res.send(posts);
    }catch(err){
        console.log(err)
    }
}

const createPost = async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).send({
                success: false,
                message: "Image is required"
            });
        }
        if(!req.body.caption || req.body.caption.length < 1 || req.body.caption.length > 15){
            return res.status(400).send({
                success: false,
                message: "Caption must be between 1 and 15 characters"
            });
        }
        const imageName = nanoid();
        const command = new PutObjectCommand({
            Bucket: getBucketName() + "",
            Key: imageName,
            Body: req.file.buffer, 
            ContentType: req.file.mimetype
        })
        await s3.send(command)
        const post = await Post.create({
            caption: req.body.caption,
            imageUrl: imageName
        })
        res.send({post, success: true, message: "Post created successfully"});
    }catch(err){
        console.log(err)
    }
}

const deletePost = async (req, res) => {
    try{
        const post = await Post.findOne({ _id: req.params.id })
        if(!post){
            return res.status(404).send({
                success: false,
                message: "Post not found"
            });
        }
        const command = new DeleteObjectCommand({
            Bucket: getBucketName() + "",
            Key: post.imageUrl
        })
        await s3.send(command)
        await Post.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: "Post deleted successfully"
        });
    }catch(err){
        console.log(err)
    }
}

export { getPosts, createPost, deletePost }
