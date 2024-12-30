import GalxeAirdrop from "../Model/GalxeSchema.js";

const galxeairdropController = async (req, res) => {
  try {
    const { projectName, logoUrl, projectLink } = req.body;

    if (!projectName || !logoUrl || !projectLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGalxeAirdrop = new GalxeAirdrop({ projectName, logoUrl, projectLink });
    const savedAirdrop = await newGalxeAirdrop.save();

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

const showGalxeAirdrop = async (req, res) => {
  try {
    const galxeairdrops = await GalxeAirdrop.find(); 
    res.json(galxeairdrops);
  } catch (err) {
    res.status(500).json({ message: "Error fetching airdrops", error: err.message });
  }
}

export {galxeairdropController, showGalxeAirdrop};