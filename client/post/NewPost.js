import React, {useState, useEffect} from 'react'
import auth from './../auth/auth-helper'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Icon from '@mui/material/Icon'
import PropTypes from 'prop-types'
import {create} from './api-post.js'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

export default function NewPost (props){
  const [values, setValues] = useState({
    text: '',
    photo: '',
    error: '',
    user: {}
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    setValues({...values, user: auth.isAuthenticated().user})
  }, [])
  const clickPost = () => {
    let postData = new FormData()
    postData.append('text', values.text)
    postData.append('photo', values.photo)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, postData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, text:'', photo: ''})
        props.addUpdate(data)
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }
  const photoURL = values.user._id ?'/api/users/photo/'+ values.user._id : '/api/users/defaultphoto'
    return (<div sx={{ backgroundColor: '#efefef', padding: '24px 0px 1px' }}>
      <Card sx={{ maxWidth: 600, margin: 'auto', marginBottom: 3, backgroundColor: 'rgba(65, 150, 136, 0.09)', boxShadow: 'none' }}>
      <CardHeader
            avatar={
              <Avatar src={photoURL}/>
            }
            title={values.user.name}
            sx={{ paddingTop: 1, paddingBottom: 1 }}
          />
      <CardContent sx={{ backgroundColor: 'white', paddingTop: 0, paddingBottom: 0 }}>
        <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows="3"
            value={values.text}
            onChange={handleChange('text')}
            sx={{ ml: 2, mr: 2, width: '90%' }}
            margin="normal"
        />
        <input accept="image/*" onChange={handleChange('photo')} id="icon-button-file" type="file" style={{ display: 'none' }} />
        <label htmlFor="icon-button-file">
          <IconButton color="secondary" sx={{ height: 30, marginBottom: 0.625 }} component="span">
            <PhotoCamera />
          </IconButton>
        </label> <span style={{ verticalAlign: 'super' }}>{values.photo ? values.photo.name : ''}</span>
        { values.error && (<Typography component="p" color="error">
            <Icon color="error">error</Icon>
              {values.error}
            </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickPost} sx={{ margin: 2 }}>POST</Button>
      </CardActions>
    </Card>
  </div>)

}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired
}

