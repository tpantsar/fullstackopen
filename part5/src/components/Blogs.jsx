import Blog from './Blog'

const Blogs = ({ blogs }) => (
  <div>
    <h3>Blogs: {blogs.length}</h3>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

export default Blogs
