// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================



// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps
  app.get("/api/all", function(req, res) {


  });

  // Add a chirp
  app.post("/api/new", function(req, res) {

    console.log("Chirp Data:");
    console.log(req.body);

    
      res.end();
    

  });

};