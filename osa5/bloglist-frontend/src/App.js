import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogUpdater = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      Notification('loginerror')
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const deleteBlog = (blogId) => {
    blogService
      .deleteById(blogId)
      .then(() => {
        let tempBlogs = blogs
        let removeIndex = tempBlogs.map(function (item) { return item.id }).indexOf(blogId)
        Notification('deletesuccess', tempBlogs[removeIndex].title, tempBlogs[removeIndex].author)
        tempBlogs.splice(removeIndex, 1)
        setBlogs(tempBlogs)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUsername('')
    setPassword('')
    setUser(null)
  }
  return (
    <div>
      <h1>Blogs</h1>
      <ReactNotification />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button type="submit" style={{
            margin: 10
          }}
          onClick={logOut}>log out</button>
          {blogForm()}
        </div>
      }
      <div>
        {blogs.map((blog, index) =>
          <div style={{ display: 'flex' }} key={'blog-container'+index}>
            <Blog key={blog.id} blog={blog} updateBlog={blogUpdater}/>
            <button type="submit" style={{
              height: 30,
              marginLeft: 10
            }} onClick={() => deleteBlog(blog.id)}>delete blog</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App