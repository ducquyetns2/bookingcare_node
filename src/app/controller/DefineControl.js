import Define from '../modal/Define.js'

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
    getPrice(req, res) {
        Define.findAll({
            where: { roleMap: 'price' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get price successfully',
                data: result
            })
        })
    }
    getProvince(req, res) {
        Define.findAll({
            where: { roleMap: 'province' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get province successfully',
                data: result
            })
        })
    }
    getPayment(req, res) {
        Define.findAll({
            where: { roleMap: 'payment' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get payment successfully',
                data: result
            })
        })
    }
    getSpecialty(req, res) {
        Define.findAll({
            where: { roleMap: 'specialty' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get payment successfully',
                data: result
            })
        })
    }
    getHospital(req, res) {
        Define.findAll({
            where: { roleMap: 'hospital' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get payment successfully',
                data: result
            })
        })
    }
    getTime(req, res) {
        Define.findAll({
            where: { roleMap: 'time' },
            attributes: {
                exclude: ['roleMap']
            },
            raw: true
        }).then(result => {
            res.status(200).json({
                error: false,
                message: 'Get time successfully',
                data: result
            })
        })
    }
}
export default new DefineControl()