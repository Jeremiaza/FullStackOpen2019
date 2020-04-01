
import React,{ useState } from 'react'
import Notification from '../components/Notification'
import ReactNotification from 'react-notifications-component'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState()

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

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes
    })
    Notification('blogcreatesuccess')
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>
      <ReactNotification />
      <form onSubmit={addBlog}>
        <input
          placeholder='Title'
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
        <input
          placeholder='Author'
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        />
        <input
          placeholder='url'
          value={newBlogUrl}
          onChange={handleUrlChange}
        />
        <input
          placeholder='Likes'
          value={newBlogLikes}
          onChange={handleLikesChange}
        />
        <button type="submit" style={{ marginLeft:10 }}>save</button>
      </form>
    </div>
  )
}

export default BlogForm