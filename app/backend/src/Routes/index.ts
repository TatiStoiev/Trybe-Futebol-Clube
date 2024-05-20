import { Router } from 'express';
import TeamRouter from './Team.routes';
import UserRouter from './User.routes';
import MatchRouter from './Match.routes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);

export default router;
