import express from 'express'
import { createUser, deleteUser, getUsers, updateUser, getme } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/authorizeMiddleware.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users',protect, getUsers)  ; // add protect
 // now protected

router.put('/users/:id',protect, authorize('admin'), updateUser);
router.delete('/users/:id',protect, authorize('admin'), deleteUser);


router.get('/me', protect, getme)

export default router;

