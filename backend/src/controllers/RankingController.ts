import prisma from '../libs/prisma'

export const setTime = async (req:any, res:any) => {

    let quiz = req.body.quiz
    let userId = req.body.userId
    let time = (Date.now() + 601000).toString()
       
    console.log(quiz)
        const alreadyUser = await prisma.ranking.findFirst({
            where:{
                userId: userId,
                quiz: quiz
            } as any
        })

        console.log(alreadyUser)

        if(!alreadyUser){
            const setTime = await prisma.ranking.create({
                data:{
                    userId: userId,
                    quiz: quiz,
                    limitTime: time
                } as any
            })
        }

        const getTime = await prisma.ranking.findFirst({
            where:{
                userId: userId
            } as any
        })

        res.send(getTime)

    
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
      const result = await setDuration(userId, currentQuiz)
      res.send(result)

}


const setPoints = async (points:any, userId:number, currentQuiz:any) => {

  const id = await prisma.ranking.findFirst({
    where:{
      userId: userId,
      quiz: currentQuiz
    } as any
  }).then((id: any)=> {
     return id.id
  })

    console.log(userId)
    await prisma.ranking.update({
      where: {
        id: id
      }as any,
      data: {
         ponctuation: points
      }
    })
  
   
}

const setDuration = async (userId:any, currentQuiz:any) => {

    const limitTime = await prisma.ranking.findFirst({
      where:{
        userId: userId,
        quiz: currentQuiz
      } as any
    }).then((id: any)=> {
       return id.limitTime
    })
    let timeLeft = parseFloat(limitTime) - Date.now()
    let time = (601000 - timeLeft)
    let timeMinutesFormat:any
    if(timeLeft > 0){
      let minutes = Math.floor(time / 60000).toString()
      let seconds:any = ((time % 60000) / 1000).toString().split('.')[0]
      minutes = minutes.length === 1 ? `0${minutes}` : minutes
      seconds = seconds.length === 1 ? `0${seconds}` : seconds
      timeMinutesFormat = `${minutes}:${seconds}`
     }

     const id = await prisma.ranking.findFirst({
      where:{
        userId: userId,
        quiz: currentQuiz
      } as any
    }).then((id: any)=> {
       return id.id
    })

     const userResult = await prisma.ranking.update({
      where: {
        id: id
      }as any,
      data: {
         duration: timeMinutesFormat
      }
    }).then((id:any) => {
      return id
    })

    return userResult
  
}

export const getPage = async (req:any, res:any) => {
  let selected = req.body.selected
  let perPage = req.body.rowsPerPage
  let page = req.query.page
  let offSet = 0

  if(page){
    offSet = (parseInt(page) - 1) * perPage
  }


  let listRanking:any = {
    count:0,
    list: []
  }

  const list = await prisma.ranking.findMany({
    skip: offSet,
    take: perPage,
    where:{
      quiz: selected
    } as any,
    orderBy: [{
       ponctuation: 'desc'
    },
     {  
       duration: 'asc'
    }],
    
  }).then((id: any)=> {
    let index = perPage - 1
    id.forEach((user:any)=> {
      let ranking = page * perPage - index

      index -= 1
      console.log(ranking)
      listRanking.list.push({
        score: user.ponctuation,
        id: user.userId,
        duration: user.duration,
        ranking: ranking
      })
    })
  })

  const users = await prisma.user.findMany().then((user: any)=> {
     return user
  })

  listRanking.list.forEach((item: any) => {
    users.forEach((user:any) => {
      if(item.id === user.id){
        item['name'] = user.name
        item['image'] = `http://localhost:5000/media/${user.image}`
      }
    })
  })

  await prisma.ranking.count({
    where: {
      quiz: selected
    },
  }).then((count:any) => {
    listRanking.count = count
  }) 

  res.send(listRanking)

}


