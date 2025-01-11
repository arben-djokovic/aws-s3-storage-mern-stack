import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Post from '../../components/Post/Post';
import './home.scss'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            try{
                const postsFetch = await axios.get('http://localhost:3000/api/posts')
                setPosts(postsFetch.data)
            }catch(err){
                console.log(err)
            }
        }
        getPosts()
        
    }, [])
  return (
    <div className='homePage'>
        <h2>Application created with MERN stack. <br /> Image uploaded to AWS S3</h2>
        <Link to="/add-post" className='add'>Add Post</Link>
        <div className="posts">
        {
            posts.map((post) => <Post key={post._id} post={post}/>)
        }
        </div>
    </div>
  )
}
