const { decodeJWT } = require('../helper/jwt.helper')
const { createReferal, searchData, updateReferal, deleteReferal } = require('../repository/referal.service')
async function createReferalCode(req, res, next) {

    const data = await decodeJWT(req.headers.authorization)
    if (!data.id) {
        return res.json({
            message: 'invalid JWT Decode',
            data: null,
            status: 400
        })
    }

    if (!req.body.referal_code || !req.body.description || !req.body.type) {
        return res.json({
            message: 'invalid request',
            data: null,
            status: 400
        })

    }

    if (data.role != 'admin') {
        return res.json({
            message: 'admin authorization required',
            data: null,
            status: 400
        })
    }

    req.body.jwt = data
    const resp = await createReferal(req.body)

    if (!resp.id) {
        return res.json({
            message: 'invalid data',
            data: resp,
            status: 400
        })

    }

    return res.json({
        message: "success",
        data: resp,
        status: 200
    })
}

async function getReferalCode(req, res, next) {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit;
    const search = req.query.search || ''

    try {
        const resp = await searchData(search, limit, offset)
        resp.page = page
        return res.json({
            message: "success",
            data: resp,
            status: 200
        })

    } catch (e) {
        return res.json({
            message: "internal server error",
            data: e,
            status: 500
        })

    }

}

async function updateReferalOne(req, res, next) {

    const referalId = parseInt(req.params.id)
    if (!referalId) {
        return res.json({
            message: "invalid request",
            data: null,
            status: 400
        })
    }

    const data = await decodeJWT(req.headers.authorization)

    if (!data.id) {
        return res.json({
            message: 'invalid JWT Decode',
            data: null,
            status: 400
        })
    }

    if (data.role != 'admin') {
        return res.json({
            message: 'unauthorized user',
            data: null,
            status: 400
        })
    }

    try {
        const referalId = parseInt(req.params.id)


        const { referal_code, description, type, addedBy } = req.body

        if (!referalId, !referal_code, !description, !type, !addedBy) {
            return res.json({
                message: "invalid request",
                data: null,
                status: 400
            })
        }

        const data = await updateReferal({ referal_code, description, type, addedBy }, referalId)

        return res.json({
            message: "success",
            data: data,
            status: 200
        })

    } catch (e) {
        return res.json({
            message: "internal server error",
            data: e,
            status: 500
        })
    }

}

async function softDelete(req, res, next) {

    const data = await decodeJWT(req.headers.authorization)
    if (!data.id) {
        return res.json({
            message: 'invalid JWT Decode',
            data: null,
            status: 400
        })
    }

    if (data.role != 'admin') {
        return res.json({
            message: 'unauthorized user',
            data: null,
            status: 400
        })

    }

    const referalId = parseInt(req.params.id)
    if (!referalId) {
        return res.json({
            message: "invalid request",
            data: null,
            status: 400
        })
    }

    try {
        const resp = await deleteReferal(referalId)
        if (resp == 'referal not found') {
            return res.json({
                message: resp,
                data: null,
                status: 400
            })

        }

        return res.json({
            message: "success",
            data: resp,
            status: 200
        })

    } catch (e) {
        return res.json({
            message: "internal server error",
            data: e,
            status: 500
        })
    }

}
module.exports = {
    createReferalCode,
    getReferalCode,
    updateReferalOne,
    softDelete
}