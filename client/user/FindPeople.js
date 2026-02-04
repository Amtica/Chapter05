import React, {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction' 
import ListItemText from '@mui/material/ListItemText' 
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {Link} from 'react-router-dom'
import {findPeople, follow} from './api-user.js'
import auth from './../auth/auth-helper'
import Snackbar from '@mui/material/Snackbar'
import ViewIcon from '@mui/icons-material/Visibility'

export default function FindPeople() {
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: ''
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    findPeople({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setValues({...values, users:data})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])
  const clickFollow = (user, index) => {
    follow({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        let toFollow = values.users
        toFollow.splice(index, 1)
        setValues({...values, users: toFollow, open: true, followMessage: `Following ${user.name}!`})
      }
    })
  }
  const handleRequestClose = (event, reason) => {
    setValues({...values, open: false })
  }
    return (<div>
      <Paper sx={{ padding: 1, margin: 0, paddingLeft: 2, paddingRight: 2 }} elevation={4}>
        <Typography type="title" sx={{ margin: '24px 8px 16px', color: 'primary.main', fontSize: '1em' }}>
          Who to follow
        </Typography>
        <List>
          {values.users.map((item, i) => {
              return <span key={i}>
                <ListItem>
                  <ListItemAvatar sx={{ marginRight: 1 }}>
                      <Avatar src={'/api/users/photo/'+item._id}/>
                  </ListItemAvatar>
                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction sx={{ right: 2 }}>
                    <Link to={"/user/" + item._id}>
                      <IconButton variant="contained" color="secondary" sx={{ verticalAlign: 'middle' }}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                    <Button aria-label="Follow" variant="contained" color="primary" onClick={()=> {clickFollow(item, i)}}>
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            })
          }
        </List>
      </Paper>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={values.open}
          onClose={handleRequestClose}
          autoHideDuration={6000}
          message={<span style={{color: 'primary.main'}}>{values.followMessage}</span>}
      />
    </div>)
}
