import * as authorService from "../services/author.service.js";

export const findBookAuthors = async (req, res, next) => {
    try {
        const authors = await authorService.findBookAuthors(req.params.isbn);
        return res.json(authors);
    } catch (err) {
        return next(err);
    }
}

export const removeAuthor = async (req, res, next) => {
    try {
        const author = await authorService.removeAuthor(req.params.authorName);
        return res.json(author);
    } catch (err) {
        return next(err);
    }
}