import Define from '../modal/Define.js'
import connectDB from '../modal/connectDB.js'

class DefineControl {
    getGender(req, res) {
        Define.findAll({
            where: { roleMap: 'gender' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get gender successfully',
                data: result
            })
        })
    }
    getPosition(req, res) {
        Define.findAll({
            where: { roleMap: 'position' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get position successfully',
                data: result
            })
        })
    }
    getDepartment(req, res) {
        Define.findAll({
            where: { roleMap: 'department' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get department successfully',
                data: result
            })
        })
    }
}
export default new DefineControl()