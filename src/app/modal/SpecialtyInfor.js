import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

const SpecialtyInfor = sequelize.define('specialtyInfor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    specialtyKey: DataTypes.STRING,
    introVi: DataTypes.STRING,
    introEn: DataTypes.STRING,
    imagePath: DataTypes.TEXT,
    filePath: DataTypes.TEXT
}, {
    timestamps: false
})
export default SpecialtyInfor