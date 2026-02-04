import React, {useState} from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {create} from './api-user.js'
import {Link} from 'react-router-dom'

export default function Signup (){
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
  }

    return (<div>
      <Card sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center', marginTop: 5, paddingBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginTop: 2, color: 'primary.main' }}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" sx={{ ml: 1, mr: 1, width: 300 }} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" sx={{ ml: 1, mr: 1, width: 300 }} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" sx={{ ml: 1, mr: 1, width: 300 }} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" sx={{ verticalAlign: 'middle' }}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} sx={{ margin: 'auto', marginBottom: 2 }}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog 
        open={values.open} 
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            setValues({...values, open: false})
          }
        }}
      >
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>)
}