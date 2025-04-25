import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import Fruit from './models/fruit.mjs'
import Fruits from './routes/fruits.mjs'

const app = express()
const port = process.env.PORT || 3000

// Middleware 
app.use(express.urlencoded())
app.use(express.json())



mongoose.connect(process.env.ATLAS_URI)
mongoose.connection.once('open', ()=> {
    console.log('connected to mongoDB')
})


app.get('/',(req, res)=>{
    res.send('Welcome to the Fruits API!')
})

app.get('/fruits/seed', async (req, res)=>{
    try {
        await Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ])
        res.redirect('/fruits')
    } catch (error) {
        console.error(error)
      }
})


app.use('/fruits', Fruits )



app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });


app.listen(port, () =>{
console.log(`Server is running on port ${port}`)
})