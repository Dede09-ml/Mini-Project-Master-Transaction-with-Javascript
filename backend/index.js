const express = require('express')
const app = express()
const PORT = 8282
const bodyParser = require('body-parser')
const cors = require('cors')
//konfigurasi database
global.config = require('./config/dbconfig')

var corsOption = {
    origin : "http://localhost:8600"
} 

app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

require('./service/relationService')(app, global.config.pool)
require('./service/cariDokterService')(app, global.config.pool)
require('./service/caraBayarService')(app, global.config.pool)
require('./service/pasienService')(app, global.config.pool)


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})