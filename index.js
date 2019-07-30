const express=require('express');
const app=express();
const mongoose=require('mongoose');
const session=require('./routes/session');



app.use(express.json());
app.use('/api/session',session);

mongoose.connect('mongodb://localhost/DB',{ useNewUrlParser: true,useCreateIndex:true })
.then(()=>console.log('DataBase Connected'))
.catch((err)=>console.log('Error'));

const port=process.env.port || 3000;
app.listen(port,()=>console.log('Connected To the Port '+port));

