var express = require ('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var crypto = require('crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.set('view engine','ejs');
app.set('/views','views');
app.use(express.static(__dirname + '/public'));

//define models
const User = mongoose.model('User',{
  username:String, 
  password: String
})


//connect Mongodb
var dbUrl='mongodb://hanhle0298:h%40nh0298@cluster0-shard-00-00-mq079.mongodb.net:27017,cluster0-shard-00-01-mq079.mongodb.net:27017,cluster0-shard-00-02-mq079.mongodb.net:27017/User?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbUrl , (err) => { 
  console.log('mongodb connected',err);
})

app.get('/',(req,res)=>res.render('index.ejs', {page: 'register'}));
app.get('/register', (req, res) => {
  res.render('index.ejs', {page: 'register'});
});
app.get('/Login', (req, res) => {
  res.render('index.ejs', {page: 'Login'});
});


//User connect
io.on('connection', function(socket){
  console.log('new user is connecting.....');
  //register
  socket.on('register', (infor)=>{
    var newUser = new User(infor);    
    try {
      if(User.findOne({username:newUser.username})!=null){
        socket.emit('fail-register');
      }
      else{
        newUser.password= crypto.createHash("sha256").update(newUser.password).digest("hex");
        newUser.save();
        app.render('index.ejs', {page: 'Home'});
      }
    } catch (error) {
      console.log('Error:'+error)
    }
    
  })
    //Login
    socket.on('login',(infor)=>{
      var thisUser = new User(infor);
          thisUser.password= crypto.createHash("sha256").update(thisUser.password).digest("hex");
         
      try {
        if((User.findOne({username:thisUser.username})._conditions.password)==thisUser.password){    
          app.render('index.ejs', {page: 'Home'});
        }
        else{
          socket.emit('fail-login');        
        }
      } catch (error) {
        console.log('Error:'+error)
      }  
    })
  socket.on('Client-send-message',(data)=>{
    socket.emit('server-send-message-to-the-host',data);
    socket.broadcast.emit('server-send-message-to-users',data);
  });
  
})




server.listen(3000,()=> console.log('server is running at http://localhost:3000'))
