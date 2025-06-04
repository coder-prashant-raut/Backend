import express from 'express'
import { createUser, deleteUser,  getUsers, updateUser } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/users', createUser);
router.get('/users',protect, getUsers)  ; // add protect
 // now protected
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser)


export default router;

