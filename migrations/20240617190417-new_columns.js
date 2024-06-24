'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Feedback',
        'floor',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Feedback',
        'room',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    

  }
};
