import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbconfig.js";
export class User extends Model {}
User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "user",
        tableName: "user",
        timestamps: false,
    }
)
