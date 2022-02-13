import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import { TextField, InputLabel, MenuItem, Select, Button, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';

function EditBook() {
    const { id } = useParams();
    let history = useHistory();
    const [book, setBook] = useState([])

    const handleChange = (e) => {
        const value = e.target.value;
        setBook({
          ...book,
          [e.target.name]: value
        })
        console.log(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
      async function getData(){
        try{
          const book = await axios.get(`/book/${id}`).then((res) => setBook(res.data))
          console.log(book);
        }
        catch(err) {
          console.log(err)
        }
      }
      getData();
    }, [])

  return (
    <>
      <Typography variant="h3" component="h3" color="primary" align="center" >Edit Book Details</Typography>
      <form>
          <TextField 
          fullWidth
          label="Title"
          id="fullWidth" 
          sx={{ marginBottom: 1}} 
          name="title"
          defaultValue={book.title}
          onChange={handleChange}
          />
          <TextField 
          fullWidth 
          label="Description" 
          id="fullWidth" 
          sx={{marginBottom: 1}} 
          name="description" 
          value={book.value}
          defaultValue={book.value} 
          onChange={handleChange} 
          />
          <TextField 
          fullWidth 
          label="author" 
          id="fullWidth" 
          sx={{marginBottom: 1}} 
          name="author" 
          value={book.value} 
          defaultValue={book.value}
          onChange={handleChange} 
          />
          <FormControl sx={{marginBottom: 1}}>
            <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="priority"
              value={book.value}
              onChange={handleChange}
            >
              <FormControlLabel value="high" control={<Radio />} label="high" />
              <FormControlLabel value="medium" control={<Radio />} label="medium" />
              <FormControlLabel value="low" control={<Radio />} label="low" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth sx={{ minWidth: 80, marginBottom: 1 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="status"
              label="Status"
              value={book.value}
              name="status"
              onChange={handleChange}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit" 
            variant="contained" 
            color="success" 
            startIcon={<AddIcon />}
            onSubmit={handleSubmit}
          >
            create
          </Button>
          <Button 
          variant="outlined" 
          color="info" 
          to="/" 
          component={Link} 
          sx={{display:"inline-block", justifyContent: "right", Width: 8, marginLeft: 50.2}} 
          >
            Cancel
          </Button>
        </form>
    </>
)}

export default EditBook;
