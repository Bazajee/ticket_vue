import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const app = express()
const prisma = new PrismaClient()



let userData = [

   { 
      email: 'admin@mail.fr', 
      admin: true, 
      password: "$2y$10$Cm8Zld9DA83.PVFi4MMV2.3VL5h58gCgO8.DMigzFdT0sAzsUreG2"
   } ,

   { 
      email: 'jc@mail.fr', 
      admin: false, 
      password: "$2y$10$Cm8Zld9DA83.PVFi4MMV2.3VL5h58gCgO8.DMigzFdT0sAzsUreG2"
   },

]



app.use(express.json())


app.get('/api/tickets', async (req, res) => {
   const ticketsList = await prisma.ticket.findMany({})
   console.log("lsl")
   res.send(ticketsList)
})

app.post('/api/ticket', async (req, res) => {
   const ticket = await prisma.ticket.create({
      data: req.body
   })
   console.log('created', ticket)
   res.send(ticket)
})

app.get ('/api/ticket/:id', async (req, res) => {
   const urlId = req.params.id
   const ticket = await  prisma.ticket.findUnique({
      where: {
         id: parseInt(urlId)
      }
   })
   res.send(ticket)

})

app.post('/api/auth', async (req, res) =>{
   const data = req.body

   let userObject =  'null'
   userObject = userData.find( user => user.email === data.email)

   const compare = await bcrypt.compare(data.pwd, userObject.password)

   res.send(userObject)
})

app.listen(3000, function() {
   console.log('listening to port 3000')
})



