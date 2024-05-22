import { Router } from 'express';
import TeamRouter from './Team.routes';
import UserRouter from './User.routes';
import MatchRouter from './Match.routes';
import LeaderboardRouter from './Leaderboard.routes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
