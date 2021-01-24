const fs = require("fs")

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    let notes;
    fs.readFile("../db/db.json", (err, data) => {
      if (err) throw err;
      notes = JSON.parse(data);
      //console.log(notes)
      return res.json(notes)
    });
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let noteID = uuidv4();
    //console.log(newNote);
    Object.assign(newNote, { id: noteID });
    //console.log(newNote);
    fs.readFile("../db/db.json", (err, data) => {
      if (err) throw err;
      let database = JSON.parse(data);
      database.push(newNote);
      fs.writeFile("../db/db.json", JSON.stringify(database), (err) => {
        if (err) throw err;
        console.log("New note has been saved");
      });
      return res.json(database);
    });
  });
  app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id
    fs.readFile("../db/db.json", (err, data) => {
      if (err) throw err;
      let database = JSON.parse(data);
      for (var i = 0; i < database.length; i++) {
        if (database[i].id === id) {
          database.splice(i, 1)
        }
      }
      fs.writeFile("../db/db.json", JSON.stringify(database), (err) => {
        if (err) throw err;
      })
      return res.json(database)
    })
  })
}
