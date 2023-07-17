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

