import * as authorRepository from '../repositories/author.repository.js';
import * as bookRepository from '../repositories/book.repository.js';
import {Author} from "../models/index.js";

export const findPublishersByAuthor = async (authorName) => {
    const author = await authorRepository.findAuthorById(authorName);
    if (!author) {
        throw new Error(`Author with name ${authorName} not found`);
    }
   const publishers = await bookRepository.booksSummary('publisher', 'DISTINCT', {
       include: {
           model: Author,
           as: 'authors',
           where: {
               name: authorName
           },
           through: {
               attributes: []
           }
       },
       plain: false
   })
    return publishers.map(publisher => publisher.DISTINCT);
}