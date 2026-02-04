import { createTheme } from '@mui/styles'
import { teal, orange } from '@mui/material/colors'

const theme = createTheme({
    palette: {
      primary: {
      light: '#52c7b8',
      main: '#009688',
      dark: '#00675b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000',
    },
      openTitle: teal['700'],
      protectedTitle: orange['700'],
      mode: 'light'
    }
  })

  export default theme  