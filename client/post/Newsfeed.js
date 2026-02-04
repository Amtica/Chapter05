import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import auth from './../auth/auth-helper'
import PostList from './PostList'
import {listNewsFeed} from './api-post.js'
import NewPost from './NewPost'

export default function Newsfeed () {
  const [posts, setPosts] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listNewsFeed({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPosts(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

  const addPost = (post) => {
    const updatedPosts = [...posts]
    updatedPosts.unshift(post)
    setPosts(updatedPosts)
  }
  const removePost = (post) => {
    const updatedPosts = [...posts]
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    setPosts(updatedPosts)
  }

    return (
      <Card sx={{ margin: 'auto', paddingTop: 0, paddingBottom: 3 }}>
        <Typography type="title" sx={{ padding: '24px 20px 16px', color: 'primary.main', fontSize: '1em' }}>
          Newsfeed
        </Typography>
        <Divider/>
        <NewPost addUpdate={addPost}/>
        <Divider/>
        <PostList removeUpdate={removePost} posts={posts}/>
      </Card>
    )
}

