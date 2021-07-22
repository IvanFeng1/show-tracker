import React, { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useLazyQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';

import { parse } from 'graphql';
import { gql } from '@apollo/client';
import Loading from '../components/Loading';
import { Search_by_id } from './queries';
import ShowBlock from '../components/ShowBlock';

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
      console.log(error);
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
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const [shows, set_shows] = useLocalStorage('ids', [{}].splice(0, 1)); // might remove and only use localStorage
  const [show_data, set_show_data] = useLocalStorage('data', {});
  useEffect(() => {
    (async () => {
      let abortController = new AbortController();
      if (user) {
        let z = await axios.get('http://localhost:5000/api/get', {
          params: { user_email: user.email },
        });
        localStorage.setItem('ids', JSON.stringify(z.data)); // setting the list of ids in localStorage get, set the state variable show_ids as well
        // tried for loop to use the `uselazyquery` hook to fetch every media (objects turns null after coming bakc for some reason and there's no many requests for this method anyways)
        // tried declaring new query inside useeffect (here) but can't declare a new hook inside useeffect because useEffect is a hook i think
        // only method left is this one which is kinda scuffed
        let queryy = `
          query {
        `;
        if (shows.length > 0) {
          shows.map((showid) => {
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
        }
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

        axios(options).then((response) => {
          localStorage.setItem('data', JSON.stringify(response.data.data));
        });
      }
      return () => {
        abortController.abort();
      };
    })();
  }, []);

  useEffect(() => {});
  // localStorage is used to keep data after refreshing page, can't use localStorage in render function must use state variable
  if (!isAuthenticated) {
    return <div>please log in in homepage</div>;
  } else {
    return (
      <div>
        {show_data &&
          _.keys(show_data).length > 0 &&
          _.map(_.toArray(show_data), (anime) => (
            <div>
              <ShowBlock key={anime.id} data={anime} mode="remove" />
            </div>
          ))}
      </div>
    );
  }
};

export default Profile;
