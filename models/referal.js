'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class referal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'addedBy' })
    }
  }
  referal.init({
    referal_code: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    addedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'referal',
    paranoid: true
  });
  return referal;
};