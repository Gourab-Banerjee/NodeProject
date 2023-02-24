const mongoose=require('mongoose')
const adminSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lasstName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
    },
    {
    timestamps:true,
    versionKey:false,
}
)

module.exports=new mongoose.model('adminLogReg',adminSchema)