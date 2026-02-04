import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import unicornbike from './../assets/images/unicornbike.jpg'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'

export default function Home(){
  const location = useLocation()
  const [defaultPage, setDefaultPage] = useState(false)

  useEffect(()=> {
    setDefaultPage(auth.isAuthenticated())
  }, [location])

    return (
      <Box sx={{ flexGrow: 1, margin: 3 }}>
        { !defaultPage &&
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 5, marginBottom: 5 }}>
                <Typography variant="h6" sx={{ padding: '24px 20px 16px', color: 'text.secondary' }}>
                  Home Page
                </Typography>
                <CardMedia sx={{ minHeight: 400 }} image={unicornbike} title="Unicorn Bicycle"/>
                <Typography variant="body2" component="p" sx={{ padding: 1, textAlign: 'right', backgroundColor: '#ededed', borderBottom: '1px solid #d0d0d0', '& a': { color: '#3f4771' } }} color="textSecondary">Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Boudewijn Huysmans</a> on Unsplash</Typography>
                <CardContent>
                  <Typography type="body1" component="p">
                    Welcome to the MERN Social home page. 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
        {defaultPage &&
          <Grid container spacing={8}>
            <Grid item xs={8} sm={7}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople/>
            </Grid>
          </Grid>
        }
      </Box>
    )
}
