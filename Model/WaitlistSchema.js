import mongoose from 'mongoose'

const WaitlistAirdropSchema = new mongoose.Schema({
  projectName : {type : String, required : true},
  logoUrl : {type : String, required : true},
  projectLink : {type: String, required:true}
})

const  WaitlistAirdrop = mongoose.model("WaitlistAirdrop", WaitlistAirdropSchema);
export default  WaitlistAirdrop;