const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()

//add book
router.post('/book', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        userId: req.user._id
    })

    try {
        await book.save()
        res.status(201).send(book.getBook())
    } catch (e) {
        res.status(400).send(e)
    }
})


// edit or update book details by id
router.patch('/book/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'author', 'category']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {

        const book = await Book.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        // const book = await Book.findById(req.params.id)

        updates.forEach((update) => book[update] = req.body[update])
        await book.save()

        if (!book) {
            return res.status(404).send()
        }

        res.send(book.getBook())

    } catch (e) {
        res.status(400).send(e)
    }
})

//delete book by id
router.delete('/book/:id', auth, async (req, res) => {

    try {
        const book = await Book.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        // const book = await Book.findByIdAndDelete(req.params.id)

        if (!book) {
            return res.status(404).send()
        }
        res.send(book.getBook())
    } catch (e) {
        res.status(500).send()
    }
})

//get book list publicly
router.get('/bookList', async (req, res) => {
    try {
        const books = await Book.find({})
        res.send(books)
    } catch (e) {
        res.status(500).send(e)
    }
})


//get book details publicly by ID
router.get('/bookDetails/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.send(book.getBook())
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router