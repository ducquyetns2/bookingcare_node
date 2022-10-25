import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

const DoctorSchedule = sequelize.define('doctorSchedule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorId: DataTypes.INTEGER,
    bookedDate: DataTypes.STRING,
    timestamp: DataTypes.BIGINT,
    time: DataTypes.STRING
}, {
    timestamps: false
})
export default DoctorSchedule