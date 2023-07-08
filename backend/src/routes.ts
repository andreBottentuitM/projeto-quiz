import {Router} from 'express';
import {AuthValidator} from './validators/AuthValidator'
import {signup,signin} from './controllers/AuthController'
import {getQuiz} from './controllers/QuizController'


const router = Router();

  
router.post('/signup', AuthValidator.signup, signup)

router.post('/signin', AuthValidator.signin, signin)

router.get('/getquiz', getQuiz)


  export default router;