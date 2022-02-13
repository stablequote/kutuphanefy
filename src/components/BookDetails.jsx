import React, { useEffect, useState }from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {Grid, Box , Radio, Paper, Card, Typography, Button, Checkbox} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  author: {
    fontSize: "1rem",
    lineHeight: "1.375rem",
    fontWeight: "Medium",
    color: 'rgb(11, 88, 185)',
    textTransform: "capitalize",
  },
  title: {
    fontSize: "2rem",
    lineHeight: "2.8125rem",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  detail: {
    fontSize: "13px",
    textTransform: "capitalize",
    lineHeight: "1",
  },

})

function BookDetails() {

  const classes = useStyles();
  const { id } = useParams();
  const [book, setBook] = useState([]);

  const rentBook = () => {

  }

  useEffect(() => {
    axios.get(`http://localhost:8080/books/${id}`).then((res) => setBook(res.data))
    console.log(book);
  }, [])

  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={5} >
          <Grid component={Paper} elevation={3}>
            <img 
            src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2576&q=80" 
            // src="https://source.unsplash.com/random/?book"
            alt="kitap-gorseli" 
            width="100%" 
            height="400"
            />
          </Grid>
        </Grid>
        <Grid item xs={7} >
          <Typography className={classes.author} variant="h5" component="h5">{book.author}</Typography>
          <Typography className={classes.title} variant="h4" component="h4">{book.title}</Typography>
          <Grid component={Grid} container spacing={4} sx={{display: 'flex', flexDirection: 'row', marginBottom: 3}}>
            <Grid component={Grid} item>
              <span>id</span>
              <Typography variant="body2" component="h4" color="secondary">{book._id}</Typography>
            </Grid>
            <Grid component={Grid} item>
            <span>created</span>
              <Typography variant="body2" component="h4" color="secondary">{moment(book.date).calendar()}</Typography>
            </Grid>
          </Grid>
          <Box sx={{marginTop: "70px"}}>
            <Typography className={classes.detail} variant="body1" component="h4" >Choose rent period:</Typography>
            <Grid component={Grid} container spacing={1} sx={{marginTop: "40px", marginBottom: "20px"}}>
              <FormControl>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <Grid container spacing={2}>
                    <Grid item sx={4} component={Card}>
                      <FormControlLabel row value="7days" control={<Radio />} label="7days" />
                      
                    </Grid>
                    <Grid item sx={4} component={Card}>
                      <FormControlLabel row value="30days" control={<Radio />} label="30days" />
                      
                    </Grid>
                    <Grid item sx={4} component={Card}>
                      <FormControlLabel row value="6months" control={<Radio />} label="6months" />
                      
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>

              {/* custom end */}
            </Grid>
            <Button variant="contained" color="primary">Kirala</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default BookDetails;
