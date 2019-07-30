const mongoose=require('mongoose');
const joi=require('joi');

const SessionSchema=new mongoose.Schema({

name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:225
},
age:{
    type:Number,
    required:true
},
mobile1:{
    type:String,
    required:true,
    unique:true
},
mobile2:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    required:true,
    unique:true,
    maxlength:225
}

});

const Session=mongoose.model('Session',SessionSchema);

function validate(session) {
    
const schema={
  
   name:joi.string().required().max(225).min(5),
   age:joi.number().positive().required(),
   mobile1:joi.string().required().length(11).trim(),
   mobile2:joi.string().required().length(11).trim(),
   email:joi.string().required().trim().email({minDomainAtoms:2})
    }

    return joi.validate(session,schema);
};

module.exports.Session=Session;
module.exports.validate=validate;