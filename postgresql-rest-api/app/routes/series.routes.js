module.exports = app => {
    const series = require("../controllers/series.controller.js");
    const characters = require("../controllers/characters.controller.js")
    var router = require("express").Router();
    // Create a new Series
    router.post("/", series.create);
    // Retrieve all Seriess
    router.get("/", series.findAll);
    // Retrieve a single Series with id
    router.get("/:id", series.findOne);
    // Update a Series with id
    router.put("/:id", series.update);
    // Delete a Series with id
    router.delete("/:id", series.delete);
    // Find all Characters from Series
    router.get("/:id/characters", characters.findAllOfSeries)
    // Add Character to Series
    router.post("/:id/add_character", characters.create)
    app.use('/api/series', router);
  };