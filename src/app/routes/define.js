import express from 'express'
import DefineControl from '../controller/DefineControl.js'
const router = express.Router()

router.get('/getTime', DefineControl.getTime)
router.get('/getGender', DefineControl.getGender)
router.get('/getPosition', DefineControl.getPosition)
router.get('/getDepartment', DefineControl.getDepartment)
router.get('/getPrice', DefineControl.getPrice)
router.get('/getProvince', DefineControl.getProvince)
router.get('/getPayment', DefineControl.getPayment)
router.get('/getSpecialty', DefineControl.getSpecialty)
router.get('/getHospital', DefineControl.getHospital)

export default router 