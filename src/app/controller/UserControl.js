import User from '../modal/User.js'
import formidableConfig from './formidableConfig.js'
import fs from 'fs'
import Define from '../modal/Define.js'
import { department } from '../../constant.js'
import UserSchedule from '../modal/UserSchedule.js'

class UserControl {
    getAllUser(req, res) {
        User.findAll({
            attributes: {
                exclude: ['filePath']
            },
            include: [
                {
                    model: Define, as: 'genderData', attributes: {
                        exclude: ['roleMap']
                    }
                }, {
                    model: Define, as: 'departmentData', attributes: {
                        exclude: ['roleMap']
                    }
                }, {
                    model: Define, as: 'positionData', attributes: {
                        exclude: ['roleMap']
                    }
                },
            ],
            raw: true,
            nest: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get all users successfully',
                data: result
            })
        })

    }
    async getUser(req, res) {
        let recievedData = req.body
        let findedUser = {}
        if (recievedData.department && recievedData.department !== department.USER) {
            findedUser = await User.findOne({
                raw: true,
                where: { useName: recievedData.useName, password: recievedData.password, department: recievedData.department },
                attributes: {
                    exclude: ['password', 'createAt', 'updateAt', 'position']
                }
            })
        } else {
            findedUser = await User.findOne({
                raw: true,
                where: { useName: recievedData.useName, password: recievedData.password },
                attributes: {
                    exclude: ['password', 'createAt', 'updateAt', 'position']
                }
            })
        }
        if (findedUser) {
            res.status(200).json({
                error: false,
                message: 'Successfully login',
                data: findedUser
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'UseName or password is incorrect'
            })
        }
    }
    createUser(req, res) {
        const dir = 'src/public/uploads/avatars'
        const formidable = formidableConfig(dir)
        // Handle Files
        formidable.parse(req, async (error, fields, file) => {
            const findedUser = await User.findOne({ where: { useName: fields.useName } })
            if (findedUser) {
                fs.unlink(file.avatar.filepath, () => { })
                res.status(200).json({
                    error: true,
                    message: 'UseName has been exist'
                })
            } else {
                const avatarPath = req.protocol + '://' + req.get('host') +
                    '/uploads/avatars/' + file.avatar.newFilename
                const newUser = await User.create({
                    ...fields,
                    avatarPath: avatarPath,
                    filePath: file.avatar.filepath
                })
                newUser.save().then((user) => {
                    res.status(200).json({
                        error: false,
                        message: 'Create account success',
                    })
                })
            }
        })
    }
    async changePassword(req, res) {
        let data = req.body
        const findedUser = await User.findOne({ where: { useName: data.useName, password: data.currentPassword } })
        if (findedUser) {
            findedUser.password = data.newPassword
            findedUser.save()
            res.status(200).json({
                error: false,
                message: 'Change password successfully',
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Password is wrong'
            })
        }
    }
    editUser(req, res) {
        const dir = 'src/public/uploads/avatars'
        const formidable = formidableConfig(dir)
        formidable.parse(req, async (err, fields, file) => {
            if (fields.isChangeUseName === 'true') {
                const findedName = await User.findOne({ where: { useName: fields.useName } })
                if (findedName) {
                    res.status(200).json({
                        error: true,
                        message: 'UseName has been exist'
                    })
                    return
                }
            }
            User.update({
                ...fields
            }, { where: { id: fields.id } })
            // Update Avatar
            if (file.avatar) {
                const findedUser = await User.findOne({ where: { id: fields.id } })
                const filePath = findedUser.filePath
                console.log(filePath)
                // Delete current Avatar
                fs.unlink(filePath, () => { })
                const newAvatarPath = req.protocol + "://" + req.get('host') + "/uploads/avatars/"
                    + file.avatar.newFilename
                // Update User
                findedUser.avatarPath = newAvatarPath
                findedUser.filePath = file.avatar.filepath
                findedUser.save()
                res.status(200).json({
                    error: false,
                    message: 'Change information successfully',
                    data: {
                        ...fields,
                        avatarPath: newAvatarPath
                    }
                })
            } else {
                res.status(200).json({
                    error: false,
                    message: 'Change information successfully',
                    data: {
                        ...fields
                    }
                })
            }
        })
    }
    async deleteUser(req, res) {
        let userId = parseInt(req.params.id)
        if (userId) {
            const findedUser = await User.findByPk(userId)
            let filePath = findedUser.filePath
            fs.unlink(filePath, () => { })
            findedUser.destroy()
            res.status(200).json({
                error: false,
                message: 'Delete User successfully'
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter or unvalid paramter'
            })
        }
    }
    createUserSchedule(req, res) {
        UserSchedule.findAll({ where: { userId: req.body.userId } })
            .then(result => {
                if (result.length < 10) {
                    UserSchedule.findOrCreate({
                        where: { userId: req.body.userId, bookedTime: req.body.bookedTime },
                        defaults: req.body
                    }).then(([user, created]) => {
                        if (created) {
                            res.status(200).json({
                                error: false,
                                message: 'Create an appointment successfully'
                            })
                        } else {
                            res.status(200).json({
                                error: true,
                                isDulicate: true,
                                message: 'An appointment at this time has booked'
                            })
                        }
                    })

                } else {
                    res.status(200).json({
                        error: true,
                        message: 'Create exceed maximun'
                    })
                }
            })
    }
}
export default new UserControl()