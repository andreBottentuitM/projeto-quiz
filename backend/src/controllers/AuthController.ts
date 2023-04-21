import {matchedData, validationResult} from 'express-validator'

export const signup = async (req:any, res:any) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.json({error: errors.mapped()})
        return
      }

      const data = matchedData(req)
      console.log(data)
}

export const signin = async (req:any, res:any) => {
    const errors = validationResult(req)
        if(!errors.isEmpty()){
          res.json({error: errors.mapped()})
          return
        }
        const data = matchedData(req)

        console.log(data)
}