module.exports = app => {
    const stats = require("../controllers/stats.controller.js");
    const characters = require("../controllers/stats.controller.js")
    var router = require("express").Router();
    // Update last date modification
    router.put("/last_date", stats.updateLastDate);
    // Get last date
    router.get("/last_date", stats.getLastDate);
    app.use('/api/stats/', router);
  };