import '../styles/Blog.css'
import BlogCard from './BlogCard'
import BlogComments from './BlogComments'

const BlogPage = ({ blog, user }) => {
  if (!blog || !user) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <BlogCard blog={blog} user={user} />
      <BlogComments blog={blog} />
    </>
  )
}

BlogPage.displayName = 'BlogPage'
export default BlogPage
