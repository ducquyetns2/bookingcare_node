import express from 'express'
import DefineControl from '../controller/DefineControl.js'
const router = express.Router()

router.get('/getGender', DefineControl.getGender)
router.get('/getPosition', DefineControl.getPosition)
router.get('/getDepartment', DefineControl.getDepartment)

export default router