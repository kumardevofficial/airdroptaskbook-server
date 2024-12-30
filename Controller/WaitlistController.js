import WaitlistAirdrop from "../Model/WaitlistSchema.js";

const waitlistairdropController = async (req, res) => {
  try {
    const { projectName, logoUrl, projectLink } = req.body;

    if (!projectName || !logoUrl || !projectLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGalxeAirdrop = new WaitlistAirdrop({ projectName, logoUrl, projectLink });
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

const showWaitlistAirdrop = async (req, res) => {
  try {
    const waitlistairdrops = await WaitlistAirdrop.find(); 
    res.json(waitlistairdrops);
  } catch (err) {
    res.status(500).json({ message: "Error fetching airdrops", error: err.message });
  }
}

export  {waitlistairdropController, showWaitlistAirdrop};