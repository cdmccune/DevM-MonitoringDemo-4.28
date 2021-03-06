const express = require("express")
const path = require("path")

const app = express()

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
    rollbar.info('file served')
})

app.get('/style', (req,res) => {
    res.sendFile(path.join(__dirname, '../style.css'))
    rollbar.info('css file served')
})

const port = process.env.PORT || 4545

//rollbar extra stuff

app.use(express.json())
let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})


app.use(rollbar.errorHandler())




app.listen(port, () => {console.log(`Take us to warp ${port}`)})