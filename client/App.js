import { useEffect } from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import theme from './theme'

const emotionCache = createCache({
  key: 'css',
  prepend: true
})

const App = () => {
  return (
    <CacheProvider value={emotionCache}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    </CacheProvider>
  )
}

export default App
