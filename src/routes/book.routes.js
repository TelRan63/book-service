import {Router} from "express";
import {
    addBook,
    findBookByIsbn,
    findBooksByAuthor, findBooksByPublisher,
    removeBook,
    updateBookTitle
} from "../controllers/book.controller.js";

const router = Router();

router.post('/book', addBook);
router.get('/book/:isbn', findBookByIsbn);
router.delete('/book/:isbn', removeBook);
router.patch('/book/:isbn/title/:title', updateBookTitle);
router.get('/books/author/:authorName', findBooksByAuthor);
router.get('/books/publisher/:publisherName', findBooksByPublisher);

export default router;