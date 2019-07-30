const router=require('express').Router();
const {Session,validate}=require('../models/session');
const _=require('lodash');

router.get('/',async(req,res)=>{
const session=await Session.find().select('-_id -__v');
res.send(session);
});

router.get('/:id',async(req,res)=>{
const session=await Session.findById(req.params.id);
if(!session) return res.send('Not Found Of ID');
res.send(session);
});

router.delete('/:id',async(req,res)=>{
    const session=await Session.findByIdAndDelete(req.params.id);
    if(!session) return res.send('Not Found Of ID');
    res.send(session);
});

router.post('/',async(req,res)=>{
const {error}=validate(req.body);
if(error) return res.status(404).send(error.details[0].message);

const mobile1=await Session.findOne({mobile1:req.body.mobile1});
if(mobile1) return res.send('The Mobile 1 is Exist !!');

const mobile2=await Session.findOne({mobile2:req.body.mobile2});
if(mobile2) return res.send('The Mobile 2 is Exist !!');


const email=await Session.findOne({email:req.body.email});
if(email) return res.send('The email  is Exist !!');

const session=new Session(_.pick(req.body,[
    'name',
    'age',
    'mobile1',
    'mobile2',
    'email'
]));

await session.save();
res.send(session);


});

router.put('/:id',async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
  /* 
    const mobile1=await Session.findOne({mobile1:req.body.mobile1});
    if(mobile1) return res.send('The Mobile 1 is Exist !!');
    
    const mobile2=await Session.findOne({mobile2:req.body.mobile2});
    if(mobile2) return res.send('The Mobile 2 is Exist !!');
    
    
    const email=await Session.findOne({email:req.body.email});
    if(email) return res.send('The email  is Exist !!');

*/
    const session=await Session.findByIdAndUpdate(req.params.id,_.pick(req.body,[
        'name',
        'age',
        'mobile1',
        'mobile2',
        'email'
    ] ));

    await res.send(session);
    
    
});
module.exports=router;
    