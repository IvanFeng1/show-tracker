import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LogoutButton = () => {
    const classes = useStyles();
    const {logout} = useAuth0()
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {() => logout()}
        >
            Log out
        </Button>
    )
}

export default LogoutButton