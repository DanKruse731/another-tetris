var config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics: {
        default:'arcade',
        arcade: {
            gravity: {y : 2000}
        }
    },
    scene: [ Sprint ]
}

var game = new Phaser.Game(config);