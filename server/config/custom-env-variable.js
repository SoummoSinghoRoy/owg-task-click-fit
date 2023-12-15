const dotenv = require('dotenv');
const custom_variable = dotenv.config();

const env_variable = {
  db: custom_variable.parsed.DB,
  db_user: custom_variable.parsed.DB_USER,
  db_password: custom_variable.parsed.DB_PASSWORD,
  db_host: custom_variable.parsed.DB_HOST,
  db_port: custom_variable.parsed.DB_PORT,
  secret_key: custom_variable.parsed.SECRET
}

module.exports = env_variable;