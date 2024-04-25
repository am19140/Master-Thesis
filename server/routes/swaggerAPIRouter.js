import express from 'express';
const router = express.Router();
import getRooms from '../controllers/swaggerAPIController.js';
import getRoomsPerFloor from '../controllers/roomSelectionController.js';

router.get('/rooms', getRooms);
router.get('/selection', getRoomsPerFloor);

export default router;