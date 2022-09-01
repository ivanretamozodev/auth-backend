const { response } = require('express');

//controlador de crear usuario
const crearUsuario = (req, res = response) => {
    const { name, password, email } = req.body;

    res.json({
        ok: true,
        msg: 'creando nuevo usuario /new'
    });
};

//controlador del login de usuario
const loginUsuario = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'creando login de usuario /'
    });
};

//controlador de la revalidacion del token
const revalidarToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'revalidando usuario /renew'
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};
