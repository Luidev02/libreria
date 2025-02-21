import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Gender = sequelize.define("Gender", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
})

export default Gender;