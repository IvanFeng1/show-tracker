import React from 'react';

// template stuff make sure to remove some stuff
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import image from '../components/hello.gif';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 90,
  },
}));

const Startpage = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <Grid container justify="center">
      <Grid item>
        <Box flexDirection="column" p={1} m={1}>
          <Box>
            <img src={image} />
          </Box>
          <Box>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Startpage;
