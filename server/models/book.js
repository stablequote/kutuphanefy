const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        // default: Date.now
    },
    status: {
        type: String,
    },
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;