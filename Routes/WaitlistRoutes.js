import express from 'express'
import {waitlistairdropController, showWaitlistAirdrop} from '../Controller/WaitlistController.js';

const router = express.Router();

router.post("/waitlistairdropform",waitlistairdropController);
router.get("/showwaitlistairdrop", showWaitlistAirdrop);

export default router;