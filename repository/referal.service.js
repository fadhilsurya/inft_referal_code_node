const { Op } = require('sequelize');
const { referal, user } = require('../models/index')


async function createReferal(body) {
    try {
        const data = await referal.create({
            referal_code: body.referal_code,
            description: body.description,
            type: body.type,
            addedBy: body.jwt.id
        })

        return data

    } catch (e) {
        throw console.error(e);
    }
}

async function searchData(search, limit, offset) {
    try {
        const { count, rows } = await referal.findAndCountAll({
            limit,
            offset,
            where: {
                [Op.or]: [
                    { referal_code: { [Op.iLike]: `%${search}%` } },
                    { type: { [Op.iLike]: `%${search}%` } }
                ]
            },
            include: [{
                model: user,
                attributes: ['name']
            }]
        });

        return ({ count, rows });
    } catch (e) {
        return console.error(e)
    }
}

async function updateReferal(payload, id) {
    try {
        const data = await referal.update(payload, { where: { id: id } })

        return data

    } catch (e) {
        console.error(e)
    }
}


async function deleteReferal(id) {

    try {
        const instance = await referal.findByPk(id);

        if (!instance) {
            return 'referal not found'
        }

        await instance.destroy();

        return

    } catch (e) {

        return e

    }


}

module.exports = {
    createReferal,
    searchData,
    updateReferal,
    deleteReferal
}