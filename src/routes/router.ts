import express from 'express';
import userController from '../controllers/userController';
import {createValidator} from 'express-joi-validation';
import {userSchema} from '../validation-schemas';

const validator = createValidator({passError: true});
const router = express.Router();


router.get('/user/filter', userController.getAutoSuggestUsers); // ?substr=er&&limit=5
router.get('/user/:id', userController.getUser);
router.post('/user', validator.body(userSchema), userController.createUser);
router.put('/user', validator.body(userSchema), userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export default router;

