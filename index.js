const express = require('express') //express modules를 가져온다.
const app = express() //function을 이용해서 새로운 express 앱을 만들고
const port = 5000 //4000 해도 되고, 5000번 해도 된다.

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyewonkim:kim2841@cluster0.38bvqlk.mongodb.net/?retryWrites=true&w=majority', {
  //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})