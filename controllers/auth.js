const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

//controlador de crear usuario
const crearUsuario = async (req, res = response) => {
    const { name, password, email } = req.body;

    try {
        //verificar que no se repita el email
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'el email ya se encuentra registrado en la aplicacion'
            });
        }

        //crear usuario con el modelo
        const dbUsuario = new Usuario(req.body);

        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        dbUsuario.password = bcrypt.hashSync(password, salt);

        //generar JWT
        const token = await generarJWT(dbUsuario.id, name);

        //creando el usuario en la BD
        await dbUsuario.save();

        //generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUsuario.id,
            name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por Favor,comuniquese con el administrador '
        });
    }
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
