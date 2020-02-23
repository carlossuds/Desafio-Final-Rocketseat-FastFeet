import Sequelize, { Model } from 'sequelize';

class OrderProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }
}
export default OrderProblems;
