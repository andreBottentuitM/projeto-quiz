import {matchedData, validationResult} from 'express-validator'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import prisma from '../libs/prisma'
dotenv.config();

export const signup = async (req:any, res:any) => {
  const errors = validationResult(req)

  
  if(!errors.isEmpty()){
    res.status(400).send({error: errors.mapped()})
    return
  }
  
  const data = matchedData(req)

  const userEmail = await prisma.user.findFirst({
    where:{
      email:data.emailRegister
    }
  }).then(user => {
   return user
  })

  if(userEmail) {
    res.status(400).send({
        error:'E-mail já existe'
    })
    return
  }

  const userName = await prisma.user.findFirst({
    where:{
      name:data.nameRegister
    }
  }).then(user => {
   return user
  })

  if(userName) {
    res.status(400).send({
        error:'Nome já existe'
    })
    return
  }
      
  const passwordHash = await bcrypt.hash(data.passwordRegister, 10)

  const newUser = {
   name:data.nameRegister,
   email: data.emailRegister,
   password: passwordHash
  }

  const user = await prisma.user.create({
    data:{
      name:newUser.name,
      email:newUser.email,
      password:passwordHash
    }
  })

}

export const signin = async (req:any, res:any) => {
    const errors = validationResult(req)
        if(!errors.isEmpty()){
          res.status(400).send({error: errors.mapped()})
          return
        }
        const data = matchedData(req)

         const user = await prisma.user.findFirst({
           where:{
             email:data.email
           }
         }).then(user => {
          return user
         })

         if(!user){
          res.status(400).send({error: 'Email e/ou senha errados!'})
          return
      }

      const match = await bcrypt.compare(data.password, user.password)
      
      if(!match) {
        res.status(400).send({error: 'Email e/ou senha errados!'})
        return
    }

    res.send(generateTokenReponse(user))

}

const generateTokenReponse = (newUser:any) => {

   const token = jwt.sign(
     {email:newUser.email},
     process.env.JWT_SECRET!,{
     expiresIn:"30d"
   });

    return {
      name: newUser.name,
      email: newUser.email,
      token: token
    };
}