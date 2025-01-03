import Blog from './Blog'

const Blogs = ({ blogs, user, likeBlog, deleteBlog }) => {
  // Sort blogs by likes in descending order (highest likes first)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  console.log('Sorted blogs:', sortedBlogs)
  if (sortedBlogs.length === 0) {
    return <div>No blogs available</div>
  }

  return (
    <div>
      <h3>Blogs: {blogs.length}</h3>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
