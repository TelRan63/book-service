import { Book } from '../models/index.js';

export const addBook = async (book) => Book.create(book);

export const findBookById = async (id) => await Book.findByPk(id);
