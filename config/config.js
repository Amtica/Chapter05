import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb+srv://Amtica:Amtica123@cluster0.afitate.mongodb.net/?appName=Cluster0'
}

export default config
