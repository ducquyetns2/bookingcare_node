import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

const handbookInfor = sequelize.define('handbookInfor', {
    handbookId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titleVi: DataTypes.STRING,
    titleEn: DataTypes.STRING,
    contentVi: DataTypes.STRING,
    contentEn: DataTypes.STRING,
    imagePath: DataTypes.TEXT,
    filePath: DataTypes.TEXT
}, {
    timestamps: false
})
export default handbookInfor