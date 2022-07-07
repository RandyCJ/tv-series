module.exports = (sequelize, Sequelize) => {
    const Stats = sequelize.define("stats", {
      last_modification: {
        type: Sequelize.DATE,
      }
    }, 
    {
        timestamps: false,
    });
    return Stats;
  };