import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error(`Unable to connect to database: ${config.mongoUri}`)
    console.error(err)
    process.exit(1)
  }
}

connectDB()

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})
