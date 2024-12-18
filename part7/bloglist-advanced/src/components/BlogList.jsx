import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogItem from './BlogItem'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)

  const blogFormRef = useRef()

  if (!blogs) {
    return <div>No blogs available</div>
  }

  // Sort blogs by likes in descending order (highest likes first)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (sortedBlogs.length === 0) {
    return <div>No blogs available</div>
  }

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
      <h3>Blogs: {sortedBlogs.length}</h3>
      {sortedBlogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
