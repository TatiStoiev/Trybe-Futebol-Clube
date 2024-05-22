import { Request, Router, Response } from 'express';
import calculateTeamPerformance from '../utils/Leaderboard';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', async (req: Request, res: Response) => {
  const allMatches = await calculateTeamPerformance();
  res.status(200).json(allMatches);
});

export default LeaderboardRouter;
