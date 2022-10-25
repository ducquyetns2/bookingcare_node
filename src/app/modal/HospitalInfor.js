import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

const HospitalInfor = sequelize.define('hospitalInfor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    hospitalKey: DataTypes.STRING,
    introVi: DataTypes.STRING,
    introEn: DataTypes.STRING,
    imagePath: DataTypes.TEXT,
    filePath: DataTypes.TEXT
}, {
    timestamps: false
})
export default HospitalInfor