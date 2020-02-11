import Sequelize from 'sequelize';
import Users from '../app/models/Users';
import Recipients from '../app/models/Recipients';

import databaseConfig from '../config/database';

const models = [Users, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
