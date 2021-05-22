import React, { useState, useEffect, useLayoutEffect } from "react";

// components
import ShowBlock from "../components/ShowBlock.js";
import Loading from "../components/Loading.js";

// matieral ui stuff
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

// queries styuff
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  Movie_Popular,
  Anime_Trending,
  Media_Search,
  Genre_Search,
  Year_Search,
  Season_Search,
  Genre_Year_Season_Search,
  Genre_Year_Search,
  Genre_Season_Search,
  Year_Season_Search,
} from "./queries.js";

import { MediaSeason } from "../components/Enums.js";

// styling :3
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Browse = () => {
  // styling for components
  const classes = useStyles();
  // state variables:

  // state variable for array of shows to be displayed
  const [raw_data, set_data] = useState(); // list of animes to be displayed
  const [genre, set_genre] = useState(); // genre [...]
  const [year, set_year] = useState(); // year of animes tbd
  const [season, set_season] = useState(); // season of animes to be displayed

  // getting the data for when teh browse page mounts
  const [initial_fetch, { data: trending_data }] = useLazyQuery(Anime_Trending);

  const [genre_fetch, { data: genre_data }] = useLazyQuery(Genre_Search);
  const [year_fetch, { data: year_data }] = useLazyQuery(Year_Search);
  const [season_fetch, { data: season_data }] = useLazyQuery(Season_Search);
  // gys for genre year season
  const [gys_fetch, { data: gys_data }] = useLazyQuery(
    Genre_Year_Season_Search
  );
  const [gy_fetch, { data: gy_data }] = useLazyQuery(Genre_Year_Search);
  const [gs_fetch, { data: gs_data }] = useLazyQuery(Genre_Season_Search);
  const [ys_fetch, { data: ys_data }] = useLazyQuery(Year_Season_Search);
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
    if (genre) {
      if (year && season) {
        // all 3 filters
        if (gys_data) {
          // case that data was already fetched before no need to call anilist again
          set_data(gys_data.Page.media);
        } else {
          // data hasnt been fetched
          await gys_fetch({
            variables: {
              genre: genre,
              year: year,
              season: MediaSeason[season],
            },
          });
        }
      } else if (year && !season) {
        // genre and year filter only
        if (gy_data) {
          // case gy_data was already fetched
          set_data(gy_data.Page.media);
        } else {
          await gy_fetch({
            variables: {
              genre: genre,
              year: year,
            },
          });
        }
      } else if (!year && season) {
        // genre and season filter only
        if (gs_data) {
          // case gs_data was already fetched
          set_data(gs_data.Page.media);
        } else {
          await gs_fetch({
            variables: {
              genre: genre,
              season: MediaSeason[season],
            },
          });
        }
      } else {
        // only genre filter
        await genre_fetch({ variables: { genre: genre } });
      }
    }
  }, [genre]);

  useEffect(async () => {
    if (year) {
      if (genre && season) {
        if (gys_data) {
          // case that data was already fetched before no need to call anilist again
          set_data(gys_data.Page.media);
        } else {
          // data hasnt been fetched
          await gys_fetch({
            variables: {
              genre: genre,
              year: year,
              season: MediaSeason[season],
            },
          });
        }
      } else if (genre && !season) {
        // year and genre filter only
        if (gy_data) {
          // case data was already fetched
          set_data(gy_data.Page.media);
        } else {
          await gy_fetch({
            variables: {
              genre: genre,
              year: year,
            },
          });
        }
      } else if (!genre && season) {
        // year and season only
        if (ys_data) {
          // case data was already fetched
          set_data(ys_data.Page.media);
        } else {
          await ys_fetch({
            variables: {
              year: year,
              season: MediaSeason[season],
            },
          });
        }
      } else {
        // case that only year filter was applied
        await year_fetch({ variables: { year: year } });
      }
    }
  }, [year]);

  useEffect(async () => {
    if (season) {
      if (genre && year) {
        if (gys_data) {
          // case that data was already fetched before no need to call anilist again
          set_data(gys_data.Page.media);
        } else {
          // data hasnt been fetched
          await gys_fetch({
            variables: {
              genre: genre,
              year: year,
              season: MediaSeason[season],
            },
          });
        }
      } else if (genre && !year) {
        // season and genre only
        if (gs_data) {
          // case data was already fetched
          set_data(gs_data.Page.media);
        } else {
          await gs_fetch({
            variables: {
              genre: genre,
              season: MediaSeason[season],
            },
          });
        }
      } else if (!genre && year) {
        // seaosn and yearj
        if (ys_data) {
          // data was already fetched
          set_data(ys_data.Page.media);
        } else {
          await ys_fetch({
            variables: {
              year: year,
              season: MediaSeason[season],
            },
          });
        }
      } else {
        // only season filter
        await season_fetch({ variables: { season: MediaSeason[season] } });
      }
    }
  }, [season]);

  // checking when the filter data is fetched and then set the state variable raw_data so that the page outputs the updated data
  useEffect(() => {
    if (genre_data) {
      set_data(genre_data.Page.media);
    }
  }, [genre_data]);

  useEffect(() => {
    if (year_data) {
      set_data(year_data.Page.media);
    }
  }, [year_data]);

  useEffect(() => {
    if (season_data) {
      set_data(season_data.Page.media);
    }
  }, [season_data]);

  useEffect(() => {
    if (gys_data) {
      set_data(gys_data.Page.media);
    }
  }, [gys_data]);

  useEffect(() => {
    if (gy_data) {
      set_data(gy_data.Page.media);
    }
  }, [gy_data]);

  useEffect(() => {
    if (gs_data) {
      set_data(gs_data.Page.media);
    }
  }, [gs_data]);

  useEffect(() => {
    if (ys_data) {
      set_data(ys_data.Page.media);
    }
  }, [ys_data]);
  return (
    <div>
      <Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="centrer"
          justify="left"
        >
          <Grid item>
            <Typography>search</Typography>
            <TextField id="outlined-basic" variant="outlined" />
          </Grid>
          <Grid item>
            <Typography>genres</Typography>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                onChange={(event) => {
                  set_genre(event.target.value);
                }}
              >
                <MenuItem value={"Action"}>Action</MenuItem>
                <MenuItem value={"Adventure"}>Adventure</MenuItem>
                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                <MenuItem value={"Drama"}>Drama </MenuItem>
                <MenuItem value={"Fantasty"}>Fantasty</MenuItem>
                <MenuItem value={"Horror"}>Horror</MenuItem>
                <MenuItem value={"Mahou Shoujo"}>Mahou Shoujo</MenuItem>
                <MenuItem value={"Mecha"}>Mecha</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
                <MenuItem value={"Mystery"}>Mystery</MenuItem>
                <MenuItem value={"Psychological"}>Psychological</MenuItem>
                <MenuItem value={"Romance"}>Romance</MenuItem>
                <MenuItem value={"Supernatural"}>Supernatural</MenuItem>
                <MenuItem value={"Thriller"}>Thriller</MenuItem>
                <MenuItem value={"Mystery"}>Mystery</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography>year</Typography>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
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
                value=""
                onChange={(event) => {
                  set_season(event.target.value);
                }}
              >
                <MenuItem value={"WINTER"}>Winter</MenuItem>
                <MenuItem value={"SPRING"}>Spring</MenuItem>
                <MenuItem value={"SUMMER"}>Summer</MenuItem>
                <MenuItem value={"FALL"}>Fall</MenuItem>
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
          alignItems="center"
          justify="center"
        >
          {/*grid container for show items */}
          {raw_data && raw_data.length > 0 ? (
            raw_data.map((dataa) => (
              <Grid item>
                <ShowBlock data={dataa} />
              </Grid>
            ))
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Browse;
