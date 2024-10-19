import '../styles/Blogs.css'

const Blogs = ({ blogs }) => (
  <>
    <h3>Blogs</h3>
    <table className="table">
      <thead>
        <tr>
          <th className="th">Title</th>
          <th className="th">Author</th>
          <th className="th">URL</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td className="td">{blog.title}</td>
            <td className="td">{blog.author}</td>
            <td className="td">{blog.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

export default Blogs
