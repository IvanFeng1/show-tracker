import React, { useState, useEffect } from 'react';

import _ from 'lodash';

// components
import ShowBlock from '../components/ShowBlock.js';

// matieral ui stuff
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

// queries styuff
import { useLazyQuery } from '@apollo/client';
import {
  Anime_Trending,
  Media_Search,
  Genre_Year_Season_Search,
} from './queries.js';

// need to use enums for media season
import { MediaSeason } from '../components/Enums.js';

// styling
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  filters: {
    marginTop: 20,
  },
  gridContainer: {
    marginTop: 20,
    flexGrow: 0,
    marginLeft: 50,
  },
  progress: {
    marginTop: 30,
    marginLeft: 50,
  },
}));

const Browse = () => {
  // styling for components
  const classes = useStyles();
  // state variables:

  // state variable for array of shows to be displayed
  const [raw_data, set_data] = useState(); // list of animes to be displayed
  const [genre, set_genre] = useState(null); // genre [...]
  const [year, set_year] = useState(null); // year of animes tbd
  const [season, set_season] = useState(null); // season of animes to be displayed
  const [title, set_title] = useState(null);
  // getting the data for when teh browse page mounts
  const [initial_fetch, { data: trending_data }] = useLazyQuery(Anime_Trending);

  // gys for genre year season
  const [gys_fetch, { data: gys_data }] = useLazyQuery(
    Genre_Year_Season_Search
  );
  const [title_fetch, { data: t_data }] = useLazyQuery(Media_Search);
  // i need to use two useeffects specifically with an await in the first useEffect
  // because using state variables inside useEffect doesnt update the
  // state variable after the fetch and using setState right after the await doesnt work
  useEffect(() => {
    (async () => {
      await initial_fetch();
    })();
  }, []);

  useEffect(() => {
    if (trending_data) {
      set_data(trending_data.Page.media);
    }
  }, [trending_data]);

  // se4ction for applying user's filters onto the browse page

  useEffect(() => {}, [raw_data]);

  // checking when the filter (genre, year, season are updated)

  useEffect(async () => {
    if (genre || year || season) {
      if (season) {
        await gys_fetch({
          variables: {
            genre: genre,
            year: year,
            season: MediaSeason[season],
          },
        });
      } else {
        await gys_fetch({
          variables: {
            genre: genre,
            year: year,
          },
        });
      }
    }
  }, [genre, year, season]);

  useEffect(async () => {
    if (title) {
      title_fetch({
        variables: {
          title: title,
        },
      });
    }
  }, [title]);
  // checking when the filter data is fetched and then set the state variable raw_data so that the page outputs the updated data

  useEffect(() => {
    if (gys_data) {
      set_data(gys_data.Page.media);
    }
  }, [gys_data]);

  useEffect(() => {
    if (t_data) {
      set_data(t_data.Page.media);
    }
  }, [t_data]);
  return (
    <div style={{ backgroundColor: '#ffffe4' }}>
      <Container>
        <Grid>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            className={classes.filters}
          >
            <Grid item>
              <TextField
                id="standard-search"
                label="Search field"
                type="search"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    set_title(e.target.value);
                  }
                }}
                className={classes.formControl}
              />
            </Grid>
            <Grid item>
              <Typography>Genres</Typography>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={genre ? genre : ''}
                  onChange={(event) => {
                    set_genre(event.target.value);
                  }}
                >
                  {_.map(
                    [
                      'Action',
                      'Adventure',
                      'Comedy',
                      'Drama',
                      'Fantasy',
                      'Horror',
                      'Mahou Shoujo',
                      'Mecha',
                      'Music',
                      'Mystery',
                      'Psychological',
                      'Romance',
                      'Supernatural',
                      'Thriller',
                    ],
                    (category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography>Year</Typography>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year ? year : ''}
                  onChange={(event) => {
                    set_year(event.target.value);
                  }}
                >
                  {_.map(_.range(2022, 1989, -1), (n) => (
                    <MenuItem key={n * 3} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography>Season</Typography>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={season ? season : ''}
                  onChange={(event) => {
                    set_season(event.target.value);
                  }}
                >
                  <MenuItem key={'WINTER'} value={'WINTER'}>
                    Winter
                  </MenuItem>
                  <MenuItem key={'SPRING'} value={'SPRING'}>
                    Spring
                  </MenuItem>
                  <MenuItem key={'SUMMER'} value={'SUMMER'}>
                    Summer
                  </MenuItem>
                  <MenuItem key={'FALL'} value={'FALL'}>
                    Fall
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  set_genre(null);
                  set_year(null);
                  set_season(null);
                  set_data(trending_data.Page.media);
                }}
              >
                Clear filters
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            direction="row"
            className={classes.gridContainer}
          >
            {raw_data && raw_data.length > 0 ? (
              raw_data.map((dataa) => (
                <Grid key={dataa.id} item xs={3}>
                  <ShowBlock data={dataa} mode="add" />
                </Grid>
              ))
            ) : (
              <Grid>
                <CircularProgress className={classes.progress} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Browse;
