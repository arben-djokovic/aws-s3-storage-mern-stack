import React, { useRef } from 'react'
import "./post.scss"
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';

export default function Post({ post }) {

  const postRef = useRef(null);

  const deletePost = async() => {

    confirmAlert({
      title: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {
            try{
              const response = await axios.delete(`http://localhost:3000/${post._id}`)
              if(response.data.success){
                postRef.current.remove()
              }
              console.log(response)
            }catch(err){
              console.log(err)
            }
          }
        },
        {
          label: 'No'
        }
      ]
    });
  }
  return (
    <div className='postComp' ref={postRef} id={post._id} key={post._id}>
      <img src={post.imageUrl} alt={post.caption} />
      <div className="caption">
        <p>{post.caption}</p>
        <i onClick={deletePost} className='fa fa-trash'></i>
      </div>
    </div>
  )
}
