import prisma from '../libs/prisma'

export const setTime = async (req:any, res:any) => {

    let quiz = req.body.quiz
    let userId = req.body.userId
    let time = (Date.now() + 601000).toString()
       

    if(quiz == 'react'){
        const alreadyUser = await prisma.reactRanking.findFirst({
            where:{
                userId: userId
            } as any
        })

        if(!alreadyUser){
            const setTime = await prisma.reactRanking.create({
                data:{
                    userId: userId,
                    limitTime: time
                } as any
            })
        }

        const getTime = await prisma.reactRanking.findFirst({
            where:{
                userId: userId
            } as any
        })

        res.send(getTime)

    }
}

export const setResponse = async (req:any, res:any) => {

    let currentQuiz = req.body.nameQuiz.toLowerCase()
    let userId = req.body.userId

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
        }
      }).then((quiz: any) => {
        return quiz
      })

      let answers = req.body.answers
      let points = 0
      
      answers.forEach((response:any) => {
        questions.forEach((data: any) => {
            if(response.numero === data.numero){
                if(response.answer === data.correct){
                   points += 1
                }
            }
          })
      })
      console.log(points)
      setPoints(points, userId, currentQuiz)
      setDuration(userId, currentQuiz)

}


const setPoints = async (points:any, userId:number, currentQuiz:any) => {
  if(currentQuiz === 'react'){
    console.log(userId)
    await prisma.reactRanking.update({
      where: {
        userId: userId
      },
      data: {
         ponctuation: points
      }
    })
  }
   
}

const setDuration = async (userId:any, currentQuiz:any) => {

  if(currentQuiz === "react"){
    const limitTime = await prisma.reactRanking.findUnique({
      where:{
        userId: userId
      }
    }).then((id: any)=> {
       return id.limitTime
    })
    let timeLeft = parseFloat(limitTime) - Date.now()
    let time:any = 601000 - timeLeft

    if(timeLeft > 0){
      let minutes = Math.floor(time / 60000).toString()
      let seconds:any = ((time % 60000) / 1000).toString().split('.')[0]
      minutes = minutes.length === 1 ? `0${minutes}` : minutes
      seconds = seconds.length === 1 ? `0${seconds}` : seconds
      time = `${minutes}:${seconds}`
     }

     await prisma.reactRanking.update({
      where: {
        userId: userId
      },
      data: {
         duration: time
      }
    })

  }
  
}


