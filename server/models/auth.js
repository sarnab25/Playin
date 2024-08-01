import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    email:
    {
        type:String,
        require:true,
    },
    name:{
        type:String,
    },
    desc :
    {
        type:String,
    },
    joinedOn:
    {
        type:Date,
        default:Date.now,
    },
    phoneNumber:
    {
        type:Number,
        require:true
    }
})

export default mongoose.model("User", userSchema);