import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// axios for posting
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

// functino to handle passing data from showBlock to node, which then gets stored into the db
function handleSubmitAdd(e, userData, showData) {
  // authentication
  e.preventDefault();
  // dont think i need configs?
  // let axiosConfig = {
  //   headers: {
  //     'Content-Type': 'application/json;',
  //   },
  // };
  axios
    .post('http://localhost:5000/api', { user: userData, show: showData })
    .then((res) => console.log('success, dictionary sent,', res))
    .catch((err) => {
      console.log(err.response);
    });
}
const ShowBlock = ({ data }) => {
  const { user, isAuthenticated } = useAuth0();
  const [showAddButton, setShowAddButt] = useState(false);
  const useStyles = makeStyles({
    root: {
      width: 200,
      height: 380,
    },
    media: {
      width: 200,
      height: 315,
    },
    mediaWrapper: {
      position: 'relative',
    },
    addIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  });
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.mediaWrapper}>
          <CardMedia
            className={classes.media}
            component="img"
            image={data.coverImage.large}
            onMouseEnter={() => setShowAddButt(true)}
            onMouseLeave={() => setShowAddButt(false)}
          ></CardMedia>
          {showAddButton && (
            <IconButton
              className={classes.addIcon}
              onMouseEnter={() => setShowAddButt(true)}
              onMouseLeave={() => setShowAddButt(false)}
              onClick={
                isAuthenticated
                  ? (event) => handleSubmitAdd(event, user, data)
                  : () => console.log('did not submit')
              } // if user is logged in then add the show to db, if not dont add
            >
              <AddCircleIcon style={{ color: 'black' }} />
            </IconButton>
          )}
        </div>
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="h2">
            {data.title.english ? data.title.english : data.title.romaji}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ShowBlock;
