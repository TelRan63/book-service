import * as bookRepository from "../repositories/book.repository.js";
import {sequelize} from "../config/database.js";

export const findBookAuthors = async (isbn)  => {
    const book = await bookRepository.findBookById(isbn);
    if (!book) {
        throw new Error(`Book with ISBN ${isbn} not found`);
    }
    return await book.getAuthors({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'birth_date'],
            include: ['name', [sequelize.col('birth_date'), 'birthDate']]
        },
        joinTableAttributes: []
    });
}

export const removeAuthor = async (authorName) => {
    // TODO: Implement removeAuthor service
}