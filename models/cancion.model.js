import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbconfig.js";
export class Cancion extends Model {}
Cancion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "cancion",
        tableName: "cancion"
    }
)
