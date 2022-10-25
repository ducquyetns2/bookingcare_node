import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: {
        type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    useName: DataTypes.STRING,
    password: DataTypes.STRING,
    department: DataTypes.STRING,
    position: DataTypes.STRING,
    avatarPath: DataTypes.TEXT,
    filePath: DataTypes.TEXT
}, {
    timestamps: true
})

export default User
