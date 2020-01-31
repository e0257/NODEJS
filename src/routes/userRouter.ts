import express from 'express';
import userController from '../controllers/userController';
import { createValidator } from 'express-joi-validation';
import { userSchema } from '../validation-schemas';

const validator = createValidator({ passError: true });
const router = express.Router();


router.post('/', validator.body(userSchema), userController.createUser);
router.put('/', validator.body(userSchema), userController.updateUser);
router.get('/filter', userController.getAutoSuggestUsers);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;

