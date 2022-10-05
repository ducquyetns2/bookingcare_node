import userRouter from './user.js'
import defineRouter from './define.js'

function webRoute(app) {
    app.use('/api/user', userRouter)
    app.use('/api/define', defineRouter)
}
export default webRoute