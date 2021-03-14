class Ui {

    constructor() {
        this.clicks();
        this.hovers();
        this.resize();

        //selectric initialization
        $(function () {
            $('select').selectric();
        });

        this.doorsStatus = 1;
        this.openDoors();

        this.playing = false;
    }


    //obsługa kliknięć w Ui

    clicks() {
        $("#login-button").on("click", function () {
            var username = $("#login-textbox").val()
            var layout = $("#choose-layout").val()
            net.sendDataLogin(username, layout)
        })
        $("#reset-button").on("click", function () {

            swal({
                title: "Are you sure?",
                text: "Are you sure you want to reset the game? This operation cannot be undone!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willReset) => {
                    if (willReset) {

                        net.resetGame()
                        swal("Game reset!", {
                            icon: "success",
                        });
                    } else {
                        swal("Reset cancelled!");
                    }
                });

        })

    }


    hovers() {

    }

    resize() {
        var that = this;

        var windowHeight = $(window).height();
        $("#container").css("height", windowHeight)
        $("#overlay").css("height", windowHeight)
        $("#inner-overlay").css("height", windowHeight)
        if ($(window).width() < 840) {
            $("#container").css("display", "none")
            $("#info").css("display", "inline-block")
        }

        $(window).on("resize", function () {
            if ($(window).width() < 840) {
                $("#container").css("display", "none")
                $("#info").css("display", "inline-block")
            }
            else {
                $("#container").css("display", "initial")
                $("#info").css("display", "none")
            }

            windowHeight = $(window).height();
            $("#container").css("height", windowHeight)
            $("#overlay").css("height", windowHeight)
            $("#inner-overlay").css("height", windowHeight)

            if (that.doorsStatus == 0) {
                var windowWidth = $(window).width();
                $("#left-door").css("transition", "none")
                $("#left-door").css("left", -windowWidth / 2)
                $("#right-door").css("transition", "none")
                $("#right-door").css("right", -windowWidth / 2)
                setInterval(function () {
                    $("#left-door").css("transition", "all 3s ease-in-out")
                    $("#right-door").css("transition", "all 3s ease-in-out")
                }, 1)
            }
            else {
                $("#left-door").css("transition", "none")
                $("#left-door").css("left", 0)
                $("#right-door").css("transition", "none")
                $("#right-door").css("right", 0)
                setInterval(function () {
                    $("#left-door").css("transition", "all 3s ease-in-out")
                    $("#right-door").css("transition", "all 3s ease-in-out")
                }, 1)
            }

            game.camera.aspect = window.innerWidth / (windowHeight);
            game.camera.updateProjectionMatrix();
            game.renderer.setSize(window.innerWidth, windowHeight);


        })
    }


    openDoors() {
        var windowWidth = $(window).width();
        $("#doors").css("pointer-events", "none")
        $("#left-door").css("left", -windowWidth / 2)
        $("#right-door").css("right", -windowWidth / 2)
        this.doorsStatus = 0;

        // setTimeout(function () {
        //     this.doorsStatus = 0;
        // }, 3000)

    }

    closeDoors() {
        $("#doors").css("pointer-events", "initial")
        $("#left-door").css("left", 0)
        $("#right-door").css("right", 0)
        this.doorsStatus = 1;

        // setTimeout(function () {
        //     this.doorsStatus = 1;
        // }, 3000)
    }

}