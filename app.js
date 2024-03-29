const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app=express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.static('public')); //public folder to list all images //
app.use(expressLayouts);


app.use(cookieParser('WorkUpSecure'));
app.use(session({
  secret: 'WorkUpSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout','./layouts/main');
app.set('view engine','ejs');

const routes=require('./server/routes/workRoutes.js')
app.use('/',routes);
app.set("port",PORT)
app.listen(PORT,()=> console.log(`Listening to ${PORT}`));

