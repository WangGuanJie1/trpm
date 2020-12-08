const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/trpm'

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify',false)
mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})
mongoose.connection.on('error',(error) => {
  console.log('Database connection failed',error)
})

module.exports = mongoose
