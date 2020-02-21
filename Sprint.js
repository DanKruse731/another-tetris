//Integers
var timeElapsed = 0;

//Text
var framesElapsed;

//Grid
var grid = new Array(20);

for(var i = 0; i < grid.length; i++) {
    grid[i] = new Array(10);
}

//-------------------------------------------
class Sprint extends Phaser.Scene {

    

    constructor(spritenum) {
        
        super({key:"Sprint"});

    }

    preload() {
        this.load.spritesheet('skin', 'assets/skin.png', { frameWidth: 24, frameHeight: 24 });
    }

    create() {

        this.imageGroup = this.add.group();

        
        framesElapsed = this.add.text(400,20,'Frames Elapsed: ' + timeElapsed, {font:"20px Arial"});
        
       
    }

    update(delta) {
        this.sans();
        this.draw();
        timeElapsed++;
    }

    sans() {

        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                grid[i][j] = Phaser.Math.Between(0, 7);;
            }
        }
        

    }

    draw() {
        
        this.imageGroup.clear(true);

        //Images

        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                var image = this.add.image(100+(24*j),100+(24*i), 'skin', grid[i][j]);
                this.imageGroup.add(image);
            }
        }

        


        //Text

        framesElapsed.setText('Frames Elapsed: ' + timeElapsed);

    }

}