const JWT = require('jsonwebtoken');

const generarJWT = (uid, name) => {
    const payload = { uid, name };
    return new Promise((resolve, reject) => {
        JWT.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: '24h'
            },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generarJWT
};
