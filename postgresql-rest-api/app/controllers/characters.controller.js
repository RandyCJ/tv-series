const db = require("../models");
const Characters = db.characters;
const Op = db.Sequelize.Op;

// Create and Save a new Character
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Character doesn't have a name"
    });
    return;
  }

  // Create a Character
  const character = {
    name: req.body.name,
    series_id: req.params.id,
    actor_id: req.body.actor_id,
    gender: req.body.gender,
    actor: req.body.actor,
    profile_path: req.body.profile_path,
    character_path: req.body.character_path,
    votes: req.body.votes,
    api_data: req.body.api_data
  };

  // Save Character in the database
  Characters.create(character)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Character."
      });
    });
};

// Retrieve all characters from unique series
exports.findAllOfSeries = (req, res) => {
  Characters.findAll({
    order: [
      ['votes', 'DESC']
    ],
    where: {
        series_id: req.params.id
    }
  })
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

exports.addVotes = (req, res) => {
  Characters.findByPk(req.params.id)
    .then(data => {
        if (data) {
          data.increment('votes', { by: req.body.votes })
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

exports.substractVotes = (req, res) => {
  Characters.findByPk(req.params.id)
    .then(data => {
        if (data) {
          data.decrement('votes', { by: req.body.votes })
          res.send(data)
        } else {
            res.status(404).send({
                message: `Character by id ${id} does not exist`
            });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
            message: "Error while retrieving single character"
        });
    })
};

exports.deleteCharacter = (req, res) => {
  Characters.findByPk(req.params.id)
    .then(data => {
      if (data) {
        data.destroy()
        res.status(200).send()
      } else {
          res.status(404).send({
              message: `Character by id ${id} does not exist`
          });
      }
    }).catch(err => {
      console.log(err)
      res.status(500).send({
          message: "Error while retrieving single character"
      });
  })
}