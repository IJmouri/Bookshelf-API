const mongoose = require('mongoose')
const validator = require('validator')

const bookSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

//get only book name and id in booklist
bookSchema.methods.toJSON = function () {
    const book = this
    const bookObject = book.toObject()

    delete bookObject.author
    delete bookObject.category
    delete bookObject.userId
    delete bookObject.__v

    return bookObject
}

//get all the fields of book collection
bookSchema.methods.getBook = function () {
    const book = this
    const bookObject = book.toObject()

    return bookObject
}

const Book = mongoose.model('Book', bookSchema)

module.exports = Book