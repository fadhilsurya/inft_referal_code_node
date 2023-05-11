const { hashPass, comparePass } = require('../helper/password.helper')
const { user } = require('../models/index')
const { writeJWT } = require('../helper/jwt.helper')


async function createUser(body) {

    try {

        const data = await user.create({
            email: body.email,
            password: hashPass(body.password),
            name: body.name,
            role: body.role
        })

        return data


    } catch (e) {

        return console.error(e);

    }


}

async function loginUser(body) {

    try {
        const userData = await user.findOne({
            where: {
                email: body.email
            }
        })


        const checkPass = await comparePass(body.password, userData.password)

        if (!checkPass) {
            return 'password is not right'
        }


        return await writeJWT({
            email: userData.email,
            name: userData.name,
            role: userData.role,
            id: userData.id
        })
    } catch (e) {
        return console.error(e);

    }

}

module.exports = {
    createUser,
    loginUser

}