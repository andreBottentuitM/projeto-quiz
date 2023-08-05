import {Router} from 'express';
import {AuthValidator} from './validators/AuthValidator'
import {signup,signin} from './controllers/AuthController'
import {getQuiz, getcurrentquiz, getCurrentQuestions} from './controllers/QuizController'
import {setTime, setResponse} from './controllers/RankingController'


const router = Router();

  
router.post('/signup', AuthValidator.signup, signup)

router.post('/signin', AuthValidator.signin, signin)

router.get('/getquiz', getQuiz)

router.post('/getcurrentquiz', getcurrentquiz)

router.post('/getcurrentquestions', getCurrentQuestions)

router.post('/settime', setTime)

router.post('/setresponse', setResponse)


  export default router;