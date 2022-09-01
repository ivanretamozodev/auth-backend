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
const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const dbUsuario = await Usuario.findOne({ email });
        if (!dbUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'credenciales no validas'
            });
        }

        //validar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUsuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'credenciales no validas'
            });
        }

        //generar el JWT
        const token = await generarJWT(dbUsuario.id, dbUsuario.name);

        return res.json({
            ok: true,
            uid: dbUsuario.id,
            token,
            name: dbUsuario.name
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por Favor,comuniquese con el administrador '
        });
    }
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
