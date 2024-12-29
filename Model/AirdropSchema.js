import mongoose from 'mongoose'

const AirdropSchema = new mongoose.Schema({
  projectName : {type : String, required : true},
  logoUrl : {type : String, required : true},
  projectLink : {type: String, required:true}
})

const Airdrop = mongoose.model("Airdrop", AirdropSchema);
export default Airdrop;