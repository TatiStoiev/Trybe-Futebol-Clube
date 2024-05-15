export const teams = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
  ]

  export const mockfindAll = {
    status: 200, 
    data: teams
  }

  export const mockTeam = {
    "id": 1,
    "teamName": "Avaí/Kindermann"
}
  export const mockFindById = {
    status: 200,
    data:mockTeam
  }

  export const mockTeamIdNotFound = { 
    status: 'NOT_FOUND', 
    data: { message: 'Team not found'} 
  }
