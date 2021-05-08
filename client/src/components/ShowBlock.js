import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ShowBlock = ({data})=> {
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
      });
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={data.attributes.coverImage.small}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.attributes.canonicalTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
         </Card>
    )
}

export default ShowBlock