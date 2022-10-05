import User from './User.js'
import Define from './Define.js'

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
}
export default association