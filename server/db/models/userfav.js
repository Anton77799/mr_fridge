const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserFav extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  UserFav.init({
    user_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserFav',
  });
  return UserFav;
};
