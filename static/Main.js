var net;
var ui;
var game;
$(document).ready(function () {

    ui = new Ui() // utworzenie obiektu klasy Ui
    net = new Net() // utworzenie obiektu klasy Net
    game = new Game()

    game.render();
})