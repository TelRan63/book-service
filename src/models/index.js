import Book from "./book.model.js";
import Publisher from "./publisher.model.js";
import Author from "./author.model.js";
import {sequelize} from "../config/database.js";
import {DataTypes} from "sequelize";

// Book and Publisher. One-To-Many relationship
Book.belongsTo(Publisher, {
    foreignKey: 'publisher',
    targetKey: 'publisher_name',
    as: 'publisherDetails'
});

Publisher.hasMany(Book, {
    foreignKey: 'publisher',
    targetKey: 'publisher_name',
    as: 'books'
})

// Book and Author. Many-To-Many
// Define the junction table
const BooksAuthors = sequelize.define('BooksAuthors', {
    isbn: {
        type: DataTypes.STRING,
        references: {
            model: Book,
            key: 'isbn'
        }
    },
    author_name: {
        type: DataTypes.STRING,
        references: {
            model: Author,
            key: 'name'
        }
    }
}, {
    tableName: 'books_authors'
})

Book.belongsToMany(Author, {
    through: BooksAuthors,
    foreignKey: 'isbn',
    otherKey: 'author_name',
    as: 'authors'
})

Author.belongsToMany(Book, {
    through: BooksAuthors,
    foreignKey: 'author_name',
    otherKey: 'isbn',
    as: 'books'
})

const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log('Models synced successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

export {Book, Publisher, Author, syncModels}