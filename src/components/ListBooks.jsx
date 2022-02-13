import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import { 
  Table,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TableFooter,
  TablePagination, 
  Typography,
  Button,
  IconButton,
  Dialog, 
  DialogTitle, 
  DialogActions
 } from '@mui/material';

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function ListBooks() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:8080/books/${id}`)
    .then(() => {
      console.log('book deleted');
    })
  }

  useEffect(() => {
    const book = axios.get('http://localhost:8080/books').then((res) => setBooks(res.data))
    console.log(book)
  }, [])

  return (
    <>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Desc.</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((book) => (
            <TableRow key={book._id}>
              <TableCell>
                <Typography variant="body2" component="h3">
                  {/* <Link href={book._id} underline="hover" className={classes.link}>{book.title}</Link> */}
                  <Button variant="text" color="primary" to={"books/" + book._id} component={Link}>
                    {book.title}
                  </Button>
                  {/* {book.title} */}
                </Typography>
              </TableCell>
              <TableCell> 
                <Typography
                  align="center"
                >
                {book.description}
                </Typography>
              </TableCell>
              <TableCell> 
                <Typography
                  align="center"
                >
                {book.author}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton onClick={handleClickOpen}>
                  <DeleteIcon color="error" />
                </IconButton>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>Are you sure to delete this book?</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      You will not be able to undo deletion once pressed on delete
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleDeleteBook(book._id)}>Delete</Button>
                    <Button onClick={handleClose} autoFocus>Discard</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
              <TableCell>
                {/* /books/:id/edit */}
                <IconButton to={"books/" + book._id + "/edit"} component={Link}  >
                  <EditIcon color="info"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableFooter>
    </TableContainer>
    </>
  )
}

export default ListBooks;
