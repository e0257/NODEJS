import express from 'express';

import groupController from '../controllers/groupController';

const router = express.Router();

router.post('/', groupController.createGroup);
router.put('/',  groupController.updateGroup);
router.get('/all', groupController.getAllGroups);
router.post('/addUsers', groupController.addUsersToGroup);
router.get('/:id', groupController.getGroupById);
router.delete('/:id', groupController.deleteGroup);

export const groupRouter = router;
