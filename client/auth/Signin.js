import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import auth from './../auth/auth-helper'
import { Navigate, useLocation } from 'react-router-dom'
import {signin} from './api-auth.js'

export default function Signin() {
  const location = useLocation()
  const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
    if (redirectToReferrer) {
      return (<Navigate to={from} replace />)
  }

  return (
      <Card sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center', marginTop: 5, paddingBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginTop: 2, color: 'primary.main' }}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" sx={{ ml: 1, mr: 1, width: 300 }} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" sx={{ ml: 1, mr: 1, width: 300 }} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" sx={{ verticalAlign: 'middle' }}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} sx={{ margin: 'auto', marginBottom: 2 }}>Submit</Button>
        </CardActions>
      </Card>
    )
}
