const { createUser, loginUser } = require('../repository/user.service')

const roles = {
    user: 'user',
    admin: 'admin'
}

function checkRoles(input) {

    if (input == roles.admin) {
        return true
    } else if (input == roles.user) {
        return true
    } else {
        return false
    }

}

async function createAccount(req, res, next) {
    // check role first
    const checkRole = await checkRoles(req.body.role)
    if (!checkRole) {
        return res.json({
            message: "role has to be user or admin",
            data: null,
            status: 400
        })
    }

    try {

        const data = await createUser(req.body)

        return res.json({
            message: "success",
            data: null,
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

async function login(req, res, next) {

    try {
        const data = await loginUser(req.body)

        if (data == 'password is not right') {
            return res.json({
                message: "invalid request",
                data: data,
                status: 400
            })

        }

        return res.json({
            message: "success",
            data: data,
            status: 200
        })

    } catch (error) {
        return res.json({
            message: "internal server error",
            data: e,
            status: 500
        })

    }
}


module.exports = {
    createAccount, login
}