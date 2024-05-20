import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatch from '../../Interfaces/Matches/IMatch';

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<IMatch>>('matches', {
            id: {
                type: DataTypes.INTEGER, 
                allowNull: false, 
                autoIncrement: true, 
                primaryKey: true, 
            }, 
            homeTeamId: {
                type: DataTypes.INTEGER, 
                field: 'home_team_id',
            }, 
            homeTeamGoals: {
                type: DataTypes.INTEGER, 
                field: 'home_team_goals',
            },
            awayTeamId: {
                type: DataTypes.INTEGER, 
                field: 'away_team_goals',
            },
            awayTeamGoals: {
                type: DataTypes.INTEGER, 
                field: 'away_team_goals',
            },
            inProgress: {
                type: DataTypes.BOOLEAN,
            }            
        })
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('matches');
    }
}