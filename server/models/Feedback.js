import { Model, DataTypes } from 'sequelize'; // treated as an ES module !
import database from '../config/database.js'; 

const Feedback = database.define('feedback', {
  // temperaturePreference: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     isIn: [['cold', 'comfortable', 'hot']] 
  //   }
  // },
  perception: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: -3, 
      max: 3 
    }
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW 
  },

  floor:{
    type: DataTypes.INTEGER,
    allowNull: false,
    isIn: [[0,1]]
  },

  room: {
    type: DataTypes.STRING,
    allowNull: false
  }


}, 
{
  timestamps:false,
  tableName: 'feedback' 
});

  


 
export default Feedback;
