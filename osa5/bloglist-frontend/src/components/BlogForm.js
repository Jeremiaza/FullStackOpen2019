
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const BlogForm = (props) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState()
  const [notify, setNotify] = useState(false);

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setNewBlogLikes(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes
    }
    setNotify(true)
        createNotification("Created " + newBlogTitle)
        setInterval(() => {
            setNotify(false)
        }, 1500)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes('')
    props.createBlog(newBlog)
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>
      {notify ? <Notification /> : null}
      <form onSubmit={addBlog}>
        <input
          id='title'
          placeholder='Title'
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
        <input
          id='author'
          placeholder='Author'
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        />
        <input
          id='url'
          placeholder='url'
          value={newBlogUrl}
          onChange={handleUrlChange}
        />
        <input
          id='likes'
          placeholder='Likes'
          value={newBlogLikes}
          onChange={handleLikesChange}
        />
        <button type="submit" id='save-blog' style={{ marginLeft: 10 }}>save</button>
      </form>
    </div>
  )
}

export default connect(
  null, 
  { createBlog,
  createNotification }
)(BlogForm)