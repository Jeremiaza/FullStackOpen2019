import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import { createNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
const App = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      props.createNotification("Wrong credentials ")
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm />
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

  const userData = () => {
      if (user) {  
       return <Togglable buttonLabel='user data'>
        <h3>{user.name}</h3>
        <div>Added blogs:</div>
        {props.blogs.map((blog) => {
          if (blog && blog.user && blog.user.username === user.username) {
            return <li>{blog.title}</li>
          }
        })}
      </Togglable>
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUsername('')
    setPassword('')
    setUser(null)
  }
  return (
    <div style={{marginLeft:20}}>
      <h1>Blogs</h1>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button type="submit" style={{
            margin: 10
          }}
          onClick={logOut}>log out</button>
          {blogForm()}
          {userData()}
        </div>
      }
      <Blogs />
    </div>
  )
}
const mapStateToProps = (state) => {
      return { blogs: state.blogs }
}

const mapDispatchToProps = {
  createNotification
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)