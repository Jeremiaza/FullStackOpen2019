import React, { useState } from 'react'


const Blog = ({ blog }) => {

  const [blogDetails, setBlogDetails] = useState(false)

  const showBlogs = () => {
    if (blogDetails) {
      return (
        <div style={{width:350, marginBottom:15,height:60, border:'1px solid black'}}>
          {blog.title} by {blog.author}
          <div>url: {blog.url}</div>
          <div>likes: {blog.likes}</div>
          <button type="submit" style={{
            marginLeft: 15,
            float: 'right',
            marginTop: -55
          }} onClick={() => setBlogDetails(false)}>hide</button>
        </div>
      )
    } else
    return (
      <div style={{width:350, marginBottom:10,height:30, border:'1px solid black'}}>
        {blog.title} by {blog.author}
        <button type="submit" style={{
          marginLeft: 15,
          float: 'right',
        }} onClick={() => setBlogDetails(true)}>show</button>
      </div>
    )
  }
  return (
    showBlogs()
  )
}

export default Blog
