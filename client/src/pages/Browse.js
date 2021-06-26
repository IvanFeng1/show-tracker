import React, { useState, useEffect, useLayoutEffect } from 'react';

// components
import ShowBlock from '../components/ShowBlock.js';
import Loading from '../components/Loading.js';

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

import { makeStyles } from '@material-ui/core/styles';

// queries styuff
import { useQuery, useLazyQuery } from '@apollo/client';
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
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  gridContainer: {
    flexGrow: 0,
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
    <div>
      <Container>
        <Grid>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="centre"
            justify="left"
          >
            <Grid item>
              <Typography>Search</Typography>
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
              />
            </Grid>
            <Grid item>
              <Typography>genres</Typography>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={genre ? genre : ''}
                  onChange={(event) => {
                    set_genre(event.target.value);
                  }}
                >
                  <MenuItem value={'Action'}>Action</MenuItem>
                  <MenuItem value={'Adventure'}>Adventure</MenuItem>
                  <MenuItem value={'Comedy'}>Comedy</MenuItem>
                  <MenuItem value={'Drama'}>Drama </MenuItem>
                  <MenuItem value={'Fantasy'}>Fantasty</MenuItem>
                  <MenuItem value={'Horror'}>Horror</MenuItem>
                  <MenuItem value={'Mahou Shoujo'}>Mahou Shoujo</MenuItem>
                  <MenuItem value={'Mecha'}>Mecha</MenuItem>
                  <MenuItem value={'Music'}>Music</MenuItem>
                  <MenuItem value={'Mystery'}>Mystery</MenuItem>
                  <MenuItem value={'Psychological'}>Psychological</MenuItem>
                  <MenuItem value={'Romance'}>Romance</MenuItem>
                  <MenuItem value={'Supernatural'}>Supernatural</MenuItem>
                  <MenuItem value={'Thriller'}>Thriller</MenuItem>
                  <MenuItem value={'Mystery'}>Mystery</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography>year</Typography>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year ? year : ''}
                  onChange={(event) => {
                    set_year(event.target.value);
                  }}
                >
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2017}>2017</MenuItem>
                  <MenuItem value={2016}>2016</MenuItem>
                  <MenuItem value={2015}>2015</MenuItem>
                  <MenuItem value={2014}>2014</MenuItem>
                  <MenuItem value={2013}>2013</MenuItem>
                  <MenuItem value={2012}>2012</MenuItem>
                  <MenuItem value={2011}>2011</MenuItem>
                  <MenuItem value={2010}>2010</MenuItem>
                  <MenuItem value={2009}>2009</MenuItem>
                  <MenuItem value={2008}>2008</MenuItem>
                  <MenuItem value={2007}>2007</MenuItem>
                  <MenuItem value={2006}>2006</MenuItem>
                  <MenuItem value={2005}>2005</MenuItem>
                  <MenuItem value={2004}>2004</MenuItem>
                  <MenuItem value={2003}>2003</MenuItem>
                  <MenuItem value={2002}>2002</MenuItem>
                  <MenuItem value={2001}>2001</MenuItem>
                  <MenuItem value={2000}>2000</MenuItem>
                  <MenuItem value={1999}>1999</MenuItem>
                  <MenuItem value={1998}>1998</MenuItem>
                  <MenuItem value={1997}>1997</MenuItem>
                  <MenuItem value={1996}>1996</MenuItem>
                  <MenuItem value={1995}>1995</MenuItem>
                  <MenuItem value={1994}>1994</MenuItem>
                  <MenuItem value={1993}>1993</MenuItem>
                  <MenuItem value={1992}>1992</MenuItem>
                  <MenuItem value={1991}>1991</MenuItem>
                  <MenuItem value={1990}>1990</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography>season</Typography>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={season ? season : ''}
                  onChange={(event) => {
                    set_season(event.target.value);
                  }}
                >
                  <MenuItem value={'WINTER'}>Winter</MenuItem>
                  <MenuItem value={'SPRING'}>Spring</MenuItem>
                  <MenuItem value={'SUMMER'}>Summer</MenuItem>
                  <MenuItem value={'FALL'}>Fall</MenuItem>
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
            {/*grid container for show items */}
            {raw_data && raw_data.length > 0 ? (
              raw_data.map((dataa) => (
                <Grid item xs={3}>
                  <ShowBlock data={dataa} />
                </Grid>
              ))
            ) : (
              <Loading />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Browse;
