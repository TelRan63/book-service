import * as bookRepository from "../repositories/book.repository.js";
import * as authorRepository from "../repositories/author.repository.js";
import {sequelize} from "../config/database.js";

export const findBookAuthors = async (isbn) => {
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
    const transaction = await sequelize.transaction();
    try {
        const author = await authorRepository.findAuthorById(authorName, {
            transaction,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'birth_date'],
                include: ['name', [sequelize.col('birth_date'), 'birthDate']]
            }
        });
        if (!author) {
            throw new Error(`Author with name ${authorName} not found`);
        }
        await author.destroy({transaction});
        await transaction.commit();
        return author;
    } catch (e) {
        await transaction.rollback();
        console.log('Error removing author:', e);
        throw e;
    }
}