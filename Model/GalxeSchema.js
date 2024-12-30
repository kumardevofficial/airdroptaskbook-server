import mongoose from 'mongoose'

const GalxeAirdropSchema = new mongoose.Schema({
  projectName : {type : String, required : true},
  logoUrl : {type : String, required : true},
  projectLink : {type: String, required:true}
})

const GalxeAirdrop = mongoose.model("GalxeAirdrop", GalxeAirdropSchema);
export default GalxeAirdrop;