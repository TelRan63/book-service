import * as bookRepository from '../repositories/book.repository.js';
import * as publisherRepository from '../repositories/publisher.repository.js';
import * as authorRepository from '../repositories/author.repository.js';
import {Author} from "../models/index.js";
import {sequelize} from "../config/database.js";

export const addBook = async (book) => {
    const t = await sequelize.transaction();
    try {
        const {isbn, title} = book;
        if (await bookRepository.findBookById(isbn, {transaction: t})) {
            throw new Error('Book with the same isbn already exists');
        }
        // Create or find the publisher
        let publisher = await publisherRepository.findPublisherById(book.publisher, {transaction: t});
        if (!publisher) {
            await publisherRepository.addPublisher(book.publisher, {transaction: t});
        }
        // Process the authors
        const authors = [];
        for (const a of book.authors) {
            let author = await authorRepository.findAuthorById(a.name, {transaction: t});
            if (!author) {
                author = await authorRepository.addAuthor(a, {transaction: t});
            }
            authors.push(author);
        }
        // Create a new Book
        book = await bookRepository.addBook({isbn, title, publisher: book.publisher}, {transaction: t});
        await book.setAuthors(authors, {transaction: t});
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log('Error adding book:', e);
        throw e;
    }
}

export const findBookByIsbn = async (isbn) => {
    const book = await bookRepository.findBookById(isbn, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: Author,
                as: 'authors',
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'birth_date'],
                    include: ['name', [sequelize.col('birth_date'), 'birthDate']]
                }
            }
        ]
    });
    if(!book) {
        throw new Error(`Book with ISBN ${isbn} not found`);
    }
    return book;
}

export const removeBook = async (isbn) => {
    // TODO: Implement removeBook service
}

export const updateBookTitle = async (isbn, title) => {
    // TODO: Implement updateBookTitle service
}

export const findBooksByAuthor = async (authorName) => {
    // TODO: Implement findBooksByAuthor service
}

export const findBooksByPublisher = async (publisherName) => {
    // TODO: Implement findBooksByPublisher service
}