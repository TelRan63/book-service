import { Author } from '../models/index.js';

export const findAuthorById = async (id, options = {}) => Author.findByPk(id, options);

export const addAuthor = async (author, options = {}) => Author.create({name: author.name, birth_date: new Date(author.birthDate)}, options);