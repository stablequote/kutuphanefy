import React, { useState } from 'react';
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

function CreateBook() {
    const {id} = useParams();
    let history = useHistory();
    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        status: '',
        isRent: false,
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setBook({
          ...book,
          [e.target.name]: value
        })
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = {
            title: book.title,
            description: book.description,
            author: book.author,
            status: book.status,
        }
        axios.post(`http://localhost:8080/books/${id}/create'`, newBook)
        .then(() => {
            history.push('/books/')
        })
      };

  return (
    <>
    <Typography variant="h3" component="h3" color="primary" align="center">Add Book</Typography>
      <form action="http://localhost:8080/books/create" method="POST">
          <TextField 
          fullWidth
          label="Title"
          id="fullWidth" 
          sx={{ marginBottom: 1}} 
          name="title"
          onChange={handleChange}
          />
          <TextField 
          fullWidth 
          label="Description" 
          id="fullWidth" 
          sx={{marginBottom: 1}} 
          name="description"  
          onChange={handleChange} 
          />
          <TextField 
          fullWidth 
          label="author" 
          id="fullWidth" 
          sx={{marginBottom: 1}} 
          name="author"  
          onChange={handleChange} 
          />
          <TextField 
          fullWidth 
          label="status" 
          id="fullWidth" 
          sx={{marginBottom: 1}} 
          name="status"  
          onChange={handleChange} 
          />
          {/* <FormControl sx={{marginBottom: 1}}>
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
          </FormControl> */}

          {/* <FormControl fullWidth sx={{ minWidth: 80, marginBottom: 1 }}>
            <InputLabel id="demo-simple-select-label">Purpose</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="status"
              label="Status"
              name="status"
              onChange={handleChange}
            >
              <MenuItem value="buy">Buy</MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
            </Select>
          </FormControl> */}

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

export default CreateBook;
