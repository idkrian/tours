const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours/:id', (req,res) => {
    const {id} = req.params
    const tour = tours[id]

    if(id > tours.length){
        return res.status(404).json({
            status: 'failure',
            message: "This ID doesn't exist"
        })
    }else{
        return res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }
})

app.post('/api/v1/tours', (req,res) => {
    const newId = tours[tours.length -1].id + 1
    const newTour = {id: newId, ...req.body}
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data:{
                tour: newTour
            }
        })
    })

})

app.post('/', (req,res) => {
    res.send()
})

app.listen(port, (req,res) => {
    console.log(`Running on port ${port}`)
})
