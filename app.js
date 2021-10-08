const { readFileSync, writeFile } = require('fs');
const express = require('express')

const app = express()

app.use(express.json())

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello from the server side!',
//         app: 'Natours'
//     })
// })

// app.post('/', (req, res) => {
//     res.send(`You can post to this endpoint...`)
// })

const tours = JSON.parse(readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params)
    let id = req.params.id * 1;
    let tour = tours.find(el => el.id === id)
    console.log(id)
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        'message': 'invalid ID'
      })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    //console.log(req.body)
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newID
    },
        req.body
    )

    tours.push(newTour)

    writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status:"success",
            data: {
                tour: newTour
            }
        })
    })
})

app.patch('/api/v1/tours/:id', (req, res) => {
  if (Number(req.params.id) < tours.length) {
    res.status(200).json({
      status: "success",
      data: {
        tour: '<h1>Updated tour here<h1>'
      }
    })
  }
})

const port = 3000

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
