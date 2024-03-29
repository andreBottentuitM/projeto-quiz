import prisma from '../libs/prisma'

export const getQuiz = async (req:any, res:any) => {

    const quizzes = await prisma.quiz.findMany({
        
      }).then(quiz => {
        quiz.forEach(value => {
          value.image = `http://localhost:5000/media/${value.image}`
        })
       return quiz
      })

      res.send(quizzes)

}

export const getcurrentquiz = async (req:any, res:any) => {

  let currentQuiz = req.body.name
    
  const quiz = await prisma.quiz.findFirst({
    where:{
      name:currentQuiz
    }
  }).then((quiz: any) => {
    quiz.name = quiz.name[0].toUpperCase() + quiz.name.substring(1)
    quiz.image = `http://localhost:5000/media/${quiz.image}`
    return quiz
  })
  
  res.send(quiz)
  
}

export const getCurrentQuestions = async (req:any, res:any) => {

  let currentQuiz = req.body.name
    
  const quiz = await prisma.quiz.findFirst({
    where:{
      name:currentQuiz
    }
  }).then((quiz: any) => {
    return quiz.id
  })

  const questions = await prisma.question.findMany({
    where:{
      quizId:quiz
    },
    select: {
      correct:false,
      id: true,
      quizId: true,
      numero: true,
      question: true,
      alternativeA: true,
      alternativeB: true,
      alternativeC: true,
      alternativeD: true,
      quiz: true
    }
  }).then((quiz: any) => {
    return quiz
  })

  res.send(questions)
  
}