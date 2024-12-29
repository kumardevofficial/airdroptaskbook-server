import express from 'express';
import controllers from '../Controller/AirdropController.js';


const router = express.Router();

router.post("/airdropform", controllers.airdropController);
router.get("/showAirdrop", controllers.showAirdrop);

export default router;
