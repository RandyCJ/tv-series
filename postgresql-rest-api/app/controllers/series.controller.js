const db = require("../models");
const Series = db.series;
const Op = db.Sequelize.Op;

// Create and Save a new Series
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Series doesn't have a name"
    });
    return;
  }
  // Create a Series
  const series = {
    id: req.body.id,
    name: req.body.name,
    year: req.body.year,
    start_date: req.body.start_date,
    poster_path: req.body.poster_path,
    wallpaper_path: req.body.wallpaper_path
  };

  // Save Series in the database
  Series.create(series)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Series."
      });
    });
};

// Retrieve all Series from database
exports.findAll = (req, res) => {
  Series.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving series."
      });
    });
};

// Find a single Series with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Series.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({
                message: `Series by id ${id} does not exist`
            });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            message: "Error while retrieving single series"
        });
    })
};

// Update a Series by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Series with the specified id in the request
exports.delete = (req, res) => {
  
};

// Find all unfinished Series
exports.findAllUnfinished = (req, res) => {
  
};