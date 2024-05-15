import { Router } from 'express';
import TeamRouter from './Team.routes';

const router = Router();

router.use('/teams', TeamRouter);

export default router;
