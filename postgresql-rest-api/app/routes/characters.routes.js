module.exports = app => {
    const characters = require("../controllers/characters.controller.js")
    var router = require("express").Router();
    // Add n votes to a character
    router.put("/:id/add_votes", characters.addVotes)
    // Substract n votes to a character
    router.put("/:id/substract_votes", characters.substractVotes)
    // Delete a character
    router.delete("/:id/delete", characters.deleteCharacter)
    app.use('/api/characters', router);
  };