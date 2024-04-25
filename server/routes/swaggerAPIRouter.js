import express from 'express';
const router = express.Router();
import getRooms from '../controllers/swaggerAPIController.js';

router.get('/rooms', getRooms);

export default router;