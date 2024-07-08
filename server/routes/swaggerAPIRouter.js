import express from 'express';
const router = express.Router();
import {getRoomsPerFloor, getRoomTemp} from '../controllers/roomSelectionController.js';
import { submitFeedback, getAveragePerception } from '../controllers/feedbackController.js';

router.get('/selection', getRoomsPerFloor);
router.get('/room_temp/:roomId',getRoomTemp);
router.post('/submission',submitFeedback);
router.get('/feedback/:roomId/:userfeedback?', getAveragePerception);

export default router;