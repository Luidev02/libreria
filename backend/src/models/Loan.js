import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Book from "./book.js";
import User from "./user.js";


const Loan = sequelize.define("Loan", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Book,
      key: "id",
    },
  },
  loanDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "returned", "late"),
    defaultValue: "active",    
  }
},  {
  timestamps: true, 
});
Loan.belongsTo(User, { foreignKey: "userId", as: "user" });


export default Loan;