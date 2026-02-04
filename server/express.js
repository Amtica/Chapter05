import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import config from './../config/config'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import postRoutes from './routes/post.routes'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom/server'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'
import theme from './../client/theme'
//end

//comment out before building for production
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production
devBundle.compile(app)

// parse body params and attach them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
if (config.env === 'development') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "'unsafe-eval'"]
      }
    }
  }))
} else {
  app.use(helmet())
}
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)

app.use((req, res) => {
  const cache = createCache({ key: 'css', prepend: true })
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)
  
  const context = {}
  
  const AppComponent = (
    <CacheProvider value={cache}>
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    </CacheProvider>
  )

  // Render to string to extract critical CSS
  const html = ReactDOMServer.renderToString(AppComponent)
  
  if (context.url) {
    return res.redirect(303, context.url)
  }
  
  const chunks = extractCriticalToChunks(html)
  const css = constructStyleTagsFromChunks(chunks)

  // Send the complete HTML response
  res.status(200).send(Template({
    markup: html,
    css: css
  }))
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  } else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

export default app
