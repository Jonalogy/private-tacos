'use strict'
module.exports = function (sequelize, DataTypes) {
  var taco = sequelize.define('taco', {
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    picture: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        models.taco.belongsTo(models.user)
      }
    }
  })
  return taco
}
