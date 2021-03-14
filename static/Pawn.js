class Pawn {
    constructor(model, typename, color) {
        var that = this;

        this.typename = typename;
        this.color = color;
        this.container = new THREE.Object3D;
        this.children;


        game.loader.load(model, function (data) {
            var object = data.scene;

            that.children = object.children[0].children[0]

            var url = "" + typename + "-" + color + ".png"

            var texture = game.textureLoader.load(url);
            texture.flipY = false;

            object.traverse((o) => {
                if (o.isMesh) {
                    o.material.map = texture;
                    o.material.name = typename
                    o.name = "pawn"
                }
            });

            data.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.geometry.center(); // center here
                }
            });

            object.position.set(19, -33, 3);

            data.scene.scale.set(10, 10, 10) // scale here
            object.name = color

            that.container.add(object)


        });


    }

    getColor() {
        return this.color;
    }


    getContainer() {
        return this.container;
    }

    getType() {
        return this.typename
    }

    setColor(rV, gV, bV) {
        var that = this;
        for (var i = 0; i < this.children; i++) {
            that.children[i].material.color = { r: rV, g: gV, b: bV }
        }
    }

}