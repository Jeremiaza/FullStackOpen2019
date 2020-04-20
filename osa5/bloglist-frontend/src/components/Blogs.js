import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const Blog = ({ blog, props }) => {
  const [notify, setNotify] = useState(false);
  const [blogDetails, setBlogDetails] = useState(false)
  console.log(props)
  const showBlogs = () => {
    if (blogDetails) {
      return (
        <React.Fragment>
          {notify ? <Notification /> : null}
          <div style={{ width: 350, marginBottom: 25, paddingLeft:5, height: 'auto', border: '1px solid black' }} className="blog-container-extended">
            {'  '}{blog.title} by {blog.author}
            <div><b>url:</b><a href={blog.url}>{blog.url}</a> </div>
            <div>likes: {blog.likes}</div>
            <div>comments: {blog.comments || 'no comments'}</div>
            <button type="submit" id='hide-button' style={{
              marginLeft: 15,
              float: 'right',
            }} onClick={() => setBlogDetails(false)}>hide</button>
            <button type="submit" className='likebutton' style={{
              marginLeft: 15,
              backgroundColor: 'lightgreen',
              float: 'right',
            }} onClick={() => {
              setNotify(true)
              props.createNotification("Liked!")
              setInterval(() => {
                setNotify(false)
              }, 1500)
              props.likeBlog(blog.id)
            }}>like</button>
            <button type="submit" style={{
              height: 25,
            }} onClick={() => {
              setNotify(true)
              props.createNotification("Deleted!")
              setInterval(() => {
                setNotify(false)
              }, 1500)
              props.deleteBlog(blog.id)
            }}>delete blog</button>
          </div>
        </React.Fragment>
      )
    } else
      return (
        <React.Fragment>
          {notify ? <Notification /> : null}
          <div style={{ width: 350, marginBottom: 55, paddingLeft:5, height: 30, border: '1px solid black' }} className="blog-container">
            {blog.title} by {blog.author}
            <button type="submit" id='show-button' style={{
              marginLeft: 15,
              float: 'right',
            }} onClick={() => setBlogDetails(true)}>show</button>
            <button type="submit" className='likebutton' style={{
              marginLeft: 35,
              backgroundColor: 'lightgreen',
              float: 'right',
            }} onClick={() => {
              setNotify(true)
              props.createNotification("Liked!")
              setInterval(() => {
                setNotify(false)
              }, 1500)
              props.likeBlog(blog.id)
            }}>like</button>
            <button type="submit" style={{
              height: 25,
              marginTop: 12
            }} onClick={() => {
              setNotify(true)
              props.createNotification("deleted!")
              setInterval(() => {
                setNotify(false)
              }, 1500)
              props.deleteBlog(blog.id)
            }}>delete blog</button>
          </div>
        </React.Fragment>

      )
  }
  return (
    showBlogs()
  )
}

const Blogs = (props) => {
  return props.blogs.map((blog, index) =>
    blog ? <div style={{ display: 'flex' }} key={'blog-container' + index}>
      <Blog key={blog.id} blog={blog} props={props} />
    </div> : null
  )

}

/*Blog.displayName = 'Blog'
Blog.propTypes = {
  blog: {
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    id: PropTypes.string
  },
  updateBlog: PropTypes.func
};
*/
const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  createNotification
}
const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)
