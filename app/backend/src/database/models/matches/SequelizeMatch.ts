import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '..';
import SequelizeTeams from '../teams/SequelizeTeams';

class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },

}, {
  sequelize: db,
  modelName: 'MatchModel',
  tableName: 'matches',
  timestamps: false,
});

SequelizeMatch.belongsTo(SequelizeTeams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatch.belongsTo(SequelizeTeams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

SequelizeTeams.hasMany(SequelizeMatch, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

SequelizeTeams.hasMany(SequelizeMatch, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});
/**
        * `Workaround` para aplicar as associations em TS:
        * Associations 1:N devem ficar em uma das instâncias de modelo
        * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default SequelizeMatch;
