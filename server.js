 const express= require('express');
 const app= express();
 const expressLayouts= require('express-ejs-layouts')
 const bodyparser= require('body-parser')
 const methodOverride= require('method-override')

 const indexRouters= require('./routes/index')
 const authorRouters= require('./routes/authors')
 const bookRouters= require('./routes/books')

 app.set('view engine', 'ejs')
 app.set('views', __dirname + '/views')
 app.set('layout','./layouts/layout')
 app.use(expressLayouts)
 app.use(methodOverride('_method'))
 app.use(express.static('public'))
 app.use(bodyparser.urlencoded({limit:'10mb', extended:false}))

 const mongoose= require('mongoose')
 mongoose.connect("mongodb://127.0.0.1:27017/mybrary",{useNewUrlParser:true},{useUnifiedTopology:true}).then(()=>{
   console.log('Connected with Mongodb')
}).catch((err)=>{
   console.log(err)
})

 app.use('/',indexRouters)
 app.use('/authors',authorRouters)
 app.use('/books',bookRouters)

 app.listen(process.env.PORT || 3000)