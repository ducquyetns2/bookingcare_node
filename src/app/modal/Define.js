import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

const Define = sequelize.define('define', {
    keyMap: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    roleMap: DataTypes.STRING,
    valueVi: DataTypes.STRING,
    valueEn: DataTypes.STRING,
}, {
    timestamps: false
})

export default Define