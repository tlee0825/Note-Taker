const fs= require ("fs")

let notesData = require("../data/notesData");

module.exports = function (app) {

  app.get("/api/notes", function(req, res) {
    let notes;
    fs.readFile("../db/db.json", (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        //console.log(notes)
        return res.json(notes)
    });
});

app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  let noteID = uuidv4();
  //console.log(newNote);
  Object.assign(newNote, {id: noteID});
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
  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
