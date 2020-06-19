var express = require('express');
var app = express();
var multer = require("multer")
const bodyParser = require('body-parser')
app.use(bodyParser.json())   //在其他路由中间件前（尽可能靠前，以能够通过bodyPaser获取req.body）
app.use(bodyParser.urlencoded({ extended: false})) // 调试工具如果出现警告请加上extended: false


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage })

const path = require('path');
app.use(express.static('public'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
    });

app.post('/',upload.single('record') ,function (req, res) {
//   res.send('Hello World!');
  console.log(req.file);  // 上传的文件信息
  console.log(req.body)
  res.send('./uploads/'+req.file.filename)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});