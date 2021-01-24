const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Serves html files
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Reads jb.json file and returns saved notes (unfinished)
app.get("/api/notes", function(req, res) {
    let notes;
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        //console.log(notes)
        return res.json(notes)
    });
});

// Posts new notes to database (works)
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let noteID = uuidv4();
    //console.log(newNote);
    Object.assign(newNote, {id: noteID});
    //console.log(newNote);
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let database = JSON.parse(data);
        database.push(newNote);
        
        fs.writeFile("./db/db.json", JSON.stringify(database), (err) => {
            if (err) throw err;
            console.log("New note has been saved");
        });

        return res.json(database);
    });

    
});

//Deletes notes (unfinished)
app.delete("/api/notes/:id", function(req, res) {
    var noteID = req.params.id;
    console.log(noteID);
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let database = JSON.parse(data);
        for (var i = 0; i < database.length; i++) {
            if (database[i].id === noteID) {
                database.splice(i, 1);
            };
        };
        
        fs.writeFile("./db/db.json", JSON.stringify(database), (err) => {
            if (err) throw err;
            console.log("Note has been deleted");
        });

        return res.json(database);
    });

    //res.send("Got a DELETE request!")
})


app.listen(PORT, function() {
    console.log("App listening on Port " + PORT);
});