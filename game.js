var config = {
    type:Phaser.CANVAS,
    width:800,
    height:600,
    parent: 'phaser-game',
    autoCenter:Phaser.Scale.Center.CENTER_BOTH,
    physics: {
        default:'arcade',
        arcade: {
            gravity: {y : 2000}
        }
    },
    scene: [ Menu, Marathon, Sprint, Ultra, Master, Ultimate ]
}

var game = new Phaser.Game(config);