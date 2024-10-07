const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const initialUsers = [
  {
    username: 'pesusieni',
    name: 'Paavo Pesusieni',
    blogs: [],
    id: '66fd3dec1dd5a3ff7d17362b',
  },
  {
    username: 'ankka',
    name: 'Aku Ankka',
    blogs: [],
    id: 'f467jd83mnd983mf93j3hfkj',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const createUser = async (api, username, name, password) => {
  const userResponse = await api
    .post('/api/users')
    .send({
      username: username,
      name: name,
      password: password,
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  return userResponse.body
}

const createBlog = async (api, token, title, author, url, likes) => {
  const blogResponse = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: title,
      author: author,
      url: url,
      likes: likes,
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  return blogResponse.body
}

const getValidToken = async (api, username, password) => {
  const loginResponse = await api
    .post('/api/login')
    .send({
      username: username,
      password: password,
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return loginResponse.body.token
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  usersInDb,
  blogsInDb,
  createUser,
  createBlog,
  getValidToken,
}
