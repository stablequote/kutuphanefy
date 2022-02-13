const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

const BookModel = require('./models/book')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// mongoose connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Conncted to DB!');
})
.catch(err => {
    console.log('Could not connect to the database');
    console.log(err);
})

// routes
app.get('/', (req,res) => {
    res.send('kitap home route')
})
app.get('/books', async (req, res) => {
    const books = await BookModel.find({});
    res.send(books)
})

app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    const books = await BookModel.findById(id);
    res.send(books)
})

app.post('/books/create', async (req, res) => {
    const book = new BookModel(req.body);
    try{
        const newBook = await book.save()
        console.log(newBook)
        // res.redirect('/')
        res.writeHead(302, {
            Location: 'http://localhost:3001/'
        });
        res.end();
    }
    catch(err) {
        console.log(err);
    }
})

app.put('/books/:id/', async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findByIdAndUpdate(id, req.body)
    res.send(book);
})

app.delete('/books/:id/', async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findByIdAndDelete(id)
    res.send(book);
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})