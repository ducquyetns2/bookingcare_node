import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('bookingCare', 'sa', 'Anhquy28', {
    host: 'localhost',
    dialect: 'mssql'
})
export default sequelize