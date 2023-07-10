import {Router} from 'express';
import {AuthValidator} from './validators/AuthValidator'
import {signup,signin} from './controllers/AuthController'
import {getQuiz, getcurrentquiz, getCurrentQuestions} from './controllers/QuizController'


const router = Router();

  
router.post('/signup', AuthValidator.signup, signup)

router.post('/signin', AuthValidator.signin, signin)

router.get('/getquiz', getQuiz)

router.post('/getcurrentquiz', getcurrentquiz)

router.post('/getcurrentquestions', getCurrentQuestions)


  export default router;