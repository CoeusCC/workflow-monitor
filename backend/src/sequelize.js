const Sequelize = require('sequelize');

const sequelize = new Sequelize('digitalprodsystem', 'digitalprodsystem', 'digitalprodsystem', {
  host: 'postgresql',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const User = sequelize.define('user', {
  id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
  fullName: { type: Sequelize.STRING, allowNull: false },
  trelloId: { type: Sequelize.STRING, unique: true, allowNull: false },
});

const Project = sequelize.define('project', {
  id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  thirdPartyType: Sequelize.ENUM('NONE', 'TRELLO', 'JIRA'),
  thirdPartyId: { type: Sequelize.STRING, unique: true, allowNull: false },
});

const Ticket = sequelize.define('ticket', {
  id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  trelloId: { type: Sequelize.INTEGER, allowNull: true },
  trelloUrl: { type: Sequelize.STRING, allowNull: true },
  complexity: { type: Sequelize.INTEGER, allowNull: true },
  status: { type: Sequelize.ENUM('PLANNING', 'DONE', 'DEFAULT_TASKS_BEFORE', 'DEFAULT_TASKS_AFTER'), allowNull: false }
});

const Task = sequelize.define('task', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  trelloId: { type: Sequelize.INTEGER, allowNull: true },
  trelloUrl: { type: Sequelize.STRING, allowNull: true },
  complexity: { type: Sequelize.INTEGER, allowNull: true },
  estimatedTime: { type: Sequelize.INTEGER, allowNull: true },
  realTime: { type: Sequelize.INTEGER, allowNull: true },
  problems: { type: Sequelize.STRING, allowNull: true },
});

User.hasOne(Project, { as: 'currentProject' })

Ticket.belongsTo(Project);

Project.hasMany(Task, {as: 'Tasks'})

sequelize.sync({force: true});

module.exports = sequelize
