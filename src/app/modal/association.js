import User from './User.js'
import Define from './Define.js'
import DoctorInfor from './DoctorInfor.js'
import DoctorSchedule from './DoctorSchedule.js'
import SpecialtyInfor from './SpecialtyInfor.js'
import HospitalInfor from './HospitalInfor.js'

function association() {
    // Association between User and Define
    Define.hasMany(User, {
        foreignKey: 'gender'
    })
    Define.hasMany(User, {
        foreignKey: 'department'
    })
    Define.hasMany(User, {
        foreignKey: 'position'
    })
    User.belongsTo(Define, {
        foreignKey: 'gender', as: 'genderData'
    })
    User.belongsTo(Define, {
        foreignKey: 'department', as: 'departmentData'
    })
    User.belongsTo(Define, {
        foreignKey: 'position', as: 'positionData'
    })
    // Associaion between DoctorInfor and Define
    Define.hasMany(DoctorInfor, {
        foreignKey: 'price'
    })
    Define.hasMany(DoctorInfor, {
        foreignKey: 'payment'
    })
    Define.hasMany(DoctorInfor, {
        foreignKey: 'province'
    })
    Define.hasMany(DoctorInfor, {
        foreignKey: 'specialty'
    })
    Define.hasMany(DoctorInfor, {
        foreignKey: 'hospital'
    })
    DoctorInfor.belongsTo(Define, {
        foreignKey: 'price', as: 'priceData'
    })
    DoctorInfor.belongsTo(Define, {
        foreignKey: 'payment', as: 'paymentData'
    })
    DoctorInfor.belongsTo(Define, {
        foreignKey: 'province', as: 'provinceData'
    })
    DoctorInfor.belongsTo(Define, {
        foreignKey: 'specialty', as: 'specialtyData'
    })
    DoctorInfor.belongsTo(Define, {
        foreignKey: 'hospital', as: 'hospitalData'
    })
    // Association between DoctorSchedule and Define
    Define.hasOne(DoctorSchedule, {
        foreignKey: 'time'
    })
    DoctorSchedule.belongsTo(Define, {
        foreignKey: 'time', as: 'timeData'
    })
    // Association between SpecialtyInfor and Define
    Define.hasOne(SpecialtyInfor, {
        foreignKey: 'specialtyKey'
    })
    SpecialtyInfor.belongsTo(Define, {
        foreignKey: 'specialtyKey', as: 'specialtyName'
    })
    // Association between HospitalInfor and Define
    Define.hasOne(HospitalInfor, {
        foreignKey: 'hospitalKey'
    })
    HospitalInfor.belongsTo(Define, {
        foreignKey: 'hospitalKey', as: 'hospitalName'
    })
}
export default association