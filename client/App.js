import { useEffect } from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

const App = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
