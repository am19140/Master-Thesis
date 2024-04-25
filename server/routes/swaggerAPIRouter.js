import express from 'express';
const router = express.Router();
import getRooms from '../controllers/swaggerAPIController.js';

// endpoints
router.get('/rooms/all_data', getRooms);

export default router;