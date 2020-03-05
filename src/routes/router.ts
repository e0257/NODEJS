import express from 'express';
import { authRouter } from './authRouter';
import { groupRouter } from './groupRouter';
import { userRouter } from './userRouter';

export const router = express.Router();

router.use('/login', authRouter);
router.use('/user', userRouter);
router.use('/group', groupRouter);
