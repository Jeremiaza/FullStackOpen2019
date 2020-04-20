import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data.sort((a, b) => (a.likes <= b.likes) ? 1 : -1)
    case 'DELETE':
      return action.data
    case 'LIKE':
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      console.log(blogToChange)
      const changedBlog = {
        ...blogToChange,
        likes: (blogToChange.likes + 1)
      }
      blogService.update(id, changedBlog)
      return (state.map(blog =>
        blog.id !== id ? blog : changedBlog)
        .sort((a, b) => (a.likes <= b.likes) ? 1 : -1)
      )
    default:
      return state
  }
}

export const createBlog = (blog) => {
  console.log('createblog reducer function')
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    const blogs = await blogService.deleteById(blogId)
    let tempBlogs = blogs
    let removeIndex = tempBlogs.map(function (item) { return item.id }).indexOf(blogId)
    tempBlogs.splice(removeIndex, 1)
    console.log(tempBlogs)
    dispatch({
      type: 'DELETE',
      data: tempBlogs
    })
  }
}

export const likeBlog = (id) => {
  console.log('hihi')
  return {
    type: 'LIKE',
    data: { id }
  }
}
export default blogReducer