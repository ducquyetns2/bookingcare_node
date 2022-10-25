import fs from 'fs'
import DoctorInfor from '../modal/DoctorInfor.js'
import User from '../modal/User.js'
import Define from '../modal/Define.js'
import DoctorSchedule from '../modal/DoctorSchedule.js'
import { department } from '../../constant.js'
import formidableConfig from './formidableConfig.js'
import SpecialtyInfor from '../modal/SpecialtyInfor.js'
import HospitalInfor from '../modal/HospitalInfor.js'
import HandbookInfor from '../modal/HandbookInfor.js'

class DoctorControl {
    getDetailDoctor(req, res) {
        let doctorId = parseInt(req.params.doctorId)
        if (doctorId) {
            User.findOne({
                where: { id: doctorId },
                attributes: {
                    exclude: ['useName', 'password', 'email', 'phoneNumber', 'department',
                        'filePath', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Define, as: 'genderData', attributes: {
                            exclude: 'roleMap'
                        },
                    }, {
                        model: Define, as: 'positionData', attributes: {
                            exclude: 'roleMap'
                        },
                    }
                ],
                nest: true,
                raw: true
            }).then(result => {
                res.status(200).json({
                    error: false,
                    message: 'Get User successfully',
                    data: result
                })
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter or unvalid parameter',
                data: {}
            })
        }
    }
    getAllDoctor(req, res) {
        User.findAll({
            where: { department: department.DOCTOR },
            raw: true,
            attributes: {
                exclude: ['useName', 'password', 'filePath', 'email', 'phoneNumber',
                    'department', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: Define, as: 'genderData', attribute: {
                        exclude: ['roleMap']
                    },
                }, {
                    model: Define, as: 'positionData', attribute: {
                        exclude: ['roleMap']
                    },
                }, {
                    model: Define, as: 'departmentData', attribute: {
                        exclude: ['roleMap']
                    }
                }
            ],
            nest: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get all doctor successfully',
                data: result
            })
        })
    }
    createDoctorInfor(req, res) {
        let doctorId = req.body.doctorId
        DoctorInfor.findOrCreate({
            where: { doctorId: doctorId },
            defaults: req.body
        }).then(([user, created]) => {
            if (created) {
                res.status(200).json({
                    error: false,
                    type: 'create',
                    message: 'Create doctor information successfully'
                })
            } else {
                DoctorInfor.update(req.body, {
                    where: { doctorId: doctorId }
                }).then(() => {
                    res.status(200).json({
                        error: false,
                        type: 'edit',
                        message: 'update doctor information successfully'
                    })
                })
            }
        })
    }
    getDoctorInfor(req, res) {
        let doctorId = parseInt(req.params.doctorId)
        if (doctorId) {
            DoctorInfor.findOne({
                where: { doctorId: doctorId },
                raw: true,
                include: [
                    {
                        model: Define, as: 'priceData', attribute: {
                            exclude: ['roleMap']
                        }
                    }, {
                        model: Define, as: 'paymentData', attribute: {
                            exclude: ['roleMap']
                        }
                    }, {
                        model: Define, as: 'provinceData', attribute: {
                            exclude: ['roleMap']
                        }
                    }, {
                        model: Define, as: 'specialtyData', attribute: {
                            exclude: ['roleMap']
                        }
                    }, {
                        model: Define, as: 'hospitalData', attribute: {
                            exclude: ['roleMap']
                        }
                    },
                ],
                nest: true
            })
                .then(result => {
                    res.status(200).json({
                        error: false,
                        message: 'Get doctor information successfully',
                        data: result
                    })
                })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter or unvalid parameter'
            })
        }
    }
    createDoctorSchedule(req, res) {
        let schedule = req.body
        DoctorSchedule.destroy({
            where: { timestamp: schedule[0].timestamp, doctorId: schedule[0].doctorId }
        })
        if (schedule[0].time) {
            DoctorSchedule.bulkCreate(req.body).then(result => {
                console.log('số phần tử được tạo:', result.length)
                res.status(200).json({
                    error: false,
                    count: result.length,
                    message: 'Create schedule successfully'
                })
            })
        } else {
            res.status(200).json({
                error: false,
                count: 0,
                message: 'No schedule created'
            })
        }
    }
    getDoctorSchedule(req, res) {
        let { doctorId, timestamp } = req.query
        if (doctorId && timestamp) {
            DoctorSchedule.findAll({
                where: { doctorId, timestamp },
                raw: true,
                include: [
                    {
                        model: Define, as: 'timeData', attributes: {
                            exclude: ['roleMap']
                        }
                    }
                ],
                nest: true
            })
                .then(result => {
                    res.status(200).json({
                        error: false,
                        message: 'Get doctor schedule successfully',
                        data: result
                    })
                })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter or unvalid parameter'
            })
        }
    }
    createSpecialtyInfor(req, res) {
        const dir = 'src/public/uploads/sectionImages'
        const formidable = formidableConfig(dir)
        formidable.parse(req, (error, fields, file) => {
            let infor = fields
            if (file.imageFile) {
                let imagePath = req.protocol + '://' + req.get('host') + '/uploads/sectionImages/'
                    + file.imageFile.newFilename
                infor = {
                    ...fields,
                    imagePath: imagePath,
                    filePath: file.imageFile.filepath
                }
            }
            SpecialtyInfor.findOrCreate({
                where: { specialtyKey: fields.specialtyKey },
                defaults: infor
            }).then(([finded, created]) => {
                if (created) {
                    res.status(200).json({
                        error: false,
                        type: 'create',
                        message: 'Create specialty information successfully'
                    })
                } else {
                    if (file.imageFile && finded.dataValues.filePath) {
                        fs.unlink(finded.dataValues.filePath, () => { })
                    }
                    SpecialtyInfor.update(infor, {
                        where: { specialtyKey: fields.specialtyKey }
                    }).then(() => {
                        res.status(200).json({
                            error: false,
                            type: 'edit',
                            message: 'update specialty information successfully'
                        })
                    })
                }
            })
        })
    }
    getSpecialtyInfor(req, res) {
        let specialtyKey = req.params.specialtyKey
        if (specialtyKey) {
            SpecialtyInfor.findOne({
                where: { specialtyKey: specialtyKey },
                raw: true,
                attributes: {
                    exclude: ['filePath']
                }
            })
                .then(result => {
                    res.status(200).json({
                        error: false,
                        message: 'Get specialty information successfully',
                        data: result
                    })
                })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter or unvalid parameter'
            })
        }
    }
    getAllSpecialtyInfor(req, res) {
        SpecialtyInfor.findAll({
            include: [
                {
                    model: Define, as: 'specialtyName', attributes: {
                        exclulde: ['roleMap']
                    }
                }
            ],
            nest: true, raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get all specialty information successfully',
                data: result
            })
        })

    }
    createHospitalInfor(req, res) {
        const dir = 'src/public/uploads/sectionImages'
        const formidable = formidableConfig(dir)
        formidable.parse(req, (error, fields, file) => {
            let infor = fields
            if (file.imageFile) {
                let imagePath = req.protocol + '://' + req.get('host') + '/uploads/sectionImages/'
                    + file.imageFile.newFilename
                infor = {
                    ...fields,
                    imagePath: imagePath,
                    filePath: file.imageFile.filepath
                }
            }
            HospitalInfor.findOrCreate({
                where: { hospitalKey: fields.hospitalKey },
                defaults: infor
            }).then(([finded, created]) => {
                if (created) {
                    res.status(200).json({
                        error: false,
                        type: 'create',
                        message: 'Create hospital information successfully'
                    })
                } else {
                    if (file.imageFile && finded.dataValues.filePath) {
                        fs.unlink(finded.dataValues.filePath, () => { })
                    }
                    HospitalInfor.update(infor, {
                        where: { hospitalKey: fields.hospitalKey }
                    }).then(() => {
                        res.status(200).json({
                            error: false,
                            type: 'edit',
                            message: 'update hospital information successfully'
                        })
                    })
                }
            })
        })
    }
    getAllHospitalInfor(req, res) {
        HospitalInfor.findAll({
            include: [
                {
                    model: Define, as: 'hospitalName', attributes: {
                        exclulde: ['roleMap']
                    }
                }
            ],
            nest: true, raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get all hospital information successfully',
                data: result
            })
        })

    }
    getHospitalInfor(req, res) {
        let hospitalKey = req.params.hospitalKey
        if (hospitalKey) {
            HospitalInfor.findOne({
                where: { hospitalKey: hospitalKey },
                raw: true,
                attributes: {
                    exclude: ['filePath']
                }
            })
                .then(result => {
                    res.status(200).json({
                        error: false,
                        message: 'Get hospital information successfully',
                        data: result
                    })
                })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter or unvalid parameter'
            })
        }
    }
    createHandbookInfor(req, res) {
        const dir = 'src/public/uploads/sectionImages'
        const formidable = formidableConfig(dir)
        formidable.parse(req, (error, fields, file) => {
            let infor = fields
            if (file.imageFile) {
                let imagePath = req.protocol + '://' + req.get('host') + '/uploads/sectionImages/'
                    + file.imageFile.newFilename
                infor = {
                    ...fields,
                    imagePath: imagePath,
                    filePath: file.imageFile.filepath
                }
            }
            if (!fields.handbookId) {
                HandbookInfor.create(infor).then(result => {
                    result.save()
                    res.status(200).json({
                        error: false,
                        type: 'create',
                        message: 'Create handbook information successfully',
                        data: result.dataValues
                    })
                })
            }
            else {
                HandbookInfor.findOrCreate({
                    where: { handbookId: fields.handbookId },
                    defaults: infor
                }).then(([finded, created]) => {
                    if (created) {
                        res.status(200).json({
                            error: false,
                            type: 'create',
                            message: 'Create handbook information successfully'
                        })
                    } else {
                        if (file.imageFile && finded.dataValues.filePath) {
                            fs.unlink(finded.dataValues.filePath, () => { })
                        }
                        HandbookInfor.update(infor, {
                            where: { handbookId: fields.handbookId }
                        }).then(() => {
                            res.status(200).json({
                                error: false,
                                type: 'edit',
                                message: 'update handbook information successfully'
                            })
                        })
                    }
                })
            }
        })
    }
    getAllHandbookInfor(req, res) {
        SpecialtyInfor.findAll({
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get all handbook information successfully',
                data: result
            })
        })

    }
    getHandbookInfor(req, res) {
        let handbookId = req.params.handbookId
        if (handbookId) {
            HandbookInfor.findOne({
                where: { handbookId: handbookId },
                raw: true,
                attributes: {
                    exclude: ['filePath']
                }
            })
                .then(result => {
                    res.status(200).json({
                        error: false,
                        message: 'Get handbook information successfully',
                        data: result
                    })
                })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter or unvalid parameter'
            })
        }
    }
    getAllHandbookInfor(req, res) {
        HandbookInfor.findAll({
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get all handbook successfully',
                data: result
            })
        })
    }
}
export default new DoctorControl()