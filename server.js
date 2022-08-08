const express= require("express")
const app =express()
const {PORT}=require('./configs/config')
const cors = require('cors')
const path= require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || PORT

//route file
const user = require("./routes/userRoute")
const feed = require("./routes/feedRoute")

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use(express.static(path.join(__dirname,'public')))

//route
app.use('/user',user)
app.use('/feed', feed)

app.listen(port, ()=> console.log(`Server listening on PORT ${port}`))