const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')

const PORT = config.PORT

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
