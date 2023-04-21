import {checkSchema} from 'express-validator'


export const AuthValidator = {
    signup: checkSchema({
        nameRegister:{
            trim: true,
            isLength:{
                options:{min: 2}
            },
            errorMessage: "Nome precisa ter pelo menos dois caracteres."
        },
        emailRegister: {
            isEmail: true,
            normalizeEmail:true,
            errorMessage: 'E-mail inválido'
        },
        passwordRegister:{
            isLength:{
                options: {min:6}
            },
            errorMessage:'Senha precisa ter pelo menos 6 caracteres'
        }
    }),
    signin: checkSchema({
        email:{
            isEmail:true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength:{
                options: {min: 6}
            },
            errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
        }
    })
}
