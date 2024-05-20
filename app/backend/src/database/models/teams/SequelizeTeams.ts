import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '..';
import SequelizeMatch from '../matches/SequelizeMatch';
// import OtherModel from './OtherModel';

class SequelizeTeams extends Model<InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'TeamsModel',
  tableName: 'teams',
  timestamps: false,
});

SequelizeTeams.hasMany(SequelizeMatch, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

SequelizeTeams.hasMany(SequelizeMatch, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

SequelizeMatch.belongsTo(SequelizeTeams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatch.belongsTo(SequelizeTeams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

/**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default SequelizeTeams;
