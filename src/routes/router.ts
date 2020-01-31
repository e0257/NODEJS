import express from 'express';
import { groupRouter } from './groupRouter';
import { userRouter } from './userRouter';

export const router = express.Router();

router.use('/user', userRouter);
router.use('/group', groupRouter);


