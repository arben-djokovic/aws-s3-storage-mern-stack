import React, { useRef } from 'react'
import './createPost.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreatePost() {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const createPost = async () => {
        const formData = new FormData(formRef.current);
        try{
            const response = await axios.post('http://localhost:3000/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
            if(response.data.success){
                navigate("/")
            }
        }catch(err){
            console.log(err)
            if(!err.response.data.success && err.response.data.message){ 
                toast.error(err.response.data.message)
            } 
        }
    }


  return (
    <div className='createPostPage'>
        <Link to={"/"} className='home'>Home</Link>
        <form ref={formRef} onSubmit={(e) => e.preventDefault()} className='createPostForm'>
            <h2>Create Post</h2>
            <input className='file' type="file" name="image" id="image" />
            <input className='caption' type="text" name="caption" id="caption" placeholder='Caption' />
            <button onClick={createPost} className='submit' type="submit">Create Post</button>
        </form>
    </div>
  )
}
