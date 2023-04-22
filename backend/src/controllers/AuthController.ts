import {matchedData, validationResult} from 'express-validator'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export const signup = async (req:any, res:any) => {
  const errors = validationResult(req)
  
  if(!errors.isEmpty()){
    res.json({error: errors.mapped()})
    return
  }
  
  const data = matchedData(req)
      
  const passwordHash = await bcrypt.hash(data.passwordRegister, 10)

  const newUser = {
   name:data.nameRegister,
   email: data.emailRegister,
   password: passwordHash
  }

  generateTokenReponse(newUser)
    
}

export const signin = async (req:any, res:any) => {
    const errors = validationResult(req)
        if(!errors.isEmpty()){
          res.json({error: errors.mapped()})
          return
        }
        const data = matchedData(req)

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