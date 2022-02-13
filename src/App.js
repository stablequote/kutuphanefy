import { Switch, Route, Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import Navbar from './components/Navbar'
import CreateBook from './components/CreateBook'
import ListBooks from './components/ListBooks'
import BookDetails from './components/BookDetails'
import EditBook from './components/EditBook'

function ContactPage () {
  return (
    <>
      <Typography>Contact us page</Typography>
    </>
  )
}

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <Navbar />
      {/* main */}
      <Container maxWidth="md" disableGutters>
        {/* <Typography 
        variant="h3" 
        component="h1" 
        color="primary"
        >
          Kutuphanefy
        </Typography> */}

        <Switch>
            <Route path="/" exact component={ListBooks} />
            <Route path="/contact" exact component={ContactPage} />
            <Route path="/books/add" exact component={CreateBook} />
            <Route path="/books/:id" exact component={BookDetails} />
            <Route path="/books/:id/edit" exact component={EditBook} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
