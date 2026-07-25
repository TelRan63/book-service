import * as bookService from '../services/book.service.js';

export const addBook = async (req, res, next) => {
    try {
        await bookService.addBook(req.body);
        return res.sendStatus(201);
    } catch (err) {
        return next(err);
    }
}

export const findBookByIsbn = async (req, res, next) => {
    try {
        const book = await bookService.findBookByIsbn(req.params.isbn);
        return res.json(book);
    } catch (err) {
        return next(err);
    }
}

export const removeBook = async (req, res, next) => {
    try {
        const book = await bookService.removeBook(req.params.isbn);
        return res.json(book);
    } catch (err) {
        return next(err);
    }
}

export const updateBookTitle = async (req, res, next) => {
    try {
        const book = await bookService.updateBookTitle(req.params.isbn, req.params.title);
        return res.json(book);
    } catch (err) {
        return next(err);
    }
}

export const findBooksByAuthor = async (req, res, next) => {
    try {
        const books = await bookService.findBooksByAuthor(req.params.authorName);
        return res.json(books);
    } catch (err) {
        return next(err);
    }
}

export const findBooksByPublisher = async (req, res, next) => {
    try {
        const books = await bookService.findBooksByPublisher(req.params.publisherName);
        return res.json(books);
    } catch (err) {
        return next(err);
    }
}