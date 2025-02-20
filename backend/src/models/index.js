
import Book from "./book.js";
import Loan from "./Loan.js";

// Relaciones entre modelos
Book.hasMany(Loan, { foreignKey: "bookId", onDelete: "CASCADE" });
Loan.belongsTo(Book, { foreignKey: "bookId" });


export { Book, Loan };
