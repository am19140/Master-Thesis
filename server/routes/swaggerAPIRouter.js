import express from 'express';
const router = express.Router();
import {getRoomsPerFloor, getRoomTemp} from '../controllers/roomSelectionController.js';

router.get('/selection', getRoomsPerFloor);
router.get('/room_temp/:roomId',getRoomTemp);

export default router;