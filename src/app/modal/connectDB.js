import mssql from 'mssql'

const config = {
    server: 'localhost',
    user: 'sa',
    password: 'Anhquy28',
    database: 'bookingCare',
    options: {
        trustServerCertificate: true
    }
}
const connectDB = await mssql.connect(config)
export default connectDB