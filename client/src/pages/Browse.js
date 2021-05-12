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

import { makeStyles } from "@material-ui/core/styles";

// queries styuff
import { useQuery, useLazyQuery } from "@apollo/client";
import { Movie_Popular } from "./queries.js";

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
  const [season, set_season] = useState(); // season of animes to be displayed
  const [year, set_year] = useState(); // year of animes tbd
  const [genre, set_genre] = useState(); // genre [...]

  // querying data and setting data state variable to be the state variable
  const [me, { data, error, loading }] = useLazyQuery(Movie_Popular);

  useEffect(() => {
    (async () => {
      await me();
    })();
  }, []);

  useEffect(() => {
    if (data) {
      set_data(data.Page.media);
    }
  }, [data]);

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
          {" "}
          {/* container for search field and filter criterias */}
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
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography>year</Typography>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography>season</Typography>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Winter</MenuItem>
                <MenuItem value={20}>Spring</MenuItem>
                <MenuItem value={30}>Summer</MenuItem>
                <MenuItem value={30}>Fall</MenuItem>
              </Select>
            </FormControl>
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
          {console.log(raw_data)}
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
