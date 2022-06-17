module.exports = app => {
    const series = require("../controllers/series.controller.js");
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
    app.use('/api/series', router);
  };