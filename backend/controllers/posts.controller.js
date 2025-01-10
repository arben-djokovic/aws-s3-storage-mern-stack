
import Post from '../models/post.model.js';
import { s3, getBucketName } from '../config/S3Client.js';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
        const imageName = `${Math.floor(Math.random() * 1000)}.jpg`;
        const command = new PutObjectCommand({
            Bucket: getBucketName() + "",
            Key: imageName,
            Body: req.file.buffer, 
            ContentType: req.file.mimetype
        })
        await s3.send(command)
        const post = await Post.create({
            caption: "test",
            imageUrl: imageName
        })
        res.send(post);
    }catch(err){
        console.log(err)
    }
}

export { getPosts, createPost }
