import Airdrop from "../Model/AirdropSchema.js";

const airdropController = async (req, res) => {
  try {
    const { projectName, logoUrl, projectLink } = req.body;

    if (!projectName || !logoUrl || !projectLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAirdrop = new Airdrop({ projectName, logoUrl, projectLink });
    const savedAirdrop = await newAirdrop.save();

    res.status(201).json({
      message: "Airdrop saved successfully",
      data: savedAirdrop,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error saving airdrop",
      error: err.message,
    });
  }
};

const showAirdrop = async (req, res) => {
  try {
    const airdrops = await Airdrop.find(); 
    res.json({ message: "Fetched airdrops successfully", data: airdrops });
  } catch (err) {
    res.status(500).json({ message: "Error fetching airdrops", error: err.message });
  }
}

export default {airdropController, showAirdrop};