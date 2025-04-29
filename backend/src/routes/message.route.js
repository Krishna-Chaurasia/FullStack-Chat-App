import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, getMessages ,sendMessage} from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users',protectRoute, getUsersForSidebar);
router.get('/:id',protectRoute, getMessages); // get user by id, here id is dynamic parameter
router.post('/send/:id', protectRoute, sendMessage); // send message to user by id, here id is dynamic parameter

export default router;