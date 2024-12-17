import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)

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
      <h3>Blogs: {sortedBlogs.length}</h3>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
