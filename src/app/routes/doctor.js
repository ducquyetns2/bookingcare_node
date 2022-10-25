import express from 'express'
import DoctorControl from '../controller/DoctorControl.js'

const router = express.Router()
router.get('/getAllHandbookInfor', DoctorControl.getAllHandbookInfor)
router.post('/createHandbookInfor', DoctorControl.createHandbookInfor)
router.get('/getAllHandbookInfor', DoctorControl.getAllHandbookInfor)
router.get('/getHandbookInfor/:handbookId', DoctorControl.getHandbookInfor)
router.post('/createHospitalInfor', DoctorControl.createHospitalInfor)
router.get('/getAllHospitalInfor', DoctorControl.getAllHospitalInfor)
router.get('/getHospitalInfor/:hospitalKey', DoctorControl.getHospitalInfor)
router.post('/createSpecialtyInfor', DoctorControl.createSpecialtyInfor)
router.get('/getAllSpecialtyInfor', DoctorControl.getAllSpecialtyInfor)
router.get('/getSpecialtyInfor/:specialtyKey', DoctorControl.getSpecialtyInfor)
router.post('/createDoctorSchedule', DoctorControl.createDoctorSchedule)
router.get('/getDoctorSchedule', DoctorControl.getDoctorSchedule)
router.post('/createDoctorInfor', DoctorControl.createDoctorInfor)
router.get('/getDoctorInfor/:doctorId', DoctorControl.getDoctorInfor)
router.get('/getDetailDoctor/:doctorId', DoctorControl.getDetailDoctor)
router.get('/getAllDoctor', DoctorControl.getAllDoctor)

export default router