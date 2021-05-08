import React,{useState, useEffect,useLayoutEffect} from 'react'
import ShowBlock from '../components/ShowBlock.js'
import Loading from "../components/Loading.js" 

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';

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
    const [raw_data,set_data] = useState([]) // list of animes to be displayed
    const [season,set_season] = useState() // season of animes to be displayed 
    const [year, set_year] = useState() // year of animes tbd
    const [genre, set_genre] = useState() // genre [...]

    //code for fetch the trending anime for user to look at
    // using useeffect so the api doesnt called every few seconds 
    // because of using a state variable
    useEffect(() => {
        fetch('/api/browse').then(res => res.text()).then(res => JSON.parse(res)).then(res => {
            set_data(res.data)
        })
    }, [])

    return (
        <div>
            <Grid>
                <Grid container spacing={1} direction="row" alignItems="centrer" justify="left"> {/* container for search field and filter criterias */}
                    <Grid item>
                        <Typography>search</Typography>
                        <TextField id="outlined-basic"  variant="outlined" />
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
                <Grid container spacing={1} direction="row" alignItems="centrer" justify="center"> {/*grid container for show items */}
                    {raw_data.length > 0 ? 
                        raw_data.map((data) => (
                            <Grid item>
                                <ShowBlock data={data} />
                            </Grid>
                        )) :
                        <Loading />
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Browse