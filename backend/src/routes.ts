import {Router} from 'express';
import {AuthValidator} from './validators/AuthValidator'
import {signup,signin} from './controllers/AuthController'
import asyncHandler from 'express-async-handler';

const router = Router();

  
router.post('/signup', AuthValidator.signup, signup)

router.post('/signin', AuthValidator.signin, signin)


  export default router;