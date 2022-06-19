module.exports = (sequelize, Sequelize) => {
    const Series = sequelize.define("series", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATE
      },
      finish_date: {
        type: Sequelize.DATE
      },
      last_ep: {
        type: Sequelize.STRING
      },
      num_last_ep: {
        type: Sequelize.INTEGER
      },
      last_seen_ep: {
        type: Sequelize.STRING
      },
      poster_path: {
        type: Sequelize.STRING
      },
      wallpaper_path: {
        type: Sequelize.STRING
      },
      tvmaze_id: {
        type: Sequelize.INTEGER
      }
    }, 
    {
        timestamps: false,
    });
    return Series;
  };