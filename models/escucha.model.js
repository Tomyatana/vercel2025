import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbconfig.js";
import { Cancion } from "./cancion.model.js";
import { User } from "./user.model.js";
export class Escucha extends Model {}
Escucha.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'user_id'
            }
        },
        cancion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cancion, 
                key: 'id'
            }
        },
        fechaEscucha: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Escucha",
        tableName: "Escucha"
    }
)
