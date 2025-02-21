
import Book from "./book.js";
import Loan from "./Loan.js";

// Relaciones entre modelos
Loan.belongsTo(Book, { foreignKey: "bookId", as: "Book" });
Book.hasMany(Loan, { foreignKey: "bookId", as: "Loans", onDelete: "CASCADE" });

export { Book, Loan };
