import express from 'express'
import { createUser, deleteUser,  getUsers, updateUser } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser)

router.get('/', protect, getUsers); // now protected
export default router;

