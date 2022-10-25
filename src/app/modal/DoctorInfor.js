import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

const DoctorInfor = sequelize.define('doctorInfor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    doctorId: DataTypes.INTEGER,
    introVi: DataTypes.TEXT,
    introEn: DataTypes.TEXT,
    price: DataTypes.STRING,
    payment: DataTypes.STRING,
    province: DataTypes.STRING,
    specialty: DataTypes.STRING,
    hospital: DataTypes.STRING,
    clinicAddressVi: DataTypes.TEXT,
    clinicAddressEn: DataTypes.TEXT,
}, {
    timestamps: false
})
export default DoctorInfor