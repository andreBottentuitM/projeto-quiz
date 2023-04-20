import {Router} from 'express';

import asyncHandler from 'express-async-handler';

const router = Router();

  
router.post('/signup', asyncHandler(
  async (req, res) => {
      console.log(req.body)
     
  }
))

router.post('/signin', asyncHandler(
    async (req, res) => {
        console.log(req.body)
       
    }
  ))


  export default router;