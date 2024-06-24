import express from 'express';
const router = express.Router();
import {getRoomsPerFloor, getRoomTemp} from '../controllers/roomSelectionController.js';
import { submitFeedback } from '../controllers/feedbackController.js';

router.get('/selection', getRoomsPerFloor);
router.get('/room_temp/:roomId',getRoomTemp);
router.post('/submission',submitFeedback);

export default router;