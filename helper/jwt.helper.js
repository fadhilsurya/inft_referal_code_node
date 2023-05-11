const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWTKEY

function writeJWT(data) {
    return jwt.sign(data, jwtKey)
}

async function decodeJWT(data) {
    try {

        const jwtToken = data.split(' ')
        const token = jwt.verify(jwtToken[1], jwtKey)
        return token
    } catch (e) {
        return e
    }
}

module.exports = {
    writeJWT,
    decodeJWT
}