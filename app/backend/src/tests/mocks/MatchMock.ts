export const mockfindAllMatches = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    }
  ]

  export const matchesInProgress = [
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]

  export const finishedMatches = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    },
    {
      "id": 3,
      "homeTeamId": 4,
      "homeTeamGoals": 3,
      "awayTeamId": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Corinthians"
      },
      "awayTeam": {
        "teamName": "Napoli-SC"
      }
    },
  ]

  export const responseInProgressFalse = {
    status: 'SUCCESSFUL', 
    data: finishedMatches,
  }

  export const finishMatch = [
    {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  }
  ]

  export const matchFinished = { homeTeamGoals: 1, awayTeamGoals: 1 }

  export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNjI1ODI3NCwiZXhwIjoxNzE2MjcyNjc0fQ.yd7AFhd4d3gGs-4XeWu-qWNsDQkp_HblADeLR1MPm6A";
   
  export const invalidToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNjI1ODI3NCwiZXhwIjoxNzE2MjcyNjc0fQ.yd7AFhd4d3gGs-4XeWu-qWNsDQkp";

  export const validUser = {
        email: 'user@user.com',
        role: 'user',    
  }

 export const invalidUser = {
        email: 'user@user.com',
        role: 'admin',    
  }

  export const createdMatch = {
    "id": 50,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 2,
    "inProgress": true
  }

  export const matchCreated = {
    status: 'SUCCESSFUL',
    data: createdMatch,
  }



