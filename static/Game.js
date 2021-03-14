class Game {
    constructor() {
        var global = this;

        this.board = [
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
        ]

        this.pawns = [];
        this.floorArray = [];

        this.playerColor;
        this.selectedPawn;
        this.clock;
        this.pawnsArray = [];
        this.pawnsGameArray = [];
        this.arrowLeft;
        this.arrowRight;
        this.yourTurn = false;
        this.username;
        this.first;

        this.scene = new THREE.Scene();
        var windowWidth = $(window).width()
        var windowHeight = $(window).height()

        this.loader = new THREE.GLTFLoader();
        this.textureLoader = new THREE.TextureLoader();

        this.camera = new THREE.PerspectiveCamera(
            45,    // kąt patrzenia kamery (FOV - field of view)
            windowWidth / windowHeight,    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            20000    // maxymalna renderowana odległość od kamery
        );
        this.camera.position.set(0, 800, -800)

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(windowWidth, windowHeight);
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;
        $("#root").append(this.renderer.domElement);

        var orbitControl = new THREE.OrbitControls(global.camera, global.renderer.domElement);
        orbitControl.minDistance = 100;
        orbitControl.maxDistance = 2500;
        orbitControl.addEventListener('change', function () {
            global.renderer.render(global.scene, global.camera)
        });

        this.generateBoard()

    }

    render() {
        requestAnimationFrame(game.render);
        game.renderer.render(game.scene, game.camera);

    }

    generateBoard() {
        var global = this;

        //podłoga

        var fieldGeometry = new THREE.BoxGeometry(50, 10, 50)
        var floorMaterialMain = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: new THREE.TextureLoader().load("floorMain.jpg"),
        })
        var floorMaterialRect = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: new THREE.TextureLoader().load("floorRect.jpg"),
        })
        var floorMaterialSquare = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: new THREE.TextureLoader().load("floorSquare.jpg"),
        })
        var floorMaterialArrow = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: new THREE.TextureLoader().load("floorArrow.jpg"),
        })

        for (var y = 0; y < this.board.length; y++) {
            global.floorArray.push([])
            for (var x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] == 0) {
                    var field = new THREE.Mesh(fieldGeometry, floorMaterialMain);
                    field.name = "floor"
                    global.scene.add(field)
                    field.position.x = (x - this.board[y].length / 2) * 50 + 25
                    field.position.z = (y - this.board.length / 2) * 50 + 25
                    global.floorArray[y].push(field)
                }
                else if (this.board[y][x] == 1) {
                    var field = new THREE.Mesh(fieldGeometry, floorMaterialSquare);
                    field.name = "floor"
                    global.scene.add(field)
                    field.position.x = (x - this.board[y].length / 2) * 50 + 25
                    field.position.z = (y - this.board.length / 2) * 50 + 25
                    global.floorArray[y].push(field)
                }
                else if (this.board[y][x] == 2) {
                    var field = new THREE.Mesh(fieldGeometry, floorMaterialRect);
                    field.name = "floor"
                    global.scene.add(field)
                    field.position.x = (x - this.board[y].length / 2) * 50 + 25
                    field.position.z = (y - this.board.length / 2) * 50 + 25
                    global.floorArray[y].push(field)
                }
                else if (this.board[y][x] == 3) {
                    var field = new THREE.Mesh(fieldGeometry, floorMaterialArrow);
                    field.name = "floor"
                    global.scene.add(field)
                    field.position.x = (x - this.board[y].length / 2) * 50 + 25
                    field.position.z = (y - this.board.length / 2) * 50 + 25
                    global.floorArray[y].push(field)
                }
            }
        }

        // strzałki

        global.loader.load("arrow-left.gltf", function (data) {
            var container = new THREE.Object3D;
            var object = data.scene;

            data.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.geometry.center(); // center here
                }
            });
            object.position.set(0, 0, 0);
            data.scene.scale.set(10, 10, 10) // scale here

            var texture = game.textureLoader.load('arrowTexture.png');
            texture.flipY = false;


            object.traverse((o) => {
                if (o.isMesh) {
                    o.material.map = texture;
                }
            });


            object.rotation.z = Math.PI / 2
            object.rotation.y = Math.PI / 2
            object.name = "arrowleft"

            container.add(object)
            global.arrowLeft = container

            global.scene.add(global.arrowLeft)
            global.arrowLeft.position.x = 0
            global.arrowLeft.position.y = 10000
            global.arrowLeft.position.z = 0


        });

        global.loader.load("arrow-right.gltf", function (data) {
            var container = new THREE.Object3D;
            var object = data.scene;

            data.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.geometry.center(); // center here
                }
            });
            object.position.set(0, 0, 0);
            data.scene.scale.set(10, 10, 10) // scale here

            var texture = game.textureLoader.load('arrowTexture.png');
            texture.flipY = false;


            object.traverse((o) => {
                if (o.isMesh) {
                    o.material.map = texture;
                }
            });


            object.rotation.z = Math.PI / 2
            object.rotation.y = Math.PI / 2
            object.name = "arrowright"

            container.add(object)
            global.arrowRight = container

            global.scene.add(global.arrowRight)
            global.arrowRight.position.x = 0
            global.arrowRight.position.y = 10000
            global.arrowRight.position.z = 0

        });

        // skybox

        var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
        var skyboxMaterials =
            [
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox-front.png"), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox-back.png"), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox-up.png"), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox-down.png"), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox-right.png"), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox-left.png"), side: THREE.DoubleSide })

            ];

        var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
        this.scene.add(skybox)

        // bandy + podłoga

        var floorUnderlayGeometry = new THREE.BoxGeometry(550, 10, 450)
        var floorUnderlayMaterial = new THREE.MeshPhongMaterial({
            color: 0x116466,
        })
        var floorUnderlay = new THREE.Mesh(floorUnderlayGeometry, floorUnderlayMaterial);
        this.scene.add(floorUnderlay)
        floorUnderlay.position.y = -10

        var bandGeometry = new THREE.BoxGeometry(527, 25, 25)
        bandGeometry.translate(-12.5, 0, 0)
        var bandMaterial = new THREE.MeshPhongMaterial({
            color: 0x116466,
        })
        var band = new THREE.Mesh(bandGeometry, bandMaterial);
        this.scene.add(band)
        band.position.x = 0
        band.position.y = 5
        band.position.z = -212.5

        bandMaterial = new THREE.MeshPhongMaterial({
            color: 0xffcb9a,
        })
        bandGeometry = new THREE.BoxGeometry(527, 25, 25)
        bandGeometry.translate(12.5, 0, 0)

        band = new THREE.Mesh(bandGeometry, bandMaterial);
        this.scene.add(band)
        band.position.x = 0
        band.position.y = 5
        band.position.z = 212.5

        bandGeometry = new THREE.BoxGeometry(25, 25, 450)

        band = new THREE.Mesh(bandGeometry, bandMaterial);
        this.scene.add(band)
        band.position.x = 263.5
        band.position.y = 5
        band.position.z = 0

        bandMaterial = new THREE.MeshPhongMaterial({
            color: 0x116466,
        })

        band = new THREE.Mesh(bandGeometry, bandMaterial);
        this.scene.add(band)
        band.position.x = -263.5
        band.position.y = 5
        band.position.z = 0

        // oświetlenie + kamera

        var pointLight = new THREE.PointLight(0xffffff, 0.5, 0, 2);
        this.scene.add(pointLight);
        pointLight.position.z = -200
        pointLight.position.x = 0
        pointLight.position.y = 200

        pointLight = new THREE.PointLight(0xffffff, 0.5, 0, 2);
        this.scene.add(pointLight);
        pointLight.position.z = 200
        pointLight.position.x = 0
        pointLight.position.y = 200

        pointLight = new THREE.PointLight(0xffffff, 0.5, 0, 2);
        this.scene.add(pointLight);
        pointLight.position.z = 0
        pointLight.position.x = 200

        pointLight = new THREE.PointLight(0xffffff, 0.5, 0, 2);
        this.scene.add(pointLight);
        pointLight.position.z = 0
        pointLight.position.x = -200
        pointLight.position.y = 200

        this.camera.lookAt(0, 0, 0)

    }

    generatePawns() {
        var global = this;

        for (var i = 0; i < global.pawnsArray.length; i++) {
            var selectedObject = game.scene.getObjectById(global.pawnsArray[i].id);
            game.scene.remove(selectedObject)
        }
        global.pawnsArray = []

        for (var y = 0; y < this.pawns.length; y++) {
            global.pawnsGameArray.push([])
            for (var x = 0; x < this.pawns[y].length; x++) {

                if (this.pawns[y][x] != 0) {
                    var type = this.pawns[y][x].type;
                    var file = type.charAt(0).toUpperCase() + type.slice(1) + ".gltf"
                    var color = this.pawns[y][x].color;
                    var pawnRotation;
                    switch (this.pawns[y][x].rotation) {
                        case "S":
                            pawnRotation = Math.PI

                            break;
                        case "W":
                            pawnRotation = Math.PI / 2
                            break;
                        case "N":
                            pawnRotation = 0;
                            break;
                        case "E":
                            pawnRotation = Math.PI * 3 / 2
                            break;
                    }

                    var pawn = new Pawn(file, type, color)
                    global.scene.add(pawn.getContainer())

                    pawn.getContainer().position.x = (x - this.pawns[y].length / 2) * 50 + 25
                    pawn.getContainer().position.z = (y - this.pawns.length / 2) * 50 + 25
                    pawn.getContainer().position.y = 0
                    pawn.getContainer().rotation.y = pawnRotation

                    game.pawnsArray.push(pawn.getContainer())
                    global.pawnsGameArray[y].push(pawn.getContainer())
                }
                else {
                    global.pawnsGameArray[y].push(0)
                }
            }
        }
    }

    shootLaser(playerColor) {
        var global = this;
        var laserMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
        })
        var laserGeometries = [];
        var laserPositions = [];
        var bouncesCount = 0;
        var distance = 1;
        var laserDirection;

        if (playerColor == "light") {
            laserDirection = global.pawns[7][9].rotation
            laserPositions.push({ "z": 7, "x": 9 })
            var laserGeometry = new THREE.BufferGeometry()
            laserGeometries.push(laserGeometry)
        }
        else {
            laserDirection = global.pawns[0][0].rotation
            laserPositions.push({ "z": 0, "x": 0 })
            var laserGeometry = new THREE.BufferGeometry()
            laserGeometries.push(laserGeometry)
        }

        var laserGoing = true;
        while (laserGoing) {
            switch (laserDirection) {
                case ("N"):
                    var zPos = laserPositions[bouncesCount].z - distance
                    var xPos = laserPositions[bouncesCount].x
                    if (global.pawns[zPos] != undefined) {
                        if (global.pawns[zPos][xPos] != undefined) {
                            if (global.pawns[zPos][xPos] != 0) {
                                switch (global.pawns[zPos][xPos].type) {
                                    case ("deflector"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("E"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("S"):
                                                laserDirection = "E"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("W"):

                                                laserDirection = "W"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                        }
                                        break;
                                    case ("defender"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("E"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("S"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)
                                                laserGoing = false;
                                                break;
                                            case ("W"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                        }
                                        break;
                                    case ("switch"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserDirection = "E"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("E"):
                                                laserDirection = "W"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("S"):
                                                laserDirection = "E"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50

                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("W"):
                                                laserDirection = "W"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                        }
                                        break;
                                    case ("king"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50

                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateX(Math.PI / 2)
                                        laserGeometry.translate(0, 0, length / 2)
                                        laserGeometries.push(laserGeometry)
                                        setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                        laserGoing = false;

                                        if (global.pawns[zPos][xPos].color == global.playerColor) {
                                            global.victory("enemy")
                                        }
                                        else {
                                            global.victory(global.playerColor)
                                        }

                                        break;
                                    case ("laser"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50

                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateX(Math.PI / 2)
                                        laserGeometry.translate(0, 0, length / 2)
                                        laserGeometries.push(laserGeometry)
                                        laserGoing = false;
                                        break;
                                }
                            }
                            else {
                                distance++;
                            }
                        }
                        else {


                            laserPositions.push({ "z": parseInt(zPos) + 1, "x": xPos })

                            var length = distance * 50
                            var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                            laserGeometry.rotateX(Math.PI / 2)
                            laserGeometry.translate(0, 0, length / 2 - 50)
                            laserGeometries.push(laserGeometry)

                            laserGoing = false;
                        }
                    }
                    else {

                        laserPositions.push({ "z": parseInt(zPos) + 1, "x": xPos })

                        var length = distance * 50
                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                        laserGeometry.rotateX(Math.PI / 2)
                        laserGeometry.translate(0, 0, length / 2 - 50)
                        laserGeometries.push(laserGeometry)

                        laserGoing = false;
                    }
                    break;
                case ("E"):
                    var zPos = laserPositions[bouncesCount].z
                    var xPos = laserPositions[bouncesCount].x + distance
                    if (global.pawns[zPos] != undefined) {
                        if (global.pawns[zPos][xPos] != undefined) {
                            if (global.pawns[zPos][xPos] != 0) {
                                switch (global.pawns[zPos][xPos].type) {
                                    case ("deflector"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserDirection = "N"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("E"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("S"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("W"):
                                                laserDirection = "S"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                        }
                                        break;
                                    case ("defender"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("E"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("S"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("W"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)
                                                laserGoing = false;
                                                break;
                                        }
                                        break;
                                    case ("switch"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserDirection = "N"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("E"):
                                                laserDirection = "S"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("S"):
                                                laserDirection = "N"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("W"):
                                                laserDirection = "S"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(-length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                        }
                                        break;
                                    case ("king"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50
                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateZ(Math.PI / 2)
                                        laserGeometry.translate(-length / 2, 0, 0)
                                        laserGeometries.push(laserGeometry)
                                        setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                        laserGoing = false;

                                        if (global.pawns[zPos][xPos].color == global.playerColor) {
                                            global.victory("enemy")
                                        }
                                        else {
                                            global.victory(global.playerColor)
                                        }

                                        break;
                                    case ("laser"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50
                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateZ(Math.PI / 2)
                                        laserGeometry.translate(-length / 2, 0, 0)
                                        laserGeometries.push(laserGeometry)
                                        laserGoing = false;
                                        break;
                                }
                            }
                            else {
                                distance++;
                            }
                        }
                        else {

                            laserPositions.push({ "z": zPos, "x": parseInt(xPos) - 1 })

                            var length = distance * 50
                            var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                            laserGeometry.rotateZ(Math.PI / 2)
                            laserGeometry.translate(-length / 2 + 50, 0, 0)
                            laserGeometries.push(laserGeometry)

                            laserGoing = false;
                        }
                    }
                    else {

                        laserPositions.push({ "z": zPos, "x": parseInt(xPos) - 1 })

                        var length = distance * 50
                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                        laserGeometry.rotateZ(Math.PI / 2)
                        laserGeometry.translate(-length / 2 + 50, 0, 0)
                        laserGeometries.push(laserGeometry)

                        laserGoing = false;
                    }
                    break;
                case ("S"):
                    var zPos = laserPositions[bouncesCount].z + distance
                    var xPos = laserPositions[bouncesCount].x
                    if (global.pawns[zPos] != undefined) {
                        if (global.pawns[zPos][xPos] != undefined) {
                            if (global.pawns[zPos][xPos] != 0) {
                                switch (global.pawns[zPos][xPos].type) {
                                    case ("deflector"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserDirection = "W"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("E"):
                                                laserDirection = "E"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("S"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("W"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                        }
                                        break;
                                    case ("defender"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)

                                                laserGoing = false;
                                                break;
                                            case ("E"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("S"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("W"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)
                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                        }
                                        break;
                                    case ("switch"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserDirection = "W"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("E"):
                                                laserDirection = "E"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("S"):
                                                laserDirection = "W"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("W"):
                                                laserDirection = "E"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateX(Math.PI / 2)
                                                laserGeometry.translate(0, 0, -length / 2)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                        }
                                        break;
                                    case ("king"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50
                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateX(Math.PI / 2)
                                        laserGeometry.translate(0, 0, -length / 2)
                                        laserGeometries.push(laserGeometry)
                                        setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                        laserGoing = false;

                                        if (global.pawns[zPos][xPos].color == global.playerColor) {
                                            global.victory("enemy")
                                        }
                                        else {
                                            global.victory(global.playerColor)
                                        }

                                        break;
                                    case ("laser"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50
                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateX(Math.PI / 2)
                                        laserGeometry.translate(0, 0, -length / 2)
                                        laserGeometries.push(laserGeometry)

                                        laserGoing = false;
                                        break;
                                }
                            }
                            else {
                                distance++;
                            }
                        }
                        else {

                            laserPositions.push({ "z": parseInt(zPos) - 1, "x": xPos })

                            var length = distance * 50
                            var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                            laserGeometry.rotateX(Math.PI / 2)
                            laserGeometry.translate(0, 0, -length / 2 + 50)
                            laserGeometries.push(laserGeometry)

                            laserGoing = false;
                        }
                    }
                    else {

                        laserPositions.push({ "z": parseInt(zPos) - 1, "x": xPos })

                        var length = distance * 50
                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                        laserGeometry.rotateX(Math.PI / 2)
                        laserGeometry.translate(0, 0, -length / 2 + 50)
                        laserGeometries.push(laserGeometry)

                        laserGoing = false;
                    }
                    break;
                case ("W"):
                    var zPos = laserPositions[bouncesCount].z
                    var xPos = laserPositions[bouncesCount].x - distance
                    if (global.pawns[zPos] != undefined) {
                        if (global.pawns[zPos][xPos] != undefined) {
                            if (global.pawns[zPos][xPos] != 0) {
                                switch (global.pawns[zPos][xPos].type) {
                                    case ("deflector"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("E"):
                                                laserDirection = "N"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("S"):
                                                laserDirection = "S"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("W"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                        }
                                        break;
                                    case ("defender"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("E"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                laserGoing = false;
                                                break;
                                            case ("S"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                            case ("W"):
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                global.pawns[zPos][xPos] = 0
                                                setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                                laserGoing = false;
                                                break;
                                        }
                                        break;
                                    case ("switch"):
                                        switch (global.pawns[zPos][xPos].rotation) {
                                            case ("N"):
                                                laserDirection = "S"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("E"):
                                                laserDirection = "N"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("S"):
                                                laserDirection = "S"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                            case ("W"):
                                                laserDirection = "N"
                                                laserPositions.push({ "z": zPos, "x": xPos })

                                                var length = distance * 50
                                                var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                                laserGeometry.rotateZ(Math.PI / 2)
                                                laserGeometry.translate(length / 2, 0, 0)
                                                laserGeometries.push(laserGeometry)

                                                bouncesCount++
                                                distance = 1;
                                                break;
                                        }
                                        break;
                                    case ("king"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50
                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateZ(Math.PI / 2)
                                        laserGeometry.translate(length / 2, 0, 0)
                                        laserGeometries.push(laserGeometry)

                                        setTimeout(function () { global.scene.remove(global.scene.getObjectById(global.pawnsGameArray[zPos][xPos].id)); }, 500)
                                        laserGoing = false;

                                        if (global.pawns[zPos][xPos].color == global.playerColor) {
                                            global.victory("enemy")
                                        }
                                        else {
                                            global.victory(global.playerColor)
                                        }

                                        break;
                                    case ("laser"):
                                        laserPositions.push({ "z": zPos, "x": xPos })

                                        var length = distance * 50
                                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                                        laserGeometry.rotateZ(Math.PI / 2)
                                        laserGeometry.translate(length / 2, 0, 0)
                                        laserGeometries.push(laserGeometry)

                                        laserGoing = false;
                                        break;
                                }
                            }
                            else {
                                distance++;
                            }
                        }
                        else {

                            laserPositions.push({ "z": zPos, "x": parseInt(xPos) + 1 })

                            var length = distance * 50
                            var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                            laserGeometry.rotateZ(Math.PI / 2)
                            laserGeometry.translate(length / 2 - 50, 0, 0)
                            laserGeometries.push(laserGeometry)

                            laserGoing = false;
                        }
                    }
                    else {

                        laserPositions.push({ "z": zPos, "x": parseInt(xPos) + 1 })

                        var length = distance * 50
                        var laserGeometry = new THREE.CylinderGeometry(1, 1, length, 16)
                        laserGeometry.rotateZ(Math.PI / 2)
                        laserGeometry.translate(length / 2 - 50, 0, 0)
                        laserGeometries.push(laserGeometry)

                        laserGoing = false;
                    }
                    break;
            }

        }

        var lasers = [];

        for (var i = 0; i < laserPositions.length; i++) {
            let laserBeam = new THREE.Mesh(laserGeometries[i], laserMaterial);

            global.scene.add(laserBeam)
            laserBeam.position.x = (laserPositions[i].x + 1 - 5) * 50 - 25
            laserBeam.position.z = (laserPositions[i].z + 1 - 4) * 50 - 25
            laserBeam.position.y = 33

            lasers.push(laserBeam)
        }

        setTimeout(function () {
            for (var i = 0; i < lasers.length; i++) {
                global.scene.remove(global.scene.getObjectById(lasers[i].id))
            }
        }, 500)


    }

    listener() {

        var global = this;

        $("#root").on("mousedown", function (event) {

            if (global.yourTurn) {

                var raycaster = new THREE.Raycaster();
                var mouseVector = new THREE.Vector2();

                let canvasBounds = game.renderer.context.canvas.getBoundingClientRect();
                mouseVector.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
                mouseVector.y = - ((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;

                raycaster.setFromCamera(mouseVector, game.camera);

                var movementIntersects = raycaster.intersectObjects(game.scene.children, true)

                if (movementIntersects.length > 0) {

                    if (movementIntersects[0].object.parent.name == "dark" || movementIntersects[0].object.parent.name == "light") {
                        if (movementIntersects[0].object.parent.name == game.playerColor) {

                            //czyszczenie pól poprzedniego pionka(jeśli istnieje)
                            if (game.selectedPawn) {
                                var tabX = Math.abs(- (game.selectedPawn.object.parent.parent.position.x - 175) / 50 - 8)
                                var tabZ = Math.abs(- (game.selectedPawn.object.parent.parent.position.z - 175) / 50 - 7)

                                if (global.floorArray[tabZ]) {
                                    if (global.floorArray[tabZ][tabX + 1]) {
                                        global.floorArray[tabZ][tabX + 1].material.color.setHex(0xffffff)
                                    }
                                    if (global.floorArray[tabZ][tabX - 1]) {
                                        global.floorArray[tabZ][tabX - 1].material.color.setHex(0xffffff)
                                    }
                                }
                                if (global.floorArray[tabZ + 1]) {
                                    if (global.floorArray[tabZ + 1][tabX]) {
                                        global.floorArray[tabZ + 1][tabX].material.color.setHex(0xffffff)
                                    }
                                }
                                if (global.floorArray[tabZ - 1]) {
                                    if (global.floorArray[tabZ - 1][tabX]) {
                                        global.floorArray[tabZ - 1][tabX].material.color.setHex(0xffffff)
                                    }
                                }
                            }

                            //wybieranie pionka
                            game.selectedPawn = movementIntersects[0]

                            var posX = Math.abs(- (movementIntersects[0].object.parent.parent.position.x - 175) / 50 - 8)
                            var posZ = Math.abs(- (movementIntersects[0].object.parent.parent.position.z - 175) / 50 - 7)

                            // jeśli laser
                            if (movementIntersects[0].object.material.name == "laser") {
                                if (global.pawns[posZ][posX].rotation == "N") {
                                    global.arrowLeft.position.x = movementIntersects[0].object.parent.parent.position.x + 10
                                    global.arrowLeft.position.y = movementIntersects[0].object.parent.parent.position.y + 100
                                    global.arrowLeft.position.z = movementIntersects[0].object.parent.parent.position.z - 50
                                    global.arrowRight.position.x = 0
                                    global.arrowRight.position.y = 10000
                                    global.arrowRight.position.z = 0
                                }
                                else if (global.pawns[posZ][posX].rotation == "E") {
                                    global.arrowRight.position.x = movementIntersects[0].object.parent.parent.position.x - 20
                                    global.arrowRight.position.y = movementIntersects[0].object.parent.parent.position.y + 100
                                    global.arrowRight.position.z = movementIntersects[0].object.parent.parent.position.z - 50
                                    global.arrowLeft.position.x = 0
                                    global.arrowLeft.position.y = 10000
                                    global.arrowLeft.position.z = 0
                                }
                                else if (global.pawns[posZ][posX].rotation == "S") {
                                    global.arrowLeft.position.x = movementIntersects[0].object.parent.parent.position.x + 10
                                    global.arrowLeft.position.y = movementIntersects[0].object.parent.parent.position.y + 100
                                    global.arrowLeft.position.z = movementIntersects[0].object.parent.parent.position.z - 50
                                    global.arrowRight.position.x = 0
                                    global.arrowRight.position.y = 10000
                                    global.arrowRight.position.z = 0
                                }
                                else if (global.pawns[posZ][posX].rotation == "W") {
                                    global.arrowRight.position.x = movementIntersects[0].object.parent.parent.position.x - 20
                                    global.arrowRight.position.y = movementIntersects[0].object.parent.parent.position.y + 100
                                    global.arrowRight.position.z = movementIntersects[0].object.parent.parent.position.z - 50
                                    global.arrowLeft.position.x = 0
                                    global.arrowLeft.position.y = 10000
                                    global.arrowLeft.position.z = 0
                                }
                            }
                            else if (movementIntersects[0].object.material.name == "king") {

                                global.arrowRight.position.x = 0
                                global.arrowRight.position.y = 10000
                                global.arrowRight.position.z = 0

                                global.arrowLeft.position.x = 0
                                global.arrowLeft.position.y = 10000
                                global.arrowLeft.position.z = 0

                                if (global.floorArray[posZ]) {
                                    if (global.floorArray[posZ][posX + 1]) {
                                        if (game.pawns[posZ][posX + 1] == 0) {
                                            global.floorArray[posZ][posX + 1].material = global.floorArray[posZ][posX + 1].material.clone()
                                            global.floorArray[posZ][posX + 1].material.color.setHex(0x00ffff)
                                        }

                                    }
                                    if (global.floorArray[posZ][posX - 1]) {
                                        if (game.pawns[posZ][posX - 1] == 0) {
                                            global.floorArray[posZ][posX - 1].material = global.floorArray[posZ][posX - 1].material.clone()
                                            global.floorArray[posZ][posX - 1].material.color.setHex(0x00ffff)
                                        }

                                    }
                                }
                                if (global.floorArray[posZ + 1]) {
                                    if (game.pawns[posZ + 1][posX] == 0) {
                                        if (global.floorArray[posZ + 1][posX]) {
                                            global.floorArray[posZ + 1][posX].material = global.floorArray[posZ + 1][posX].material.clone()
                                            global.floorArray[posZ + 1][posX].material.color.setHex(0x00ffff)
                                        }
                                    }

                                }
                                if (global.floorArray[posZ - 1]) {
                                    if (game.pawns[posZ - 1][posX] == 0) {
                                        if (global.floorArray[posZ - 1][posX]) {
                                            global.floorArray[posZ - 1][posX].material = global.floorArray[posZ - 1][posX].material.clone()
                                            global.floorArray[posZ - 1][posX].material.color.setHex(0x00ffff)
                                        }
                                    }

                                }
                            }
                            // jak deflector, defender albo switch
                            else {

                                // podświetlanie pól
                                if (global.floorArray[posZ]) {
                                    if (global.floorArray[posZ][posX + 1]) {
                                        if (game.pawns[posZ][posX + 1] == 0) {
                                            global.floorArray[posZ][posX + 1].material = global.floorArray[posZ][posX + 1].material.clone()
                                            global.floorArray[posZ][posX + 1].material.color.setHex(0x00ffff)
                                        }

                                    }
                                    if (global.floorArray[posZ][posX - 1]) {
                                        if (game.pawns[posZ][posX - 1] == 0) {
                                            global.floorArray[posZ][posX - 1].material = global.floorArray[posZ][posX - 1].material.clone()
                                            global.floorArray[posZ][posX - 1].material.color.setHex(0x00ffff)
                                        }

                                    }
                                }
                                if (global.floorArray[posZ + 1]) {
                                    if (game.pawns[posZ + 1][posX] == 0) {
                                        if (global.floorArray[posZ + 1][posX]) {
                                            global.floorArray[posZ + 1][posX].material = global.floorArray[posZ + 1][posX].material.clone()
                                            global.floorArray[posZ + 1][posX].material.color.setHex(0x00ffff)
                                        }
                                    }

                                }
                                if (global.floorArray[posZ - 1]) {
                                    if (game.pawns[posZ - 1][posX] == 0) {
                                        if (global.floorArray[posZ - 1][posX]) {
                                            global.floorArray[posZ - 1][posX].material = global.floorArray[posZ - 1][posX].material.clone()
                                            global.floorArray[posZ - 1][posX].material.color.setHex(0x00ffff)
                                        }
                                    }

                                }

                                // strzałki nad pionkiem
                                global.arrowLeft.position.x = movementIntersects[0].object.parent.parent.position.x + 10
                                global.arrowLeft.position.y = movementIntersects[0].object.parent.parent.position.y + 100
                                global.arrowLeft.position.z = movementIntersects[0].object.parent.parent.position.z - 50

                                global.arrowRight.position.x = movementIntersects[0].object.parent.parent.position.x - 20
                                global.arrowRight.position.y = movementIntersects[0].object.parent.parent.position.y + 100
                                global.arrowRight.position.z = movementIntersects[0].object.parent.parent.position.z - 50
                            }


                        }
                    }
                    else if (movementIntersects[0].object.parent.name == "arrowleft") {
                        if (game.selectedPawn) {
                            var tabX = Math.abs(- (game.selectedPawn.object.parent.parent.position.x - 175) / 50 - 8)
                            var tabZ = Math.abs(- (game.selectedPawn.object.parent.parent.position.z - 175) / 50 - 7)
                            if (game.pawns[tabZ][tabX].rotation == "N") {
                                game.pawns[tabZ][tabX].rotation = "W"
                            }
                            else if (game.pawns[tabZ][tabX].rotation == "E") {
                                game.pawns[tabZ][tabX].rotation = "N"
                            }
                            else if (game.pawns[tabZ][tabX].rotation == "S") {
                                game.pawns[tabZ][tabX].rotation = "E"
                            }
                            else if (game.pawns[tabZ][tabX].rotation == "W") {
                                game.pawns[tabZ][tabX].rotation = "S"
                            }

                            game.selectedPawn.object.parent.parent.rotation.y = game.selectedPawn.object.parent.parent.rotation.y + Math.PI / 2

                            //wyczyszczenie zaznaczeń i usunięcie strzałek
                            if (global.floorArray[tabZ]) {
                                if (global.floorArray[tabZ][tabX + 1]) {
                                    global.floorArray[tabZ][tabX + 1].material.color.setHex(0xffffff)
                                }
                                if (global.floorArray[tabZ][tabX - 1]) {
                                    global.floorArray[tabZ][tabX - 1].material.color.setHex(0xffffff)
                                }
                            }
                            if (global.floorArray[tabZ + 1]) {
                                if (global.floorArray[tabZ + 1][tabX]) {
                                    global.floorArray[tabZ + 1][tabX].material.color.setHex(0xffffff)
                                }
                            }
                            if (global.floorArray[tabZ - 1]) {
                                if (global.floorArray[tabZ - 1][tabX]) {
                                    global.floorArray[tabZ - 1][tabX].material.color.setHex(0xffffff)
                                }
                            }

                            global.arrowRight.position.x = 0
                            global.arrowRight.position.y = 10000
                            global.arrowRight.position.z = 0

                            global.arrowLeft.position.x = 0
                            global.arrowLeft.position.y = 10000
                            global.arrowLeft.position.z = 0

                            //aktualizacja tablicy na serwerze
                            net.updateArray(game.pawns)
                            //wyczyszczenie aktywnego pionka
                            game.selectedPawn = null;
                            //koniec tury
                            net.endTurn(tabX, tabZ, "turn", "left");
                        }
                    }
                    else if (movementIntersects[0].object.parent.name == "arrowright") {
                        if (game.selectedPawn) {
                            var tabX = Math.abs(- (game.selectedPawn.object.parent.parent.position.x - 175) / 50 - 8)
                            var tabZ = Math.abs(- (game.selectedPawn.object.parent.parent.position.z - 175) / 50 - 7)
                            if (game.pawns[tabZ][tabX].rotation == "N") {
                                game.pawns[tabZ][tabX].rotation = "E"
                            }
                            else if (game.pawns[tabZ][tabX].rotation == "E") {
                                game.pawns[tabZ][tabX].rotation = "S"
                            }
                            else if (game.pawns[tabZ][tabX].rotation == "S") {
                                game.pawns[tabZ][tabX].rotation = "W"
                            }
                            else if (game.pawns[tabZ][tabX].rotation == "W") {
                                game.pawns[tabZ][tabX].rotation = "N"
                            }

                            game.selectedPawn.object.parent.parent.rotation.y = game.selectedPawn.object.parent.parent.rotation.y - Math.PI / 2

                            //wyczyszczenie zaznaczeń i usunięcie strzałek
                            if (global.floorArray[tabZ]) {
                                if (global.floorArray[tabZ][tabX + 1]) {
                                    global.floorArray[tabZ][tabX + 1].material.color.setHex(0xffffff)
                                }
                                if (global.floorArray[tabZ][tabX - 1]) {
                                    global.floorArray[tabZ][tabX - 1].material.color.setHex(0xffffff)
                                }
                            }
                            if (global.floorArray[tabZ + 1]) {
                                if (global.floorArray[tabZ + 1][tabX]) {
                                    global.floorArray[tabZ + 1][tabX].material.color.setHex(0xffffff)
                                }
                            }
                            if (global.floorArray[tabZ - 1]) {
                                if (global.floorArray[tabZ - 1][tabX]) {
                                    global.floorArray[tabZ - 1][tabX].material.color.setHex(0xffffff)
                                }
                            }

                            global.arrowRight.position.x = 0
                            global.arrowRight.position.y = 10000
                            global.arrowRight.position.z = 0

                            global.arrowLeft.position.x = 0
                            global.arrowLeft.position.y = 10000
                            global.arrowLeft.position.z = 0

                            //aktualizacja tablicy na serwerze
                            net.updateArray(game.pawns)
                            //wyczyszczenie aktywnego pionka
                            game.selectedPawn = null;
                            //koniec tury
                            net.endTurn(tabX, tabZ, "turn", "right");

                        }
                    }
                    else if (movementIntersects[0].object.name == "floor") {
                        if (game.selectedPawn) {
                            if (game.selectedPawn.object.material.name != "laser") {
                                //sprawdzanie, czy pole jest puste (definiowanie potrzebnych zmiennych)
                                var testTabX = Math.abs(- (movementIntersects[0].object.position.x - 175) / 50 - 8)
                                var testTabZ = Math.abs(- (movementIntersects[0].object.position.z - 175) / 50 - 7)
                                //sprawdzanie czy pole jest obok pionka, jak nie jest królówką
                                var okMove = false;
                                var testTabX2 = Math.abs(- (game.selectedPawn.object.parent.parent.position.x - 175) / 50 - 8)
                                var testTabZ2 = Math.abs(- (game.selectedPawn.object.parent.parent.position.z - 175) / 50 - 7)

                                var direction;

                                if (testTabX == testTabX2 + 1 && testTabZ == testTabZ2) {
                                    direction = "E"
                                    okMove = true;
                                }
                                else if (testTabX == testTabX2 - 1 && testTabZ == testTabZ2) {
                                    direction = "W"
                                    okMove = true;
                                }
                                else if (testTabX == testTabX2 && testTabZ == testTabZ2 - 1) {
                                    direction = "N"
                                    okMove = true;
                                }
                                else if (testTabX == testTabX2 && testTabZ == testTabZ2 + 1) {
                                    direction = "S"
                                    okMove = true;
                                }

                                //sprawdzanie warunków
                                if (game.selectedPawn && game.pawns[testTabZ][testTabX] == 0 && okMove) {

                                    //startowa pozycja na potem
                                    var startPosX = Math.abs(- (game.selectedPawn.object.parent.parent.position.x - 175) / 50 - 8)
                                    var startPosZ = Math.abs(- (game.selectedPawn.object.parent.parent.position.z - 175) / 50 - 7)

                                    //zmiana tablic
                                    var tabX = Math.abs(- (game.selectedPawn.object.parent.parent.position.x - 175) / 50 - 8)
                                    var tabZ = Math.abs(- (game.selectedPawn.object.parent.parent.position.z - 175) / 50 - 7)
                                    var selectedValue = game.pawns[tabZ][tabX]
                                    var selectedObject = game.pawnsGameArray[tabZ][tabX]
                                    game.pawns[tabZ][tabX] = 0

                                    game.pawnsGameArray[tabZ][tabX] = 0;

                                    //usunięcie podświetlenia planszy

                                    if (global.floorArray[tabZ]) {
                                        if (global.floorArray[tabZ][tabX + 1]) {
                                            global.floorArray[tabZ][tabX + 1]
                                            global.floorArray[tabZ][tabX + 1].material.color.setHex(0xffffff)
                                        }
                                        if (global.floorArray[tabZ][tabX - 1]) {
                                            global.floorArray[tabZ][tabX - 1].material.color.setHex(0xffffff)
                                        }
                                    }
                                    if (global.floorArray[tabZ + 1]) {
                                        if (global.floorArray[tabZ + 1][tabX]) {
                                            global.floorArray[tabZ + 1][tabX].material.color.setHex(0xffffff)
                                        }
                                    }
                                    if (global.floorArray[tabZ - 1]) {
                                        if (global.floorArray[tabZ - 1][tabX]) {
                                            global.floorArray[tabZ - 1][tabX].material.color.setHex(0xffffff)
                                        }
                                    }

                                    //usunięcie strzałek

                                    global.arrowRight.position.x = 0
                                    global.arrowRight.position.y = 10000
                                    global.arrowRight.position.z = 0

                                    global.arrowLeft.position.x = 0
                                    global.arrowLeft.position.y = 10000
                                    global.arrowLeft.position.z = 0

                                    //zmiana tablicy cd
                                    tabX = Math.abs(- (movementIntersects[0].object.position.x - 175) / 50 - 8)
                                    tabZ = Math.abs(- (movementIntersects[0].object.position.z - 175) / 50 - 7)
                                    game.pawns[tabZ][tabX] = selectedValue
                                    game.pawnsGameArray[tabZ][tabX] = selectedObject
                                    //fizycznie przestawienie pionka
                                    game.selectedPawn.object.parent.parent.position.x = movementIntersects[0].object.position.x
                                    game.selectedPawn.object.parent.parent.position.z = movementIntersects[0].object.position.z
                                    //aktualizacja tablicy na serwerze
                                    net.updateArray(game.pawns)

                                    //wyczyszczenie aktywnego pionka
                                    game.selectedPawn = null;

                                    //koniec tury - 
                                    net.endTurn(startPosX, startPosZ, "move", direction);

                                }
                            }
                        }

                    }
                    else if (game.selectedPawn) {
                        //czyszczenie pól poprzedniego pionka(jeśli istnieje)

                        var tabX = Math.abs(- (game.selectedPawn.object.parent.parent.position.x - 175) / 50 - 8)
                        var tabZ = Math.abs(- (game.selectedPawn.object.parent.parent.position.z - 175) / 50 - 7)

                        if (global.floorArray[tabZ]) {
                            if (global.floorArray[tabZ][tabX + 1]) {
                                global.floorArray[tabZ][tabX + 1].material.color.setHex(0xffffff)
                            }
                            if (global.floorArray[tabZ][tabX - 1]) {
                                global.floorArray[tabZ][tabX - 1].material.color.setHex(0xffffff)
                            }
                        }
                        if (global.floorArray[tabZ + 1]) {
                            if (global.floorArray[tabZ + 1][tabX]) {
                                global.floorArray[tabZ + 1][tabX].material.color.setHex(0xffffff)
                            }
                        }
                        if (global.floorArray[tabZ - 1]) {
                            if (global.floorArray[tabZ - 1][tabX]) {
                                global.floorArray[tabZ - 1][tabX].material.color.setHex(0xffffff)
                            }
                        }

                        // czyszczenie strzałek

                        global.arrowRight.position.x = 0
                        global.arrowRight.position.y = 10000
                        global.arrowRight.position.z = 0

                        global.arrowLeft.position.x = 0
                        global.arrowLeft.position.y = 10000
                        global.arrowLeft.position.z = 0

                        game.selectedPawn = null;
                    }
                }
            }
        })

    }

    victory(color) {
        var global = this;
        ui.closeDoors()
        setTimeout(function () {
            ui.openDoors()
            $("#overlay").css("display", "block")
            $("#waiting-overlay").css("display", "block")
            $("#waiting-overlay").css("height", "100vh")
            $("#waiting-overlay").css("display", "flex")
            $("#waiting-overlay").css("flex-direction", "column")
            $("#waiting-overlay").css("justify-content", "center")
            $("#waiting-overlay").css("align-items", "center")
            $("#waiting-overlay img").css("display", "none")
            var restartButton = $("<button id='play-again'>Play again</button>")
            restartButton.on("click", function () {
                ui.closeDoors()
                setTimeout(function () {
                    net.endReset();
                }, 3000)
            })
            $("#waiting-overlay").append(restartButton)
            if (color == global.playerColor) {
                $("#waiting-overlay h1").text("Victory! Congratulations " + game.username + "!")
            }
            else {
                $("#waiting-overlay h1").text("Defeat! Good luck next time " + game.username + "...")
            }
        }, 3000)

    }

}