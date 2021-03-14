class Net {
    constructor() {

    }

    sendDataLogin(username, layout) {
        $.ajax({
            url: "/login",
            data: { "action": "LOGIN", "username": username, "layout": layout },
            type: "POST",
            success: function (data) {
                var response = JSON.parse(data);

                if (response.message == "OK") {

                    if (response.playerNumber == 1) {
                        net.checkArray(true)
                        ui.closeDoors()
                        setTimeout(function () {
                            ui.openDoors()
                            $("#waiting-overlay").css("display", "flex")
                            $("#inner-overlay").css("display", "none")
                            game.camera.position.set(0, 800, 800)
                            game.camera.lookAt(0, 0, 0)
                            game.playerColor = "light";
                            game.username = username;

                            setTimeout(function () {
                                var timer = setInterval(function () {

                                    $.ajax({
                                        url: "/checkplayercount",
                                        data: { "action": "CHECKPLAYERCOUNT" },
                                        type: "POST",
                                        success: function (data) {
                                            var response = JSON.parse(data);

                                            if (response.playerNumber == 2) {
                                                clearInterval(timer)
                                                $("#waiting-overlay h1").text("Opponent found!")
                                                $("#waiting-overlay img").css("opacity", "0")
                                                ui.closeDoors()
                                                setTimeout(function () {
                                                    document.getElementById("matchup").innerHTML = "<span style='color:#D9B08C'>" + username + "</span> VS <span style='color:#116466'>" + response.playerName + "</span>"
                                                    $("#turn").css("color", "#D9B08C")
                                                    $("#turn").text("Your turn")
                                                    game.yourTurn = true;
                                                    $("#overlay").css("display", "none")
                                                    ui.openDoors()

                                                    game.listener()
                                                }, 3000)



                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            console.log(xhr);
                                        },
                                    });


                                }, 500)
                            }, 3000)

                        }, 3000)
                    }
                    else {
                        net.checkArray(false)
                        ui.closeDoors()
                        setTimeout(function () {
                            ui.openDoors()
                            document.getElementById("matchup").innerHTML = "<span style='color:#D9B08C'>" + response.playerName + "</span> VS <span style='color:#116466'>" + username + "</span>"
                            $("#turn").css("color", "#116466")
                            $("#turn").text("Opponent's turn")
                            $("#inner-overlay").css("display", "none")
                            $("#overlay").css("display", "none")
                            game.camera.position.set(0, 800, -800)
                            game.camera.lookAt(0, 0, 0)
                            game.playerColor = "dark";
                            game.username = username;
                            game.listener()

                            net.updateArray(game.pawns)
                            net.waitForTurn("dark")
                        }, 3000)
                    }

                }
                else {
                    swal(response.message)
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });

    }

    checkIfFirst() {
        $.ajax({
            url: "/checkplayercount",
            data: { "action": "CHECKPLAYERCOUNT" },
            type: "POST",
            success: function (data) {
                var response = JSON.parse(data);

                if (response.playerNumber == 2) {

                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    resetGame() {
        $.ajax({
            url: "/reset",
            data: { "action": "RESET" },
            type: "POST",
            success: function (data) {
                var response = JSON.parse(data);

                $("#status").text("Zresetowano. Oczekiwanie...")
                game.board = [
                    [2, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 1, 0, 0, 1, 0, 1],
                    [1, 0, 1, 0, 0, 1, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 2]
                ]

                game.pawns = [];
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    endReset() {
        $.ajax({
            url: "/reset",
            data: { "action": "RESET" },
            type: "POST",
            success: function (data) {
                var response = JSON.parse(data);

                $("#status").text("Zresetowano. Oczekiwanie...")
                game.board = [
                    [2, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 1, 0, 0, 1, 0, 1],
                    [1, 0, 1, 0, 0, 1, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 2]
                ]

                game.pawns = [];
                location.reload()
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    updateArray(arraySent) {
        $.ajax({
            url: "/updatearray",
            data: { "action": "UPDATEARRAY", array: JSON.stringify(arraySent) },
            type: "POST",
            success: function (data) {
                var response = JSON.parse(data);

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    checkArray(first) {
        var that = this;
        $.ajax({
            url: "checkarray",
            data: { "action": "CHECKARRAY" },
            type: "POST",
            success: function (data) {
                var response = JSON.parse(data);
                var serverArray = response.array
                if (serverArray != JSON.stringify(game.pawns)) {
                    game.pawns = JSON.parse(serverArray)
                    game.generatePawns()
                    if (first) {
                        that.updateArray(game.pawns)
                    }
                }

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    endTurn(xPos, zPos, move, value) {
        var that = this;

        this.updateArray(game.pawns)
        game.shootLaser(game.playerColor);
        game.yourTurn = false;
        $("#turn").text("Opponent's turn")
        $.ajax({
            url: "checkarray",
            data: { "action": "ENDTURN", "playerColor": game.playerColor, "xPos": xPos, "zPos": zPos, "move": move, "value": value },
            type: "POST",
            success: function (data) {
                that.waitForTurn(game.playerColor)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    waitForTurn(color) {
        var clock = setInterval(function () {
            $.ajax({
                url: "checkarray",
                data: { "action": "WAITFORTURN", "playerColor": color },
                type: "POST",
                success: function (data) {

                    var response = JSON.parse(data);


                    if (response.ended) {

                        clearInterval(clock)
                        $.ajax({
                            url: "checkarray",
                            data: { "action": "CHECKARRAY" },
                            type: "POST",
                            success: function (data) {

                                $("#turn").css("background-color", "rgba(255,255,255,0.5)")
                                setTimeout(function () {
                                    $("#turn").css("background-color", "rgba(255,255,255,0)")
                                }, 500)
                                $("#turn").text("Your turn")
                                game.yourTurn = true;

                                // fizyczne przestawienie pionka
                                if (response.move == "turn") {
                                    if (response.value == "left") {
                                        game.pawnsGameArray[response.zPos][response.xPos].rotation.y = game.pawnsGameArray[response.zPos][response.xPos].rotation.y + Math.PI / 2
                                    }
                                    if (response.value == "right") {
                                        game.pawnsGameArray[response.zPos][response.xPos].rotation.y = game.pawnsGameArray[response.zPos][response.xPos].rotation.y - Math.PI / 2
                                    }
                                }
                                else if (response.move == "move") {

                                    if (response.value == "N") {
                                        game.pawnsGameArray[response.zPos][response.xPos].position.x = game.pawnsGameArray[response.zPos][response.xPos].position.x
                                        game.pawnsGameArray[response.zPos][response.xPos].position.z = game.pawnsGameArray[response.zPos][response.xPos].position.z - 50
                                    }
                                    if (response.value == "S") {
                                        game.pawnsGameArray[response.zPos][response.xPos].position.x = game.pawnsGameArray[response.zPos][response.xPos].position.x
                                        game.pawnsGameArray[response.zPos][response.xPos].position.z = game.pawnsGameArray[response.zPos][response.xPos].position.z + 50
                                    }
                                    if (response.value == "W") {
                                        game.pawnsGameArray[response.zPos][response.xPos].position.x = game.pawnsGameArray[response.zPos][response.xPos].position.x - 50
                                        game.pawnsGameArray[response.zPos][response.xPos].position.z = game.pawnsGameArray[response.zPos][response.xPos].position.z
                                    }
                                    if (response.value == "E") {
                                        game.pawnsGameArray[response.zPos][response.xPos].position.x = game.pawnsGameArray[response.zPos][response.xPos].position.x + 50
                                        game.pawnsGameArray[response.zPos][response.xPos].position.z = game.pawnsGameArray[response.zPos][response.xPos].position.z
                                    }
                                }

                                // zmiana tablic
                                if (response.move == "move") {

                                    if (response.value == "N") {
                                        var zPosTemp = parseInt(response.zPos) - 1
                                        game.pawnsGameArray[zPosTemp][response.xPos] = game.pawnsGameArray[response.zPos][response.xPos]
                                        game.pawnsGameArray[response.zPos][response.xPos] = 0;
                                    }
                                    if (response.value == "S") {
                                        var zPosTemp = parseInt(response.zPos) + 1
                                        game.pawnsGameArray[zPosTemp][response.xPos] = game.pawnsGameArray[response.zPos][response.xPos]
                                        game.pawnsGameArray[response.zPos][response.xPos] = 0;
                                    }
                                    if (response.value == "W") {
                                        var xPosTemp = parseInt(response.xPos) - 1

                                        game.pawnsGameArray[response.zPos][xPosTemp] = game.pawnsGameArray[response.zPos][response.xPos]
                                        game.pawnsGameArray[response.zPos][response.xPos] = 0;
                                    }
                                    if (response.value == "E") {
                                        var xPosTemp = parseInt(response.xPos) + 1
                                        game.pawnsGameArray[response.zPos][xPosTemp] = game.pawnsGameArray[response.zPos][response.xPos]
                                        game.pawnsGameArray[response.zPos][response.xPos] = 0;
                                    }
                                }

                                var serverData = JSON.parse(data);
                                game.pawns = JSON.parse(serverData.array)

                                var laserColor = "light";
                                if (game.playerColor == "light") {
                                    laserColor = "dark"
                                }
                                game.shootLaser(laserColor);


                            },
                            error: function (xhr, status, error) {
                                console.log(xhr);
                            },
                        });

                    }

                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                },
            });
        }, 500)

    }
}

