import '../styles/Blog.css'
import BasicCard from './BasicCard'
import Comments from './Comments'

const BlogPage = ({ blog, user }) => {
  if (!blog || !user) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <BasicCard blog={blog} user={user} />
      <Comments blog={blog} />
    </>
  )
}

BlogPage.displayName = 'BlogPage'
export default BlogPage
