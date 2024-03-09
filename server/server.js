const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()
const dbConfig = require('./config/dbconfig')
const userRoute = require('./routes/userRoute')

app.use(express.json())
app.use(cors())



app.use('/api/users', userRoute)

const port = process.env.PORT || 5001;

app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});