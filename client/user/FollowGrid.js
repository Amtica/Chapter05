import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import {Link} from 'react-router-dom'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Box from '@mui/material/Box'

export default function FollowGrid (props) {
    return (<Box sx={{
      paddingTop: 2,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      background: 'background.paper',
    }}>
      <ImageList rowHeight={160} sx={{ width: 500, height: 220 }} cols={4}>
        {props.people.map((person, i) => {
           return  <ImageListItem style={{'height':120}} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar src={'/api/users/photo/'+person._id} sx={{ width: 60, height: 60, margin: 'auto' }}/>
                <Typography sx={{ textAlign: 'center', marginTop: 1 }}>{person.name}</Typography>
              </Link>
            </ImageListItem>
        })}
      </ImageList>
    </Box>)
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired
}

