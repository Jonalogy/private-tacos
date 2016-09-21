'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('tacos', 'userId', {
      type: Sequelize.INTEGER
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('tacos', 'userId')
  }
}
