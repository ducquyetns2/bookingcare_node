import express from 'express'
import UserControl from '../controller/UserControl.js'

const router = express.Router()
router.post('/createUserSchedule', UserControl.createUserSchedule)
router.delete('/deleteUser/:id', UserControl.deleteUser)
router.put('/changePassword', UserControl.changePassword)
router.put('/editUser', UserControl.editUser)
router.get('/getAllUser', UserControl.getAllUser)
router.post('/compareUser', UserControl.getUser)
router.post('/createUser', UserControl.createUser)

export default router