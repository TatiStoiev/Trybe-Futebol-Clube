export type TeamsType = {
  id: number,
  teamName: string,
};

export type UsersType = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
};

export type MatchesType = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
};
