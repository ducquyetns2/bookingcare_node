import { DataTypes } from 'sequelize'
import sequelize from '../modal/sequelize.js'

const UserSchedule = sequelize.define('userSchedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    bookedDate: DataTypes.STRING,
    bookedTimestamp: DataTypes.BIGINT,
    bookedTime: DataTypes.STRING,
    examinationReason: DataTypes.TEXT
}, {
    timestamps: false
})
export default UserSchedule