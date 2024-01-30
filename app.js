const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')

app.use(express.json())
app.use('/api/v1', router)

app.get('/', () => {
    console.log("Hello World")
})

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
})