const express = require("express")
const path = require("path")

const app = express()

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
    
    res.status(200).send(students)
})

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '47d062611242441b9b9670fe7d98db55',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => {console.log(`Take us to warp ${port}`)})