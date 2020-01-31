import express from 'express';

import groupController from '../controllers/groupController';

const router = express.Router();


router.post('/', groupController.createGroup);
router.put('/',  groupController.updateGroup);
router.get('/all', groupController.getAllGroups);
router.get('/:id', groupController.getGroup);
router.delete('/:id', groupController.deleteGroup);

export const groupRouter = router;
