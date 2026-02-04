import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

const App = () => {
  return (
  <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter/>
      </ThemeProvider>
  </BrowserRouter>
)}

export default App
