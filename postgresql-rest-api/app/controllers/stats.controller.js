const { sequelize } = require("../models");
const db = require("../models");
const Stats = db.stats;
const Op = db.Sequelize.Op;

// Get last date from stats table
exports.getLastDate = (req, res) => {
  sequelize.query("select last_modification from stats")
    .then(data => {
          res.send(data[0][0])
        }
    )
    .catch(err => {
        console.log(err)
        res.status(500).send({
            message: "Error while retrieving stats"
        });
    })
};

// Update last date modification
exports.updateLastDate = (req, res) => {
  sequelize.query(`update stats set last_modification = '${req.body.last_modification}'`)
  .then(() => {
      res.send({
        message: "Last date was updated successfully."
      });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating last date."
    });
  });
};
