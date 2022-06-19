module.exports = (sequelize, Sequelize) => {
    const Characters = sequelize.define("characters", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      series_id: {
        type: Sequelize.INTEGER
      },
      actor_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER
      },
      actor: {
        type: Sequelize.STRING
      },
      profile_path: {
        type: Sequelize.STRING
      },
      character_path: {
        type: Sequelize.STRING
      },
      votes: {
        type: Sequelize.INTEGER
      }
    }, 
    {
        timestamps: false,
    });
    return Characters;
  };