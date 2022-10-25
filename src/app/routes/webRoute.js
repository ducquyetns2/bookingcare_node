import userRouter from './user.js'
import defineRouter from './define.js'
import doctorRouter from './doctor.js'

function webRoute(app) {
    app.use('/api/user', userRouter)
    app.use('/api/doctor', doctorRouter)
    app.use('/api/define', defineRouter)
}
export default webRoute