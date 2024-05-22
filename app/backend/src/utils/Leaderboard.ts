import MatchModel from '../database/models/matches/MatchModel';
import { IMatchInstance } from '../Interfaces/Leaderboard/IMatchInstance';
import TeamModel from '../database/models/teams/TeamModel';
import ITeams from '../Interfaces/Teams/ITeams';
import { ITeamsInstance } from '../Interfaces/Leaderboard/ITeamsInstance';
import MatchesInfo from '../Interfaces/Leaderboard/MatchesInfo';
import TeamPerformance from '../Interfaces/Leaderboard/TeamPerformance';

const matchModel = new MatchModel();
const teamModel = new TeamModel();

// preciso verificar o desempenho dos times somente quando eles estão jogando em casa, ou seja, são

// 1- Recuperar as partidas e separar as informações que eu preciso de cada partida

export async function getAllMatches(): Promise<MatchesInfo[]> {
  const result = await matchModel.findAll() as IMatchInstance[];
  const allMatches = result.map((match) => {
    const plainMatch = match.toJSON();
    return {
      homeTeamId: plainMatch.homeTeamId,
      homeTeamGoals: plainMatch.homeTeamGoals,
      awayTeamGoals: plainMatch.awayTeamGoals,
    };
  });
  return allMatches;
}

// 2- pegar todos os times e colocar em uma variável
export async function getAllTeams(): Promise<ITeams[]> {
  const result = await teamModel.findAll() as ITeamsInstance[];
  const allTeams = result.map((team) => {
    const plainTeam = team.toJSON();
    return {
      id: plainTeam.id,
      teamName: plainTeam.teamName,
    };
  });
  return allTeams;
}

// 3- para cada time preciso percorrer todas as partidas verificando se ele é o time da casa, se ele for, eu aplico as regras abaixo
// calcular total de pontos de cada time
// time vitorioso +3 pontos
// time perdedor 0 pontos
// empate os dois times +1 ponto

function calculateTotalPoints(matches: MatchesInfo[]): number {
  return matches.reduce((totalPoints, match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return totalPoints + 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      return totalPoints + 1;
    }
    return totalPoints;
  }, 0);
}

function calculateTotalVictories(matches: MatchesInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
}

function calculateTotalDraws(matches: MatchesInfo[]): number {
  return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

function calculateGoalsFor(matches: MatchesInfo[]): number {
  return matches.reduce((total, match) => total + match.homeTeamGoals, 0);
}

function calculateGoalsOwn(matches: MatchesInfo[]): number {
  return matches.reduce((total, match) => total + match.awayTeamGoals, 0);
}

async function catchTeamsInfo(team: ITeams, allMatches: MatchesInfo[]):
Promise<TeamPerformance> {
  const homeMatches = allMatches.filter((match) => match.homeTeamId === team.id);
  const totalPoints = calculateTotalPoints(homeMatches);
  const totalGames = homeMatches.length;
  const totalVictories = calculateTotalVictories(homeMatches);
  const totalDraws = calculateTotalDraws(homeMatches);
  const totalLosses = totalGames - totalVictories - totalDraws;
  const goalsFavor = calculateGoalsFor(homeMatches);
  const goalsOwn = calculateGoalsOwn(homeMatches);
  return { name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
  };
}

export default async function calculateTeamPerformance() {
  const allMatches = await getAllMatches();
  const allTeams = await getAllTeams();

  const teamPerformancesPromises: Promise<TeamPerformance>[] = allTeams
    .map((team) => catchTeamsInfo(team, allMatches));

  const teamPerformances = await Promise.all(teamPerformancesPromises);

  return teamPerformances;
}

// calcular aproveitamento do time com 2 casas decimais
// [total pontos / (total jogos *3)] * 100

// saldo de gols
// GP gols a favor
// GC gols sofridos

// considerar apenas partidas finalizadas!
// resultado da classificação sera baseado no total de pontos

// goalsBalance = goalsFavor - goalsOwn
