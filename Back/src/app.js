const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

const seriesController = require('./controllers/seriesController.js')

seriesController.rotas(app)

module.exports = app