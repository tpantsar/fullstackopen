const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')

const PORT = config.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
