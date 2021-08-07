import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: '#ffe0b2',
  },
  title: {
    flexGrow: 1,
    color: '#000000',
  },
  link: {
    color: '#000000',
    textDecoration: 'none',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            app
          </Typography>
          <Button>
            <Link className={classes.link} to="/">
              Home
            </Link>
          </Button>
          <Button>
            <Link className={classes.link} to="/browse">
              browse
            </Link>
          </Button>
          <Button>
            <Link className={classes.link} to="/profile">
              profile
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
