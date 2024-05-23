import express from 'express';
const router = express.Router();
import getRoomsPerFloor from '../controllers/roomSelectionController.js';


router.get('/selection', getRoomsPerFloor);

export default router;