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
    var request = url.parse(req.url, true);
    var action = request.pathname;
    var ext = path.extname(action);
    switch (req.method) {
        case "GET":
            if (req.url == "/index.html" || req.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/style.css") {
                fs.readFile("static/css/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/selectric.css") {
                fs.readFile("static/css/selectric.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/jquery331.js") {
                fs.readFile("static/libs/jquery331.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/selectric.js") {
                fs.readFile("static/libs/selectric.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/sweetalert.js") {
                fs.readFile("static/libs/sweetalert.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/gltfloader.js") {
                fs.readFile("static/libs/gltfloader.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/OrbitControls.js") {
                fs.readFile("static/libs/OrbitControls.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/three.js") {
                fs.readFile("static/libs/three.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/Net.js") {
                fs.readFile("static/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/UI.js") {
                fs.readFile("static/UI.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/Game.js") {
                fs.readFile("static/Game.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/Pawn.js") {
                fs.readFile("static/Pawn.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/Main.js") {
                fs.readFile("static/Main.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (ext == ".png") {
                var picture = decodeURI(req.url)
                fs.readFile("static/media/images" + picture, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }

            else if (ext == ".jpg") {
                var picture = decodeURI(req.url)
                fs.readFile("static/media/images" + picture, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.write(data);
                    res.end();
                })
            }
            else if (ext == ".gif") {
                var picture = decodeURI(req.url)
                fs.readFile("static/media/images" + picture, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.write(data);
                    res.end();
                })
            }
            else if (ext == ".ttf") {
                var font = decodeURI(req.url)
                fs.readFile("static/media/fonts" + font, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/x-font-ttf' });
                    res.write(data);
                    res.end();
                })
            }
            else if (ext == ".gltf") {
                var model = decodeURI(req.url)
                fs.readFile("static/media/models" + model, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'model/gltf+json' });
                    res.write(data);
                    res.end();
                })
            }
            else if (ext == ".bin") {
                var model = decodeURI(req.url)
                fs.readFile("static/media/models" + model, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
                    res.write(data);
                    res.end();
                })
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("<h1>404 - brak takiej strony</h1>");
                res.end();
            }
            break;
        case "POST":
            servResponse(req, res);
            break;
        default: break;
    }
})

var currentUsers = []
var pawns;
var layout = null;

var turnData = null;

var servResponse = function (req, res) {
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        var finish = qs.parse(allData);
        var action = finish.action;

        var results = {};
        res.writeHead(200, { 'Content-Type': 'text/plain', 'charset': 'utf-8' });

        switch (action) {
            //dodanie nowego usera
            case "LOGIN":
                var okLogin = true;
                for (var i = 0; i < currentUsers.length; i++) {
                    if (currentUsers[i] == finish.username) {
                        okLogin = false;
                    }
                }

                if (currentUsers.length == 1) {
                    results.playerName = currentUsers[0]
                }

                if (currentUsers.length >= 2) {
                    results.message = "There are already 2 players logged in. Wait for your turn."
                    res.end(JSON.stringify(results))
                }
                else if (!okLogin) {
                    results.message = "This nickname was already chosen. Choose a different one!"
                    res.end(JSON.stringify(results))
                }
                else {
                    if (layout == null) {
                        layout = finish.layout;
                        mongoClient.connect("mongodb://localhost/laserchess", function (err, db) {
                            if (err) console.log(err)
                            db.createCollection("layouts", function (err, coll) {
                                operations.selectAll(coll, function (data) {
                                    if (err) console.log(err)

                                    if (data[0] == null) {
                                        results.message = "MongoDB database is not installed. Please contact an administrator!"
                                        res.end(JSON.stringify(results))
                                    }
                                    else {
                                        if (layout == "ace") {
                                            pawns = data[0].aceLayout;
                                        }
                                        else if (layout == "curiosity") {
                                            pawns = data[0].curiosityLayout;
                                        }
                                        else if (layout == "mercury") {
                                            pawns = data[0].mercuryLayout;
                                        }
                                        else if (layout == "grail") {
                                            pawns = data[0].grailLayout;
                                        }
                                        else if (layout == "sophie") {
                                            pawns = data[0].sophieLayout;
                                        }

                                        results.message = "OK"
                                        results.playerNumber = currentUsers.length + 1
                                        currentUsers.push(finish.username)
                                        res.end(JSON.stringify(results))
                                    }

                                })

                            })

                            _db = db;
                        })

                    }
                    else {
                        results.message = "OK"
                        results.playerNumber = currentUsers.length + 1
                        currentUsers.push(finish.username)
                        res.end(JSON.stringify(results))
                    }

                }
                break;
            case "RESET":
                currentUsers = [];
                pawns = null;
                layout = null;
                turnData = null;
                res.end(JSON.stringify(results))
                break;
            case "CHECKPLAYERCOUNT":
                results.playerNumber = currentUsers.length
                if (currentUsers.length == 2) {
                    results.playerName = currentUsers[1]
                }
                res.end(JSON.stringify(results))
                break;
            case "UPDATEARRAY":
                pawns = JSON.parse(finish.array);

                results.message = "OK"

                res.end(JSON.stringify(results))
                break;
            case "CHECKARRAY":
                results.array = JSON.stringify(pawns)
                res.end(JSON.stringify(results))
                break;
            case "ENDTURN":
                turnData = { "playerColor": finish.playerColor, "xPos": finish.xPos, "zPos": finish.zPos, "move": finish.move, "value": finish.value }
                res.end(JSON.stringify(results))
                break;
            case "WAITFORTURN":
                if (turnData != null && finish.playerColor != turnData.playerColor) {
                    results.ended = true;
                    results.xPos = turnData.xPos;
                    results.zPos = turnData.zPos;
                    results.move = turnData.move;
                    results.value = turnData.value;
                    turnData = null;
                    res.end(JSON.stringify(results))
                }
                else {
                    results.ended = false;
                    res.end(JSON.stringify(results))
                }
                break;
            default:
                return console.log("Error. Action not found.");
        }

    })
}




server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});