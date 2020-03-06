//Grid
var grid = new Array(23);
for(var i = 0; i < grid.length; i++) {
    grid[i] = new Array(10);
}

//Block
var block = new Array(3);

//Input
var inputLeft = 0;
var inputRight = 0;
var inputDown = 0;
var inputHardDrop = 0;

//Gravity, DAS, Lock
var gravityCounter = 0;
var gravityLevel = 48;

var dasSensitivity = 10;
var dasSpeed = 2;
var softDropSpeed = 2;

var lockCounter = 0;
var lockLevel = 30;
var lockActions = 0;

//Image
var imageBlockSize = 24;
var imageGridXPos = 20;
var imageGridYPos = 10;

//Text
var textFPS;
var textKeyLeftPressed;
var textKeyRightPressed;
var textKeyDownPressed;
var textHardDropPressed;
var textGravityCounter;
var textLockCounter;
var textLockActions;

//-------------------------------------------
class Sprint extends Phaser.Scene {

    

    constructor(spritenum) {
        
        super({key:"Sprint"});

    }

    

    init() {

        //Initialize the grid
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                grid[i][j] = 0;
            }
        }

        //Initialize the Block
        block[0] = 1;
        block[1] = 3;
        block[2] = 5;

    }

    initializePiece() {

        block[0] = 1;
        block[1] = 2;
        block[2] = 5;
        gravityCounter = gravityLevel + 1;
        lockActions = 0;

    }

    update(delta) {
        
        this.inputs();
        this.execution();
        this.draw();

    }

    
    inputs() {

        if(this.key_LEFT.isDown && !this.key_RIGHT.isDown) {
            inputLeft++;
        } else {
            inputLeft = 0;
        }

        if(this.key_RIGHT.isDown && !this.key_LEFT.isDown) {
            inputRight++;
        } else {
            inputRight = 0;
        }

        if(this.key_DOWN.isDown) {
            inputDown++;
        } else {
            inputDown = 0;
        }

        if(this.key_C.isDown) {
            inputHardDrop++;
        } else {
            inputHardDrop = 0;
        }

    }

    execution() {
        
        if(dasSpeed > 1) {
            if((inputLeft == 1) || ((inputLeft - dasSensitivity) % dasSpeed == 1)) {
                this.moveLeft();
            }
        } else {
            if(inputLeft == 1 || inputLeft > dasSensitivity) {
                if(dasSpeed == 0 && inputLeft > dasSensitivity) {
                    for(let i = 0; i < 10; i++) {
                        this.moveLeft();
                    }
                } else {
                        this.moveLeft();
                }
            } 
        }
        
        if(dasSpeed > 1) {
            if((inputRight == 1) || ((inputRight - dasSensitivity) % dasSpeed == 1)) {
                this.moveRight();
            }
        } else {
            if(inputRight == 1 || inputRight > dasSensitivity) {
                if(dasSpeed == 0 && inputRight > dasSensitivity) {
                    for(let i = 0; i < 10; i++) {
                        this.moveRight();
                    }
                } else {
                        this.moveRight();
                }
            } 
        }

        if(inputHardDrop == 1) {
            
            
            while(block[1] < 22 && grid[block[1]+1][block[2]] == 0) {
                block[1]++;
            }
            this.placeBlock();

        }

        else if(block[1] > 21 || grid[block[1]+1][block[2]] > 0) {

            if(lockCounter > lockLevel || lockActions > 15) {
                this.placeBlock();
            } else {
                lockCounter++;
                gravityCounter = 0;
            }
            
        } else {

            lockCounter = 0;

            if(inputDown > 0 && softDropSpeed < gravityLevel) {
                switch(true) {
                    case (inputDown == 1 && softDropSpeed < 2):
                        if(softDropSpeed == 0) {
                            for(let i = 0; i < grid.length; i++) {
                                this.moveDown();
                            }
                            this.moveDown();
                        } else {
                            this.moveDown();
                        }
                        break;
                    case (inputDown > 1 && softDropSpeed < 2):
                        if(softDropSpeed == 0) {
                            for(let i = 0; i < grid.length; i++) {
                                this.moveDown();
                            }
                            this.moveDown();
                        } else {
                            this.moveDown();
                        }
                        break;
                    case (softDropSpeed > 1 && inputDown % softDropSpeed == 1):
                        this.moveDown();
                        break;
                }
            } else {

                if(gravityCounter > gravityLevel) {
                    this.moveDown();
                    gravityCounter = 0;
                } else {
                    gravityCounter++;
                }

            }

        }

        

    }

    moveLeft() {
        if(block[2] > 0) {
            if(grid[block[1]][block[2]-1] == 0) {

                block[2]--;

                if(lockCounter > 0) {
                    lockActions++;
                    lockCounter = 0;
                }

            }
        }
    }

    moveRight() {
        if(block[2] < 9) {
            if(grid[block[1]][block[2]+1] == 0) {
                
                block[2]++;

                if(lockCounter > 0) {
                lockActions++;
                lockCounter = 0;
                }

            }
        }
    }

    moveDown() {
        if(block[1] < 22) {
            if(grid[block[1]+1][block[2]] == 0) {
                block[1]++;
            }
        }
    }

    placeBlock() {
        grid[block[1]][block[2]] = block[0];
        this.scanGrid();
    }

    scanGrid() {

        

        for(let i = 22; i > 0; i--) {

            let blocksInGrid = 0;

            for(let j = 0; j < grid[i].length; j++) {
                
                if(grid[i][j] > 0) {
                    blocksInGrid++;
                }
            }
            
            if(blocksInGrid == 10) {
                for(let k = i; k > 0; k--) {
                    for(let l = 0; l < grid[k].length; l++) {
                        grid[k][l] = grid[k-1][l];
                    }
                }
                for(let m = 0; m < grid[i].length; m++) {
                    grid[0][m] = 0;
                }
                i++;
            }

        }
        //Top line scan

        let blocksInGrids = 0;

        for(let j = 0; j < grid[0].length; j++) {
            if(grid[0][j] > 0) {
                blocksInGrids++;
            }
        }

        if(blocksInGrids == 10) {
            
            for(let m = 0; m < grid[0].length; m++) {
                grid[0][m] = 0;
            }
        }
       
        this.initializePiece();

    }

    //GRAPHICS
    //==========================================================================================

    preload() {
        this.load.spritesheet('skin', 'assets/skin.png', { frameWidth: 24, frameHeight: 24 });
    }

    create() {

        this.imageGroup = this.add.group();

        
        
        //Input
        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_C = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);


        //Text
        textFPS = this.add.text(400,20,game.loop.actualFps, {font:"20px Arial"});
        textKeyLeftPressed = this.add.text(400,60,inputLeft, {font:"20px Arial"});
        textKeyRightPressed = this.add.text(400,80,inputRight, {font:"20px Arial"});
        textKeyDownPressed = this.add.text(400,100,inputDown, {font:"20px Arial"});
        textGravityCounter = this.add.text(400,120,gravityCounter, {font:"20px Arial"});
        textLockCounter = this.add.text(400,140,lockCounter, {font:"20px Arial"});
        textLockActions = this.add.text(400,160,lockActions, {font:"20px Arial"});
        textHardDropPressed = this.add.text(400,180,inputHardDrop, {font:"20px Arial"});
       
    }

    draw() {
        
        this.imageGroup.clear(true);

        //IMAGES
        //----------------------------------------------------------------------------

        //Grid
        for(var i = 3; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                var image = this.add.image(imageGridXPos+(imageBlockSize*j),imageGridYPos+(imageBlockSize*i), 'skin', grid[i][j]);
                this.imageGroup.add(image);
            }
        }
        //Block
        if(block[1] > 2) {
            var imageBlock = this.add.image(imageGridXPos+(24*block[2]),imageGridYPos+(24*block[1]), 'skin', block[0]);
            this.imageGroup.add(imageBlock);
        }
        


        //TEXT
        //----------------------------------------------------------------------------

        textFPS.setText('FPS: ' + game.loop.actualFps);
        textKeyLeftPressed.setText('Key Left Pressed: ' + inputLeft);
        textKeyRightPressed.setText('Key Right Pressed: ' + inputRight);
        textKeyDownPressed.setText('Key Down Pressed: ' + inputDown);
        textHardDropPressed.setText('Hard Drop Pressed: ' + inputHardDrop);
        textGravityCounter.setText('Gravity Counter: ' + gravityCounter);
        textLockCounter.setText('Lock Counter: ' + lockCounter);
        textLockActions.setText('Lock Actions: ' + lockActions);

    }

}