const mongoose=require('mongoose') 
const FeuilledecalculsanstitreSchema = mongoose.Schema({first_name : {type:String}, 
last_name : {type:String}, 
company_name : {type:String}, 
city : {type:String}, 
address : {type:String}, 
county : {type:String}, 
email : {type:String}, 
phone : {type:String}, 
postal : {type:String}, 
web : {type:String}, 
}) 
module.exports=mongoose.model("Feuilledecalculsanstitre",FeuilledecalculsanstitreSchema)