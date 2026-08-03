import { Book } from '../models/index.js';

export const addBook = async (book, options ={}) => Book.create(book, options);

export const findBookById = async (id, options = {}) => await Book.findByPk(id, options);

export const findBooks = async (options = {}) => await Book.findAll(options);
