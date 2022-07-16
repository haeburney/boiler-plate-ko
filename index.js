const express = require('express') 
const app = express() 
const port = 5000 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded -> 이렇게 된 데이터를 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({extended: true}));
//클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는 것 
//application/json -> 분석해서 가져올 수 있게 해주는 것 
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! backend로 run')
})

app.post('/register', (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다.
  //정보를 데이터베이스에 넣기 위해서는 
  const user = new User(req.body)

  
//save -> 몽고 DB 메서드 
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err})
    return res.status(200).json({
      success:true
    })
  }) 
})

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      //generateToken 은 내 마음대로 이름을 지으면 되는 것
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // 토큰을 저장한다. 어디에 ? 쿠키 or 로컬스토리지 (원하는대로)
          res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
      })
    })

  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

