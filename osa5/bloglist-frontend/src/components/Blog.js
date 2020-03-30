import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'


const Blog = ({ blog, action }) => {

  const [blogDetails, setBlogDetails] = useState(false)

  const likeBlog = (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes+1),
      id: blog.id
    }
    blogService.update(blog.id, updatedBlog).then(
      action
    )
  }

  const showBlogs = () => {
    if (blogDetails) {
      return (
        <div style={{ width:350, marginBottom:15,height:60, border:'1px solid black' }}>
          {blog.title} by {blog.author}
          <div>url: {blog.url}</div>
          <div>likes: {blog.likes}</div>
          <button type="submit" style={{
            marginLeft: 15,
            float: 'right',
            marginTop: -55
          }} onClick={() => setBlogDetails(false)}>hide</button>
          <button type="submit" style={{
            marginLeft: 15,
            marginTop: -20,
            backgroundColor: 'lightgreen',
            float: 'right',
          }} onClick={() => likeBlog(blog)}>like</button>
        </div>
      )
    } else
      return (
        <div style={{ width:350, marginBottom:10,height:30, border:'1px solid black' }}>
          {blog.title} by {blog.author}
          <button type="submit" style={{
            marginLeft: 15,
            float: 'right',
          }} onClick={() => setBlogDetails(true)}>show</button>
          <button type="submit" style={{
            marginLeft: 35,
            backgroundColor: 'lightgreen',
            float: 'right',
          }} onClick={() => likeBlog(blog)}>like</button>
        </div>
      )
  }
  return (
    showBlogs()
  )
}

Blog.displayName = 'Blog'
Blog.propTypes = {
  blog: {
    title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
      id: PropTypes.string
  },
  action: PropTypes.func
};
export default Blog
