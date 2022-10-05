import User from '../modal/User.js'
import connectDB from '../modal/connectDB.js'
import formidableConfig from './formidableConfig.js'
import fs from 'fs'
import Define from '../modal/Define.js'
import association from '../modal/association.js'

association()
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
    getUser(req, res) {
        User.findOne({
            raw: true,
            where: { useName: req.body.useName, password: req.body.password },
            attributes: {
                exclude: ['password', 'createAt', 'updateAt', 'department', 'position']
            }
        }).then(result => {
            if (result) {
                res.status(200).json({
                    error: false,
                    message: 'Successfully login',
                    data: result
                })
            } else {
                res.status(200).json({
                    error: true,
                    message: 'UseName or password is incorrect'
                })
            }
        }).catch((error) => {
            res.status(200).json({
                error: true,
                message: 'System error',
                data: error
            })
        })
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
            User.update({ password: data.newPassword }, {
                where: { useName: data.useName, password: data.currentPassword }
            }).then(result => {
                res.status(200).json({
                    error: false,
                    message: 'Change password successfully',
                })
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
            const findedName = fields.useName && await User.findOne({ where: { useName: fields.useName } })
            if (findedName) {
                res.status(200).json({
                    error: true,
                    message: 'UseName has been exist'
                })
            } else {
                User.update({
                    ...fields
                }, { where: { id: fields.id } })
                // Update Avatar
                if (file.avatar) {
                    const findedUser = await User.findOne({ where: { id: fields.id } })
                    const filePath = findedUser.filePath
                    // Delete current Avatar
                    fs.unlink(filePath, () => { })
                    const newAvatarPath = req.protocol + "://" + req.get('host') + "/uploads/avatars/"
                        + file.avatar.newFilename
                    // Update User
                    User.update({
                        avatarPath: newAvatarPath,
                        filePath: file.avatar.filepath
                    }, { where: { id: fields.id } })
                        .then(result => {
                            res.status(200).json({
                                error: false,
                                message: 'Change information successfully',
                                data: {
                                    ...fields,
                                    avatarPath: newAvatarPath,
                                }
                            })
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
            }
        })
    }
    deleteUser(req, res) {
        var UserId = req.params.id
        if (UserId !== 'undefined') {
            User.destroy({
                where: { id: UserId }
            }).then(() => {
                res.status(200).json({
                    error: false,
                    message: 'Delete User successfully'
                })
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter'
            })
        }
    }
    getDetailUser(req, res) {
        var UserId = req.params.id
        if (UserId !== 'undefined') {
            User.findByPk(UserId).then(result => {
                res.status(200).json({
                    error: false,
                    message: 'Get User successfully',
                    data: result
                })
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Missing parameter',
                data: {}
            })
        }
    }
}
export default new UserControl()