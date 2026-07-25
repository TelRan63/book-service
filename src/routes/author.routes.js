import {Router} from "express";
import {findBookAuthors, removeAuthor} from "../controllers/author.controller.js";

const router = Router();

router.get('/authors/book/:isbn', findBookAuthors);
router.delete('/author/:authorName', removeAuthor);

export default router;