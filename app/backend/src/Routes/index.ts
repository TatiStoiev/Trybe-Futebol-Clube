import { Router } from 'express';
import TeamRouter from './Team.routes';
import UserRouter from './User.routes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);

export default router;
