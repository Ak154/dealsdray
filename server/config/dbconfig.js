const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

connection.on('connected', ()=>{
    console.log('mongodb is connected')
})

connection.on('Error',(error)=>{
    console.log("Error in mongodb connection",error)
})

module.exports = mongoose;