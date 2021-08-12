import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import CircularProgress from '@material-ui/core/CircularProgress';
import ShowBlock from '../components/ShowBlock';

import { makeStyles } from '@material-ui/styles';

import _ from 'lodash';

function useLocalStorage(key, initialValue) {
  // sub for useState so the state variable always get value from storage
  // so its value doesn't get lost after each refresh

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue

      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  };
  return [storedValue, setValue];
}

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: 40,
    flexGrow: 0,
    marginLeft: 50,
  },
  block: {
    marginTop: 20,
  },

  bgcolor: {
    backgroundColor: 'blue',
  },
}));
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const [showData, setShowData] = useLocalStorage('data', JSON.stringify({}));

  const [hasRemoved, setHasRemoved] = useState(false); // alright I plan on using this as a flag
  // for whenever there is a anime removed from current user's list
  // whenver remove butto nis clicked in showblock, the flag changes value and the useEffect
  // will do a get request from the user-showid db or local db

  const { promiseInProgress } = usePromiseTracker();

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      let abortController = new AbortController(); // need the aborcontrollers b/c i have two api requests in the useeffect
      if (user) {
        let z = await axios.get('/api/get', {
          params: { user_email: user.email },
        });
        let current_user_shows = z.data;
        localStorage.setItem('data', JSON.stringify({}));
        // tried for loop to use the `uselazyquery` hook to fetch every media (objects turns null after coming bakc for some reason and there's no many requests for this method anyways)
        // tried declaring new query inside useeffect (here) but can't declare a new hook inside useeffect because useEffect is a hook i think
        // only method left is this one which is kinda scuffed
        if (current_user_shows.length > 0) {
          let queryy = `
          query {
          `;
          z.data.map((showid) => {
            queryy += `
            query${showid}: Media(id: ${showid}){
              id
              title {
                english(stylised: true)
                romaji(stylised: true)
              }
              description(asHtml: false)
              coverImage {
                large
                medium
              }
            }
            `;
          });
          queryy += '}';
          const options = {
            url: 'https://graphql.anilist.co',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
            data: {
              query: queryy,
            },
          };
          trackPromise(
            axios(options).then((response) => {
              setShowData(response.data.data);
            })
          );
        }
      }
      return () => {
        abortController.abort();
      };
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        let z = await axios.get('/api/get', {
          params: { user_email: user.email },
        });
        let current_user_shows = z.data;
        localStorage.setItem('data', JSON.stringify({}));
        // tried for loop to use the `uselazyquery` hook to fetch every media (objects turns null after coming bakc for some reason and there's no many requests for this method anyways)
        // tried declaring new query inside useeffect (here) but can't declare a new hook inside useeffect because useEffect is a hook i think
        // only method left is this one which is kinda scuffed
        if (current_user_shows.length > 0) {
          let queryy = `
          query {
          `;
          z.data.map((showid) => {
            queryy += `
            query${showid}: Media(id: ${showid}){
              id
              title {
                english(stylised: true)
                romaji(stylised: true)
              }
              description(asHtml: false)
              coverImage {
                large
                medium
              }
            }
            `;
          });
          queryy += '}';
          const options = {
            url: 'https://graphql.anilist.co',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
            data: {
              query: queryy,
            },
          };
          trackPromise(
            axios(options).then((response) => {
              setShowData(response.data.data);
            })
          );
        } else {
          // the show_ids is length zero
          setShowData({});
        }
      }
    })();
  }, [hasRemoved]);
  // localStorage is used to keep data after refreshing page, can't use localStorage in render function must use state variable
  if (!isAuthenticated) {
    return (
      <Container component="main" maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Please log in in the homepage
        </Typography>
      </Container>
    );
  } else if (promiseInProgress) {
    return (
      <Grid>
        <CircularProgress />
      </Grid>
    );
  } else {
    return (
      <div style={{ backgroundColor: '#ffffe4' }}>
        <Container>
          <Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              className={classes.gridContainer}
            >
              {showData &&
              !_.isEmpty(showData) &&
              _.keys(showData).length > 0 ? (
                _.map(_.toArray(showData), (anime) => (
                  <Grid key={anime.id} item xs={3}>
                    <ShowBlock
                      data={anime}
                      mode="remove"
                      hasRemoved={hasRemoved}
                      setHasRemoved={setHasRemoved}
                    />
                  </Grid>
                ))
              ) : (
                <Container component="main" maxWidth="sm">
                  <Typography variant="h2" component="h1">
                    Nothing in library. Go to Browse page to add.
                  </Typography>
                </Container>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
};

export default Profile;
