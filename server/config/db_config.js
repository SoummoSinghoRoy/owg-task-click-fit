const { Sequelize, DataTypes } = require('sequelize');

const env_variable = require('./custom-env-variable');

const sequelize = new Sequelize(env_variable.db, env_variable.db_user, env_variable.db_password, {
  host: env_variable.db_host,
  port: env_variable.db_port,
  dialect: 'mysql'
})

sequelize.authenticate().then(() => {
  console.log(`DB successfully connected`);
}).catch(err => {
  console.log(err);
})

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require('../model/User')(sequelize, DataTypes);
db.image = require('../model/Image')(sequelize, DataTypes);

module.exports = db;
