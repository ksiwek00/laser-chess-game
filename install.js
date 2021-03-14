var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var url = require("url")
var path = require("path")
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var operations = require("./modules/Operations.js")
var _db;

var server = http.createServer(function (req, res) {
    //console.log("żądany przez przeglądarkę adres: " + req.url)
    var request = url.parse(req.url, true);
    var action = request.pathname;
    var ext = path.extname(action);
    if (req.url == "/index.html" || req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<h1>Server working</h1>");
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>404 - brak takiej strony</h1>");
        res.end();
    }

})


server.listen(3000, function () {
    console.log("Server connected... Installing database data...")
});


mongoClient.connect("mongodb://localhost/laserchess", function (err, db) {
    if (err) console.log(err)
    else console.log("MongoDB database connected...")

    db.dropCollection("layouts", function (err, coll) {
        if (err) console.log(err)
        console.log("Cleaned up the space for data...")

        db.createCollection("layouts", function (err, coll) {
            if (err) console.log(err)
            else console.log("Collection created...")

            var layouts = {
                aceLayout: [
                    [{ "type": "laser", "color": "dark", "rotation": "S" }, 0, 0, 0, { "type": "defender", "color": "dark", "rotation": "S" }, { "type": "king", "color": "dark", "rotation": "none" }, { "type": "defender", "color": "dark", "rotation": "S" }, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0],
                    [0, 0, { "type": "deflector", "color": "dark", "rotation": "W" }, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, 0, 0, 0, 0, 0, 0],
                    [{ "type": "deflector", "color": "dark", "rotation": "E" }, 0, { "type": "deflector", "color": "light", "rotation": "W" }, 0, { "type": "switch", "color": "dark", "rotation": "W" }, { "type": "switch", "color": "dark", "rotation": "S" }, 0, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, { "type": "deflector", "color": "light", "rotation": "N" }],
                    [{ "type": "deflector", "color": "dark", "rotation": "S" }, 0, { "type": "deflector", "color": "light", "rotation": "N" }, 0, { "type": "switch", "color": "light", "rotation": "S" }, { "type": "switch", "color": "light", "rotation": "W" }, 0, { "type": "deflector", "color": "dark", "rotation": "E" }, 0, { "type": "deflector", "color": "light", "rotation": "W" }],
                    [0, 0, 0, 0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, { "type": "deflector", "color": "light", "rotation": "E" }, 0, 0],
                    [0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, { "type": "defender", "color": "light", "rotation": "N" }, { "type": "king", "color": "light", "rotation": "none" }, { "type": "defender", "color": "light", "rotation": "N" }, 0, 0, 0, { "type": "laser", "color": "light", "rotation": "N" }]
                ],
                curiosityLayout: [
                    [{ "type": "laser", "color": "dark", "rotation": "S" }, 0, 0, 0, { "type": "defender", "color": "dark", "rotation": "S" }, { "type": "king", "color": "dark", "rotation": "none" }, { "type": "defender", "color": "dark", "rotation": "S" }, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, 0, 0, { "type": "deflector", "color": "dark", "rotation": "E" }, 0, 0, 0],
                    [{ "type": "deflector", "color": "dark", "rotation": "E" }, { "type": "deflector", "color": "light", "rotation": "W" }, 0, 0, { "type": "deflector", "color": "light", "rotation": "S" }, { "type": "switch", "color": "dark", "rotation": "S" }, 0, 0, { "type": "deflector", "color": "dark", "rotation": "S" }, { "type": "deflector", "color": "light", "rotation": "N" }],
                    [{ "type": "deflector", "color": "dark", "rotation": "S" }, { "type": "deflector", "color": "light", "rotation": "N" }, 0, 0, { "type": "switch", "color": "light", "rotation": "S" }, { "type": "deflector", "color": "dark", "rotation": "N" }, 0, 0, { "type": "deflector", "color": "dark", "rotation": "E" }, { "type": "deflector", "color": "light", "rotation": "W" }],
                    [0, 0, 0, { "type": "deflector", "color": "light", "rotation": "W" }, 0, 0, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, { "type": "switch", "color": "light", "rotation": "S" }, { "type": "defender", "color": "light", "rotation": "N" }, { "type": "king", "color": "light", "rotation": "none" }, { "type": "defender", "color": "light", "rotation": "N" }, 0, 0, 0, { "type": "laser", "color": "light", "rotation": "N" }]
                ],
                mercuryLayout: [
                    [{ "type": "laser", "color": "dark", "rotation": "S" }, 0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "W" }, { "type": "king", "color": "dark", "rotation": "none" }, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, { "type": "switch", "color": "light", "rotation": "S" }],
                    [0, 0, 0, 0, 0, { "type": "defender", "color": "dark", "rotation": "S" }, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, 0],
                    [{ "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, { "type": "switch", "color": "dark", "rotation": "S" }, 0, { "type": "defender", "color": "dark", "rotation": "S" }, 0, 0, 0, 0],
                    [{ "type": "deflector", "color": "dark", "rotation": "E" }, 0, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, 0, 0, 0, { "type": "deflector", "color": "light", "rotation": "W" }, 0],
                    [0, { "type": "deflector", "color": "dark", "rotation": "E" }, 0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, 0, { "type": "deflector", "color": "light", "rotation": "W" }],
                    [0, 0, 0, 0, { "type": "defender", "color": "light", "rotation": "N" }, 0, { "type": "switch", "color": "light", "rotation": "S" }, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }],
                    [0, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, { "type": "defender", "color": "light", "rotation": "N" }, 0, 0, 0, 0, 0],
                    [{ "type": "switch", "color": "light", "rotation": "S" }, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, { "type": "king", "color": "light", "rotation": "none" }, { "type": "deflector", "color": "light", "rotation": "E" }, 0, 0, 0, { "type": "laser", "color": "light", "rotation": "N" }],
                ],
                grailLayout: [
                    [{ "type": "laser", "color": "dark", "rotation": "S" }, 0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "W" }, { "type": "defender", "color": "dark", "rotation": "S" }, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, 0],
                    [0, 0, 0, 0, 0, { "type": "king", "color": "dark", "rotation": "none" }, 0, 0, 0, 0],
                    [{ "type": "deflector", "color": "dark", "rotation": "E" }, 0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "W" }, { "type": "defender", "color": "dark", "rotation": "S" }, { "type": "switch", "color": "dark", "rotation": "S" }, 0, 0, 0],
                    [{ "type": "deflector", "color": "dark", "rotation": "S" }, 0, { "type": "switch", "color": "dark", "rotation": "W" }, 0, { "type": "deflector", "color": "light", "rotation": "N" }, 0, { "type": "deflector", "color": "light", "rotation": "S" }, 0, 0, 0],
                    [0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "N" }, 0, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, { "type": "switch", "color": "light", "rotation": "W" }, 0, { "type": "deflector", "color": "light", "rotation": "N" }],
                    [0, 0, 0, { "type": "switch", "color": "light", "rotation": "S" }, { "type": "defender", "color": "light", "rotation": "N" }, { "type": "deflector", "color": "light", "rotation": "E" }, 0, 0, 0, { "type": "deflector", "color": "light", "rotation": "W" }],
                    [0, 0, 0, 0, { "type": "king", "color": "light", "rotation": "none" }, 0, 0, 0, 0, 0],
                    [0, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, { "type": "defender", "color": "light", "rotation": "N" }, { "type": "deflector", "color": "light", "rotation": "E" }, 0, 0, 0, { "type": "laser", "color": "light", "rotation": "N" }],
                ],
                sophieLayout: [
                    [{ "type": "laser", "color": "dark", "rotation": "S" }, 0, 0, 0, { "type": "king", "color": "dark", "rotation": "none" }, { "type": "deflector", "color": "light", "rotation": "N" }, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, 0, 0],
                    [0, 0, 0, { "type": "defender", "color": "dark", "rotation": "S" }, 0, { "type": "defender", "color": "dark", "rotation": "E" }, 0, 0, 0, { "type": "deflector", "color": "light", "rotation": "W" }],
                    [{ "type": "deflector", "color": "dark", "rotation": "E" }, 0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "W" }, { "type": "deflector", "color": "dark", "rotation": "S" }, 0, { "type": "switch", "color": "light", "rotation": "S" }, 0, { "type": "deflector", "color": "light", "rotation": "N" }],
                    [0, 0, 0, 0, 0, 0, 0, { "type": "deflector", "color": "dark", "rotation": "W" }, 0, 0],
                    [0, 0, { "type": "switch", "color": "light", "rotation": "S" }, 0, 0, 0, 0, 0, 0, 0],
                    [{ "type": "deflector", "color": "dark", "rotation": "S" }, 0, { "type": "switch", "color": "dark", "rotation": "S" }, 0, { "type": "deflector", "color": "light", "rotation": "N" }, { "type": "deflector", "color": "light", "rotation": "E" }, 0, 0, 0, { "type": "deflector", "color": "light", "rotation": "W" }],
                    [{ "type": "deflector", "color": "dark", "rotation": "E" }, 0, 0, 0, { "type": "defender", "color": "light", "rotation": "W" }, 0, { "type": "defender", "color": "light", "rotation": "S" }, 0, 0, 0],
                    [0, 0, 0, { "type": "deflector", "color": "light", "rotation": "N" }, { "type": "deflector", "color": "dark", "rotation": "S" }, { "type": "king", "color": "light", "rotation": "S" }, 0, 0, 0, { "type": "laser", "color": "light", "rotation": "N" }],
                ]
            }
            operations.insert(coll, layouts)
            console.log("Document added...")
            console.log("Database configuration finished! Press Ctrl+C to exit...")
        })
    })

    _db = db;
})