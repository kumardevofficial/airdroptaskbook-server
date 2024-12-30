import express from 'express'
import { galxeairdropController, showGalxeAirdrop } from '../Controller/GalxeController.js';


const router = express.Router();

router.post("/galxeairdropform", galxeairdropController);
router.get("/showgalxeairdrop", showGalxeAirdrop);

export default router;