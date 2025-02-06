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

/* eslint-disable no-undef */
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

db.createCollection('blogs')
db.createCollection('users')

db.blogs.insert(initialBlogs)
db.users.insert(initialUsers)
