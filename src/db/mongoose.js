const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/book-management-system', {
mongoose.connect('mongodb+srv://bookshelf:!@#$%^&*@cluster0.anx5q.mongodb.net/book-management?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
})