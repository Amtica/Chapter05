import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import Avatar from '@mui/material/Avatar'
import FileUpload from '@mui/icons-material/AddPhotoAlternate'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import { Navigate, useParams } from 'react-router-dom'

export default function EditProfile() {
  const { userId } = useParams()
  const [values, setValues] = useState({
    name: '',
    about: '',
    photo: '',
    email: '',
    password: '',
    redirectToProfile: false,
    error: '',
    id: ''
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data & data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, id: data._id, name: data.name, email: data.email, about: data.about})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [userId])
  
  const clickSubmit = () => {
    let userData = new FormData()
    values.name && userData.append('name', values.name)
    values.email && userData.append('email', values.email)
    values.password && userData.append('password', values.password)
    values.about && userData.append('about', values.about)
    values.photo && userData.append('photo', values.photo)
    update({
      userId: userId
    }, {
      t: jwt.token
    }, userData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirectToProfile': true})
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    //userData.set(name, value)
    setValues({...values, [name]: value })
  }
    const photoUrl = values.id
                 ? `/api/users/photo/${values.id}?${new Date().getTime()}`
                 : '/api/users/defaultphoto'
    if (values.redirectToProfile) {
      return (<Navigate to={'/user/' + values.id} replace />)
    }
    return (
      <Card sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center', marginTop: 5, paddingBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ margin: 2, color: 'primary.main' }}>
            Edit Profile
          </Typography>
          <Avatar src={photoUrl} sx={{ width: 60, height: 60, margin: 'auto' }}/><br/>
          <input accept="image/*" onChange={handleChange('photo')} sx={{ display: 'none' }} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
              <FileUpload/>
            </Button>
          </label> <span style={{marginLeft:'10px'}}>{values.photo ? values.photo.name : ''}</span><br/>
          <TextField id="name" label="Name" sx={{ ml: 1, mr: 1, width: 300 }} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            value={values.about}
            onChange={handleChange('about')}
            sx={{ ml: 1, mr: 1, width: 300 }}
            margin="normal"
          /><br/>
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
