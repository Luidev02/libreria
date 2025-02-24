
import Book from "./Book.js";
import Gender from "./Gender.js";
import Loan from "./Loan.js";

// Relaciones entre modelos
Loan.belongsTo(Book, { foreignKey: "bookId", as: "Book" });
Book.hasMany(Loan, { foreignKey: "bookId", as: "Loans", onDelete: "CASCADE" });
Book.belongsTo(Gender, { foreignKey: "gender_id", as: "gender" });
Gender.hasMany(Book, { foreignKey: "gender_id", as: "books" });

export { Book, Loan };
