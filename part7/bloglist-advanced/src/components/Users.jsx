const Users = ({ users }) => {
  return (
    <div>
      <h3>Users: {users.length}</h3>
      {users.map((user) => (
        <div key={user.id}>
          <h4>{user.name}</h4>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Users
