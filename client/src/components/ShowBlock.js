import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

// functino to handle passing data from showBlock to node, which then gets stored into the db
function handleSubmitAdd(e, userData, showID) {
  e.preventDefault();
  axios
    .post('/api/post/add', {
      user: userData,
      showID: showID,
    })
    .catch((err) => {
      throw err;
    });
}

// function to handle removingg selected show (show for current showblock) from this user in the db
function handleSubmitRemove(e, userData, showID, hasRemoved, setHasRemoved) {
  e.preventDefault();
  axios
    .post('/api/post/remove', {
      user: userData,
      showID: showID,
    })
    .catch((err) => {
      throw err;
    });
  setHasRemoved(!hasRemoved);
}

const ShowBlock = ({ data, mode, hasRemoved, setHasRemoved }) => {
  const { user, isAuthenticated } = useAuth0();
  const [showButton, setShowButt] = useState(false);
  const useStyles = makeStyles({
    root: {
      width: 200,
      height: 380,
      backgroundColor: '#fafafa',
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
      <div className={classes.mediaWrapper}>
        <CardMedia
          className={classes.media}
          component="img"
          image={data.coverImage.large}
          onMouseEnter={() => setShowButt(true)}
          onMouseLeave={() => setShowButt(false)}
        ></CardMedia>
        {showButton && mode === 'add' && (
          <IconButton
            className={classes.addIcon}
            onMouseEnter={() => setShowButt(true)}
            onMouseLeave={() => setShowButt(false)}
            onClick={
              isAuthenticated
                ? (event) => handleSubmitAdd(event, user, data.id)
                : null
            }
          >
            <AddCircleIcon style={{ color: 'black' }} />
          </IconButton>
        )}

        {showButton && mode === 'remove' && (
          <IconButton
            className={classes.addIcon}
            onMouseEnter={() => setShowButt(true)}
            onMouseLeave={() => setShowButt(false)}
            onClick={
              isAuthenticated
                ? (event) =>
                    handleSubmitRemove(
                      event,
                      user,
                      data.id,
                      hasRemoved,
                      setHasRemoved
                    )
                : null
            }
          >
            <CancelIcon style={{ color: 'black' }} />
          </IconButton>
        )}
      </div>
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="h2">
          {data.title.english ? data.title.english : data.title.romaji}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShowBlock;
