import * as authorRepository from '../repositories/author.repository.js';

export const findPublishersByAuthor = async (authorName) => {
    const author = await authorRepository.findAuthorById(authorName);
    if (!author) {
        throw new Error(`Author with name ${authorName} not found`);
    }
    const books = await author.getBooks();
    return [...new Set(books.map(book => book.publisher))];
}