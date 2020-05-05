//Grid
var grid = new Array(23);
for(var i = 0; i < grid.length; i++) {
    grid[i] = new Array(10);
}

//Game Running
var gameCountdown = true;
var gameCountdownTimer = 30;
var gameCountdownCount = 3;
var gameRunning = true;
var gamePaused = false;
var gameOverDuration;

//Block
var block = new Array(9);

//Input
var inputLeft = 0;
var inputRight = 0;
var inputDown = 0;
var inputHardDrop = 0;
var inputRotCW = 0;
var inputRotCCW = 0;
var inputHold = 0;

//Gravity, DAS, Lock
var gravityCounter = 0;
var gravityLevel = 48;
var gravitySkip = 1;

var dasSensitivity = 10;
var dasSpeed = 2;
var softDropSpeed = 2;

var lockCounter = 0;
var lockLevel = 30;
var lockActions = 0;

//Rotation
rotState = 1;

//NextPieces
var nextPiece1 = 1;
var nextPiece2 = 1;
var nextPiece3 = 1;
var nextPiece4 = 1;
var nextPiece5 = 1;
var nextArray = new Array(7);

//Hold
var holdPiece = 0;
var holdLimit = 0;

//Statistics
var score = 0;
var actionType = "";
var linesClearedAtOnce = 0;
var tSpin = 0;
var combo = 0;
var backToBack = 0;
var level = 1;
var finalSRS = 0;
var linesCleared = 0;
var framesElapsed = 0;
var win = 0;

//Image
var imageBlockSize = 24;
var imageGridXPos = 292;
var imageGridYPos = 0;

//Random Background


//Text
var textScore;
var textLinesCleared;
var textLevel;
var textTimer;
var textMode;
var textLinesRemaining;
var textPaused;
var textAction;

var textFlash;

//-------------------------------------------
class Ultra extends Phaser.Scene {

    
    constructor() {
        super({key:"Ultra"});
    }
    

    init(data) {

        

        gameCountdown = true;
        gameCountdownTimer = 30;
        gameCountdownCount = 3;
        gameRunning = true;
        gamePaused = false;
        gameOverDuration = 60;

        //Initialize the grid
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                grid[i][j] = 0;
            }
        }

        //Input
        inputLeft = 0;
        inputRight = 0;
        inputDown = 0;
        inputHardDrop = 0;
        inputRotCW = 0;
        inputRotCCW = 0;
        inputHold = 0;

        //Gravity, DAS, Lock
        gravityCounter = 0;
        gravityLevel = 48;
        gravitySkip = 1;

        lockCounter = 0;
        lockLevel = 30;
        lockActions = 0;

        //Rotation
        rotState = 1;

        //NextPieces
        nextPiece1 = 1;
        nextPiece2 = 1;
        nextPiece3 = 1;
        nextPiece4 = 1;
        nextPiece5 = 1;
        nextArray = new Array(7);

        //Hold
        holdPiece = 0;
        holdLimit = 0;

        //Statistics
        score = 0;
        actionType = "";
        linesClearedAtOnce = 0;
        tSpin = 0;
        combo = 0;
        backToBack = 0;
        level = 1;
        finalSRS = 0;
        linesCleared = 0;
        framesElapsed = 10800;
        win = 0;

        //Text Flash
        textFlash = 0;

        nextArray = [1, 2, 3, 4, 5, 6, 7];
        this.shuffle(nextArray);
        nextPiece1 = nextArray[0];
        nextArray.shift();
        nextPiece2 = nextArray[0];
        nextArray.shift();
        nextPiece3 = nextArray[0];
        nextArray.shift();
        nextPiece4 = nextArray[0];
        nextArray.shift();
        nextPiece5 = nextArray[0];
        nextArray.shift();

        this.initializePiece();

    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    initializePiece() {
        
        if(inputHold == 1) {
            this.soundFX = this.sound.add("hold");
            this.soundFX.play();
            if(holdPiece == 0) {
                if(nextArray.length == 0) {
                    nextArray = [1, 2, 3, 4, 5, 6, 7];
                    this.shuffle(nextArray);
                }
                holdPiece = block[0];
                block[0] = nextPiece1;
                nextPiece1 = nextPiece2;
                nextPiece2 = nextPiece3;
                nextPiece3 = nextPiece4;
                nextPiece4 = nextPiece5;
                nextPiece5 = nextArray[0];
                nextArray.shift();
            } else {
                let transfer = block[0];
                block[0] = holdPiece;
                holdPiece = transfer;
            }
            holdLimit = 1;
        } else {
            if(nextArray.length == 0) {
                nextArray = [1, 2, 3, 4, 5, 6, 7];
                this.shuffle(nextArray);
            }
            block[0] = nextPiece1;
            nextPiece1 = nextPiece2;
            nextPiece2 = nextPiece3;
            nextPiece3 = nextPiece4;
            nextPiece4 = nextPiece5;
            nextPiece5 = nextArray[0];
            nextArray.shift();
        }

        

        switch(block[0]) {
            case 1:
                block[1] = 1;
                block[2] = 3;
                block[3] = 1;
                block[4] = 4;
                block[5] = 2;
                block[6] = 4;
                block[7] = 2;
                block[8] = 5;
                break;
            case 2:
                block[1] = 2;
                block[2] = 3;
                block[3] = 2;
                block[4] = 4;
                block[5] = 2;
                block[6] = 5;
                block[7] = 1;
                block[8] = 5;
                break;
            case 3:
                block[1] = 2;
                block[2] = 4;
                block[3] = 1;
                block[4] = 4;
                block[5] = 1;
                block[6] = 5;
                block[7] = 2;
                block[8] = 5;
                break;
            case 4:
                block[1] = 2;
                block[2] = 3;
                block[3] = 2;
                block[4] = 4;
                block[5] = 1;
                block[6] = 4;
                block[7] = 1;
                block[8] = 5;
                break;
            case 5:
                block[1] = 2;
                block[2] = 3;
                block[3] = 2;
                block[4] = 4;
                block[5] = 2;
                block[6] = 5;
                block[7] = 2;
                block[8] = 6;
                break;
            case 6:
                block[1] = 1;
                block[2] = 3;
                block[3] = 2;
                block[4] = 3;
                block[5] = 2;
                block[6] = 4;
                block[7] = 2;
                block[8] = 5;
                break;
            case 7:
                block[1] = 2;
                block[2] = 3;
                block[3] = 2;
                block[4] = 4;
                block[5] = 1;
                block[6] = 4;
                block[7] = 2;
                block[8] = 5;
                break;
        }

        gravityCounter = gravityLevel + 1;
        lockActions = 0;
        rotState = 1;
        tSpin = 0;

        if(grid[block[1]][block[2]] > 0 ||
           grid[block[3]][block[4]] > 0 ||
           grid[block[5]][block[6]] > 0 ||
           grid[block[7]][block[8]] > 0) {

           gameRunning = false;

        }

    }

    update(delta) {
        if(framesElapsed < 0) {
            gameRunning = false;
            win = 1;
        }
        if(gameRunning) {
            if(gameCountdown) {
                this.countdown();
            }
            else if(gamePaused) {
                
            } else {
            this.inputs();
            this.execution();
            this.draw();
            framesElapsed--;
            }
        } else {
            if(win == 1) {
                this.add.image(400,300,'gameovergood');
            } else {
                this.add.image(400,300,'gameoverbad');
            }
            this.add.text(20,550,"Press Q to Return to Menu", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#00FFFF"});
        }
    }
    
    inputs() {

        if(this.key_SHIFT.isDown) {
            inputHold++;
        } else {
            inputHold = 0;
        }

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

        if(this.key_X.isDown) {
            inputRotCW++;
        } else {
            inputRotCW = 0;
        }

        if(this.key_Z.isDown) {
            inputRotCCW++;
        } else {
            inputRotCCW = 0;
        }

    }

    execution() {

        if(inputHold == 1 && holdLimit == 0) {
            console.log(inputHold);
            this.initializePiece();
        }
        
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

        if(inputRotCW == 1) {
            this.rotateClockwise();
        }

        if(inputRotCCW == 1) {
            this.rotateCounterClockwise();
        }

        if(inputHardDrop == 1) {
            
            
            while(block[1] < 22 && grid[block[1]+1][block[2]] == 0 &&
                  block[3] < 22 && grid[block[3]+1][block[4]] == 0 &&
                  block[5] < 22 && grid[block[5]+1][block[6]] == 0 &&
                  block[7] < 22 && grid[block[7]+1][block[8]] == 0) {

                block[1]++;
                block[3]++;
                block[5]++;
                block[7]++;
                tSpin = 0;
                score += 2;

            }
            this.placeBlock();

        }

        else if(block[1] > 21 || grid[block[1]+1][block[2]] > 0 ||
                block[3] > 21 || grid[block[3]+1][block[4]] > 0 ||
                block[5] > 21 || grid[block[5]+1][block[6]] > 0 ||
                block[7] > 21 || grid[block[7]+1][block[8]] > 0) {

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
                                score++;
                            }
                            this.moveDown();
                            score++;
                        } else {
                            this.moveDown();
                            score++;
                        }
                        break;
                    case (inputDown > 1 && softDropSpeed < 2):
                        if(softDropSpeed == 0) {
                            for(let i = 0; i < grid.length; i++) {
                                this.moveDown();
                                score++;
                            }
                            this.moveDown();
                            score++;
                        } else {
                            this.moveDown();
                            score++;
                        }
                        break;
                    case (softDropSpeed > 1 && inputDown % softDropSpeed == 1):
                        this.moveDown();
                        score++;
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
        if(block[2] > 0 && block[4] > 0 && block[6] > 0 && block[8] > 0) {
            if(grid[block[1]][block[2]-1] == 0 && grid[block[3]][block[4]-1] == 0 && grid[block[5]][block[6]-1] == 0 && grid[block[7]][block[8]-1] == 0) {

                block[2]--;
                block[4]--;
                block[6]--;
                block[8]--;
                tSpin = 0;

                if(lockCounter > 0) {
                    lockActions++;
                    lockCounter = 0;
                }

            }
        }
    }

    moveRight() {
        if(block[2] < 9 && block[4] < 9 && block[6] < 9 && block[2] < 9) {
            if(grid[block[1]][block[2]+1] == 0 && grid[block[3]][block[4]+1] == 0 && grid[block[5]][block[6]+1] == 0 && grid[block[7]][block[8]+1] == 0) {
                
                block[2]++;
                block[4]++;
                block[6]++;
                block[8]++;
                tSpin = 0;

                if(lockCounter > 0) {
                lockActions++;
                lockCounter = 0;
                }

            }
        }
    }

    moveDown() {
        for(let i = 0; i < gravitySkip; i++) {
            if(block[1] < 22 && block[3] < 22 && block[5] < 22 && block[7] < 22) {
                if(grid[block[1]+1][block[2]] == 0 && grid[block[3]+1][block[4]] == 0 && grid[block[5]+1][block[6]] == 0 && grid[block[7]+1][block[8]] == 0) {
                    block[1]++;
                    block[3]++;
                    block[5]++;
                    block[7]++;
                    tSpin = 0;
                }
            }
        }
    }

    rotateCheck(rotTest) {
        let counter = 0;
        if(block[1] + rotTest[0] > 22 || block[1] + rotTest[0] < 0) counter++;
        if(block[2] + rotTest[1] > 9 || block[2] + rotTest[1] < 0) counter++;
        if(block[3] + rotTest[2] > 22 || block[3] + rotTest[2] < 0) counter++;
        if(block[4] + rotTest[3] > 9 || block[4] + rotTest[3] < 0) counter++;
        if(block[5] + rotTest[4] > 22 || block[5] + rotTest[4] < 0) counter++;
        if(block[6] + rotTest[5] > 9 || block[6] + rotTest[5] < 0) counter++;
        if(block[7] + rotTest[6] > 22 || block[7] + rotTest[6] < 0) counter++;
        if(block[8] + rotTest[7] > 9 || block[8] + rotTest[7] < 0) counter++;

        if(counter == 0) {
            if(grid[block[1]+rotTest[0]][block[2]+rotTest[1]] > 0) counter++;
            if(grid[block[3]+rotTest[2]][block[4]+rotTest[3]] > 0) counter++;
            if(grid[block[5]+rotTest[4]][block[6]+rotTest[5]] > 0) counter++;
            if(grid[block[7]+rotTest[6]][block[8]+rotTest[7]] > 0) counter++;
        }
        if(counter == 0) {
            return true;
        } else {
            return false;
        }
        
    }

    rotateConfirm(rotateTested, state) {
        this.soundFX = this.sound.add("rotatecw");
        this.soundFX.play();
        for(let i = 0; i < rotateTested.length; i++) {
            block[i+1] += rotateTested[i];
        }
        rotState = state;
        if(lockCounter > 0) {
            lockCounter = 0;
            lockActions++;
        }
        if(block[0] == 7) {
            this.tSpinCheck();
        }
    }

    tSpinCheck() {
        let frontFill = 0;
        let backFill = 0;
        tSpin = 0;

        /*
            T-SPIN CHECK
            ==========================================================================
            3 Filled Corners required for a T-Spin / T-Spin Mini
            Regular T-Spin: Either 2 front corners must be filled or used final SRS check.
        */

        switch(rotState) {
            case 1:
                if(block[3]+1 > 22) { backFill = 2; }
                else {
                    if(grid[block[3]+1][block[4]-1] > 0) { backFill++; }
                    if(grid[block[3]+1][block[4]+1] > 0) { backFill++; }
                }
                if(grid[block[3]-1][block[4]-1] > 0) { frontFill++; }
                if(grid[block[3]-1][block[4]+1] > 0) { frontFill++; }

                if(frontFill + backFill >= 3) { tSpin = 1; 
                if(frontFill == 2 || finalSRS == 1) { tSpin = 2; }}
                break;
            case 2:
                if(block[4]-1 < 0) { backFill = 2; }
                else {
                    if(grid[block[3]-1][block[4]-1] > 0) { backFill++; }
                    if(grid[block[3]+1][block[4]-1] > 0) { backFill++; }
                }
                if(grid[block[3]-1][block[4]+1] > 0) { frontFill++; }
                if(grid[block[3]+1][block[4]+1] > 0) { frontFill++; }
    
                if(frontFill + backFill >= 3) { tSpin = 1; 
                if(frontFill == 2 || finalSRS == 1) { tSpin = 2; }}
                break;
            case 3:
                if(block[3]-1 < 0) { backFill = 2; }
                else {
                    if(grid[block[3]-1][block[4]-1] > 0) { backFill++; }
                    if(grid[block[3]-1][block[4]+1] > 0) { backFill++; }
                }
                if(grid[block[3]+1][block[4]-1] > 0) { frontFill++; }
                if(grid[block[3]+1][block[4]+1] > 0) { frontFill++; }
        
                if(frontFill + backFill >= 3) { tSpin = 1; 
                if(frontFill == 2 || finalSRS == 1) { tSpin = 2; }}
                break;
            case 4:
                if(block[4]+1 > 9) { backFill = 2; }
                else {
                    if(grid[block[3]-1][block[4]+1] > 0) { backFill++; }
                    if(grid[block[3]+1][block[4]+1] > 0) { backFill++; }
                }
                if(grid[block[3]-1][block[4]-1] > 0) { frontFill++; }
                if(grid[block[3]+1][block[4]-1] > 0) { frontFill++; }
            
                if(frontFill + backFill >= 3) { tSpin = 1; 
                if(frontFill == 2 || finalSRS == 1) { tSpin = 2; }}
                break;
        }




    }

    superRotationCheckJLSZT(superRotTest, rotDir) {
        switch(rotDir) {
            case 1:
                //Counter Clockwise
                switch(rotState) {

                    case 1:
                        superRotTest[1]++;
                        superRotTest[3]++;
                        superRotTest[5]++;
                        superRotTest[7]++;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 4);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]--;
                            superRotTest[2]--;
                            superRotTest[4]--;
                            superRotTest[6]--;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 4);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] += 3;
                                superRotTest[1]--;
                                superRotTest[2] += 3;
                                superRotTest[3]--;
                                superRotTest[4] += 3;
                                superRotTest[5]--;
                                superRotTest[6] += 3;
                                superRotTest[7]--;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 4);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]++;
                                    superRotTest[3]++;
                                    superRotTest[5]++;
                                    superRotTest[7]++;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 4);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                    case 2:
                        superRotTest[1]++;
                        superRotTest[3]++;
                        superRotTest[5]++;
                        superRotTest[7]++;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 1);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]++;
                            superRotTest[2]++;
                            superRotTest[4]++;
                            superRotTest[6]++;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 1);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] -= 3;
                                superRotTest[1]--;
                                superRotTest[2] -= 3;
                                superRotTest[3]--;
                                superRotTest[4] -= 3;
                                superRotTest[5]--;
                                superRotTest[6] -= 3;
                                superRotTest[7]--;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 1);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]++;
                                    superRotTest[3]++;
                                    superRotTest[5]++;
                                    superRotTest[7]++;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 1);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                    case 3:
                        superRotTest[1]--;
                        superRotTest[3]--;
                        superRotTest[5]--;
                        superRotTest[7]--;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 2);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]--;
                            superRotTest[2]--;
                            superRotTest[4]--;
                            superRotTest[6]--;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 2);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] += 3;
                                superRotTest[1]++;
                                superRotTest[2] += 3;
                                superRotTest[3]++;
                                superRotTest[4] += 3;
                                superRotTest[5]++;
                                superRotTest[6] += 3;
                                superRotTest[7]++;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 2);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]--;
                                    superRotTest[3]--;
                                    superRotTest[5]--;
                                    superRotTest[7]--;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 2);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                    case 4:
                        superRotTest[1]--;
                        superRotTest[3]--;
                        superRotTest[5]--;
                        superRotTest[7]--;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 3);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]++;
                            superRotTest[2]++;
                            superRotTest[4]++;
                            superRotTest[6]++;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 3);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] -= 3;
                                superRotTest[1]++;
                                superRotTest[2] -= 3;
                                superRotTest[3]++;
                                superRotTest[4] -= 3;
                                superRotTest[5]++;
                                superRotTest[6] -= 3;
                                superRotTest[7]++;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 3);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]--;
                                    superRotTest[3]--;
                                    superRotTest[5]--;
                                    superRotTest[7]--;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 3);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                }
                break;
            case 2:

                //Clockwise
                switch(rotState) {

                    case 1:
                        superRotTest[1]--;
                        superRotTest[3]--;
                        superRotTest[5]--;
                        superRotTest[7]--;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 2);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]--;
                            superRotTest[2]--;
                            superRotTest[4]--;
                            superRotTest[6]--;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 2);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] += 3;
                                superRotTest[1]++;
                                superRotTest[2] += 3;
                                superRotTest[3]++;
                                superRotTest[4] += 3;
                                superRotTest[5]++;
                                superRotTest[6] += 3;
                                superRotTest[7]++;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 2);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]--;
                                    superRotTest[3]--;
                                    superRotTest[5]--;
                                    superRotTest[7]--;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 2);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                    case 2:
                        superRotTest[1]++;
                        superRotTest[3]++;
                        superRotTest[5]++;
                        superRotTest[7]++;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 3);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]++;
                            superRotTest[2]++;
                            superRotTest[4]++;
                            superRotTest[6]++;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 3);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] -= 3;
                                superRotTest[1]--;
                                superRotTest[2] -= 3;
                                superRotTest[3]--;
                                superRotTest[4] -= 3;
                                superRotTest[5]--;
                                superRotTest[6] -= 3;
                                superRotTest[7]--;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 3);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]++;
                                    superRotTest[3]++;
                                    superRotTest[5]++;
                                    superRotTest[7]++;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 3);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                    case 3:
                        superRotTest[1]++;
                        superRotTest[3]++;
                        superRotTest[5]++;
                        superRotTest[7]++;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 4);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]--;
                            superRotTest[2]--;
                            superRotTest[4]--;
                            superRotTest[6]--;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 4);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] += 3;
                                superRotTest[1]--;
                                superRotTest[2] += 3;
                                superRotTest[3]--;
                                superRotTest[4] += 3;
                                superRotTest[5]--;
                                superRotTest[6] += 3;
                                superRotTest[7]--;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 4);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]++;
                                    superRotTest[3]++;
                                    superRotTest[5]++;
                                    superRotTest[7]++;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 4);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                    case 4:
                        superRotTest[1]--;
                        superRotTest[3]--;
                        superRotTest[5]--;
                        superRotTest[7]--;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 1);
                            finalSRS = 0;
                        } else {
                            superRotTest[0]++;
                            superRotTest[2]++;
                            superRotTest[4]++;
                            superRotTest[6]++;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 1);
                                finalSRS = 0;
                            } else {
                                superRotTest[0] -= 3;
                                superRotTest[1]++;
                                superRotTest[2] -= 3;
                                superRotTest[3]++;
                                superRotTest[4] -= 3;
                                superRotTest[5]++;
                                superRotTest[6] -= 3;
                                superRotTest[7]++;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 1);
                                    finalSRS = 0;
                                } else {
                                    superRotTest[1]--;
                                    superRotTest[3]--;
                                    superRotTest[5]--;
                                    superRotTest[7]--;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 1);
                                        finalSRS = 1;
                                    }
                                }
                            }
                        }
                        break;
                }
                break;
        }
    }

    superRotationCheckI(superRotTest, rotDir) {
        switch(rotDir) {
            case 1:
                //Counter Clockwise
                switch(rotState) {

                    case 1:
                        superRotTest[1]--;
                        superRotTest[3]--;
                        superRotTest[5]--;
                        superRotTest[7]--;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 4);
                        } else {
                            superRotTest[1] += 3;
                            superRotTest[3] += 3;
                            superRotTest[5] += 3;
                            superRotTest[7] += 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 4);
                            } else {
                                superRotTest[0] -= 2;
                                superRotTest[1] -= 3;
                                superRotTest[2] -= 2;
                                superRotTest[3] -= 3;
                                superRotTest[4] -= 2;
                                superRotTest[5] -= 3;
                                superRotTest[6] -= 2;
                                superRotTest[7] -= 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 4);
                                } else {
                                    superRotTest[0] += 3;
                                    superRotTest[1] += 3;
                                    superRotTest[2] += 3;
                                    superRotTest[3] += 3;
                                    superRotTest[4] += 3;
                                    superRotTest[5] += 3;
                                    superRotTest[6] += 3;
                                    superRotTest[7] += 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 4);
                                    }
                                }
                            }
                        }
                        break;
                    case 2:
                        superRotTest[1] += 2;
                        superRotTest[3] += 2;
                        superRotTest[5] += 2;
                        superRotTest[7] += 2;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 1);
                        } else {
                            superRotTest[1] -= 3;
                            superRotTest[3] -= 3;
                            superRotTest[5] -= 3;
                            superRotTest[7] -= 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 1);
                            } else {
                                superRotTest[0]--;
                                superRotTest[1] += 3;
                                superRotTest[2]--;
                                superRotTest[3] += 3;
                                superRotTest[4]--;
                                superRotTest[5] += 3;
                                superRotTest[6]--;
                                superRotTest[7] += 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 1);
                                } else {
                                    superRotTest[0] += 3;
                                    superRotTest[1] -= 3;
                                    superRotTest[2] += 3;
                                    superRotTest[3] -= 3;
                                    superRotTest[4] += 3;
                                    superRotTest[5] -= 3;
                                    superRotTest[6] += 3;
                                    superRotTest[7] -= 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 1);
                                    }
                                }
                            }
                        }
                        break;
                    case 3:
                        superRotTest[1]++;
                        superRotTest[3]++;
                        superRotTest[5]++;
                        superRotTest[7]++;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 2);
                        } else {
                            superRotTest[1] -= 3;
                            superRotTest[3] -= 3;
                            superRotTest[5] -= 3;
                            superRotTest[7] -= 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 2);
                            } else {
                                superRotTest[0] += 2;
                                superRotTest[1] += 3;
                                superRotTest[2] += 2;
                                superRotTest[3] += 3;
                                superRotTest[4] += 2;
                                superRotTest[5] += 3;
                                superRotTest[6] += 2;
                                superRotTest[7] += 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 2);
                                } else {
                                    superRotTest[0] -= 3;
                                    superRotTest[1] -= 3;
                                    superRotTest[2] -= 3;
                                    superRotTest[3] -= 3;
                                    superRotTest[4] -= 3;
                                    superRotTest[5] -= 3;
                                    superRotTest[6] -= 3;
                                    superRotTest[7] -= 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 2);
                                    }
                                }
                            }
                        }
                        break;
                    case 4:
                        superRotTest[1] -= 2;
                        superRotTest[3] -= 2;
                        superRotTest[5] -= 2;
                        superRotTest[7] -= 2;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 3);
                        } else {
                            superRotTest[1] += 3;
                            superRotTest[3] += 3;
                            superRotTest[5] += 3;
                            superRotTest[7] += 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 3);
                            } else {
                                superRotTest[0]++;
                                superRotTest[1] -= 3;
                                superRotTest[2]++;
                                superRotTest[3] -= 3;
                                superRotTest[4]++;
                                superRotTest[5] -= 3;
                                superRotTest[6]++;
                                superRotTest[7] -= 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 3);
                                } else {
                                    superRotTest[0] -= 3;
                                    superRotTest[1] += 3;
                                    superRotTest[2] -= 3;
                                    superRotTest[3] += 3;
                                    superRotTest[4] -= 3;
                                    superRotTest[5] += 3;
                                    superRotTest[6] -= 3;
                                    superRotTest[7] += 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 3);
                                    }
                                }
                            }
                        }
                        break;
                }
                break;
            case 2:

                //Clockwise
                switch(rotState) {

                    case 1:
                        superRotTest[1] -= 2;
                        superRotTest[3] -= 2;
                        superRotTest[5] -= 2;
                        superRotTest[7] -= 2;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 2);
                        } else {
                            superRotTest[1] += 3;
                            superRotTest[3] += 3;
                            superRotTest[5] += 3;
                            superRotTest[7] += 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 2);
                            } else {
                                superRotTest[0]++;
                                superRotTest[1] -= 3;
                                superRotTest[2]++;
                                superRotTest[3] -= 3;
                                superRotTest[4]++;
                                superRotTest[5] -= 3;
                                superRotTest[6]++;
                                superRotTest[7] -= 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 2);
                                } else {
                                    superRotTest[0] -= 3;
                                    superRotTest[1] += 3;
                                    superRotTest[2] -= 3;
                                    superRotTest[3] += 3;
                                    superRotTest[4] -= 3;
                                    superRotTest[5] += 3;
                                    superRotTest[6] -= 3;
                                    superRotTest[7] += 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 2);
                                    }
                                }
                            }
                        }
                        break;
                    case 2:
                        superRotTest[1]--;
                        superRotTest[3]--;
                        superRotTest[5]--;
                        superRotTest[7]--;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 3);
                        } else {
                            superRotTest[1] += 3;
                            superRotTest[3] += 3;
                            superRotTest[5] += 3;
                            superRotTest[7] += 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 3);
                            } else {
                                superRotTest[0] -= 2;
                                superRotTest[1] -= 3;
                                superRotTest[2] -= 2;
                                superRotTest[3] -= 3;
                                superRotTest[4] -= 2;
                                superRotTest[5] -= 3;
                                superRotTest[6] -= 2;
                                superRotTest[7] -= 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 3);
                                } else {
                                    superRotTest[0] += 3;
                                    superRotTest[1] += 3;
                                    superRotTest[2] += 3;
                                    superRotTest[3] += 3;
                                    superRotTest[4] += 3;
                                    superRotTest[5] += 3;
                                    superRotTest[6] += 3;
                                    superRotTest[7] += 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 3);
                                    }
                                }
                            }
                        }
                        break;
                    case 3:
                        superRotTest[1] += 2;
                        superRotTest[3] += 2;
                        superRotTest[5] += 2;
                        superRotTest[7] += 2;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 4);
                        } else {
                            superRotTest[1] -= 3;
                            superRotTest[3] -= 3;
                            superRotTest[5] -= 3;
                            superRotTest[7] -= 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 4);
                            } else {
                                superRotTest[0]--;
                                superRotTest[1] += 3;
                                superRotTest[2]--;
                                superRotTest[3] += 3;
                                superRotTest[4]--;
                                superRotTest[5] += 3;
                                superRotTest[6]--;
                                superRotTest[7] += 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 4);
                                } else {
                                    superRotTest[0] += 3;
                                    superRotTest[1] -= 3;
                                    superRotTest[2] += 3;
                                    superRotTest[3] -= 3;
                                    superRotTest[4] += 3;
                                    superRotTest[5] -= 3;
                                    superRotTest[6] += 3;
                                    superRotTest[7] -= 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 4);
                                    }
                                }
                            }
                        }
                        break;
                    case 4:
                        superRotTest[1]++;
                        superRotTest[3]++;
                        superRotTest[5]++;
                        superRotTest[7]++;
                        if(this.rotateCheck(superRotTest)) {
                            this.rotateConfirm(superRotTest, 1);
                        } else {
                            superRotTest[1] -= 3;
                            superRotTest[3] -= 3;
                            superRotTest[5] -= 3;
                            superRotTest[7] -= 3;
                            if(this.rotateCheck(superRotTest)) {
                                this.rotateConfirm(superRotTest, 1);
                            } else {
                                superRotTest[0] += 2;
                                superRotTest[1] += 3;
                                superRotTest[2] += 2;
                                superRotTest[3] += 3;
                                superRotTest[4] += 2;
                                superRotTest[5] += 3;
                                superRotTest[6] += 2;
                                superRotTest[7] += 3;
                                if(this.rotateCheck(superRotTest)) {
                                    this.rotateConfirm(superRotTest, 1);
                                } else {
                                    superRotTest[0] -= 3;
                                    superRotTest[1] -= 3;
                                    superRotTest[2] -= 3;
                                    superRotTest[3] -= 3;
                                    superRotTest[4] -= 3;
                                    superRotTest[5] -= 3;
                                    superRotTest[6] -= 3;
                                    superRotTest[7] -= 3;
                                    if(this.rotateCheck(superRotTest)) {
                                        this.rotateConfirm(superRotTest, 1);
                                    }
                                }
                            }
                        }
                        break;
                }
                break;
        }
    }

    rotateClockwise() {
        finalSRS = 0;
        let rotateTest = new Array(8);
        switch(block[0]) {
            case 1:
                switch(rotState) {
                    case 1:
                        rotateTest = [0,2,1,1,0,0,1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        } else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 2:
                        rotateTest = [2,0,1,-1,0,0,-1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 3:
                        rotateTest = [0,-2,-1,-1,0,0,-1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 4:
                        rotateTest = [-2,0,-1,1,0,0,1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                }
                break;
            case 2:
                switch(rotState) {
                    case 1:
                        rotateTest = [-1,1,0,0,1,-1,2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 2:
                        rotateTest = [1,1,0,0,-1,-1,0,-2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 3:
                        rotateTest = [1,-1,0,0,-1,1,-2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 4:
                        rotateTest = [-1,-1,0,0,1,1,0,2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                }
                break;
            case 3:
                if(lockCounter > 0) {
                lockCounter = 0;
                lockActions++;
                }
                break;
            case 4:
                switch(rotState) {
                    case 1:
                        rotateTest = [-1,1,0,0,1,1,2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 2:
                        rotateTest = [1,1,0,0,1,-1,0,-2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 3:
                        rotateTest = [1,-1,0,0,-1,-1,-2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 4:
                        rotateTest = [-1,-1,0,0,-1,1,0,2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                }
                break;
            case 5:
                switch(rotState) {
                    case 1:
                        rotateTest = [-1,2,0,1,1,0,2,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckI(rotateTest, 2);
                        }
                        break;
                    case 2:
                        rotateTest = [2,1,1,0,0,-1,-1,-2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckI(rotateTest, 2);
                        }
                        break;
                    case 3:
                        rotateTest = [1,-2,0,-1,-1,0,-2,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckI(rotateTest, 2);
                        }
                        break;
                    case 4:
                        rotateTest = [-2,-1,-1,0,0,1,1,2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckI(rotateTest, 2);
                        }
                        break;
                }
                break;
            case 6:
                switch(rotState) {
                    case 1:
                        rotateTest = [0,2,-1,1,0,0,1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 2:
                        rotateTest = [2,0,1,1,0,0,-1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 3:
                        rotateTest = [0,-2,1,-1,0,0,-1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 4:
                        rotateTest = [-2,0,-1,-1,0,0,1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                }
                break;
            case 7:
                switch(rotState) {
                    case 1:
                        rotateTest = [-1,1,0,0,1,1,1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 2:
                        rotateTest = [1,1,0,0,1,-1,-1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 3:
                        rotateTest = [1,-1,0,0,-1,-1,-1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                    case 4:
                        rotateTest = [-1,-1,0,0,-1,1,1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 2);
                        }
                        break;
                }
                break;
            
        }
        
    }

    rotateCounterClockwise() {
        finalSRS = 0;
        let rotateTest = new Array(8);
        switch(block[0]) {
            case 1:
                switch(rotState) {
                    case 1:
                        rotateTest = [2,0,1,-1,0,0,-1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 4:
                        rotateTest = [0,2,1,1,0,0,1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 3:
                        rotateTest = [-2,0,-1,1,0,0,1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 2:
                        rotateTest = [0,-2,-1,-1,0,0,-1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                }
                break;
            case 2:
                switch(rotState) {
                    case 1:
                        rotateTest = [1,1,0,0,-1,-1,0,-2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 4:
                        rotateTest = [-1,1,0,0,1,-1,2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 3:
                        rotateTest = [-1,-1,0,0,1,1,0,2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 2:
                        rotateTest = [1,-1,0,0,-1,1,-2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                }
                break;
            case 3:
                if(lockCounter > 0) {
                lockCounter = 0;
                lockActions++;
                }
                break;
            case 4:
                switch(rotState) {
                    case 1:
                        rotateTest = [1,1,0,0,1,-1,0,-2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 4:
                        rotateTest = [-1,1,0,0,1,1,2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 3:
                        rotateTest = [-1,-1,0,0,-1,1,0,2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 2:
                        rotateTest = [1,-1,0,0,-1,-1,-2,0];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                }
                break;
            case 5:
                switch(rotState) {
                    case 1:
                        rotateTest = [2,1,1,0,0,-1,-1,-2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckI(rotateTest, 1);
                        }
                        break;
                    case 4:
                        rotateTest = [-1,2,0,1,1,0,2,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckI(rotateTest, 1);
                        }
                        break;
                    case 3:
                        rotateTest = [-2,-1,-1,0,0,1,1,2];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckI(rotateTest, 1);
                        }
                        break;
                    case 2:
                        rotateTest = [1,-2,0,-1,-1,0,-2,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckI(rotateTest, 1);
                        }
                        break;
                }
                break;
            case 6:
                switch(rotState) {
                    case 1:
                        rotateTest = [2,0,1,1,0,0,-1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 4:
                        rotateTest = [0,2,-1,1,0,0,1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 3:
                        rotateTest = [-2,0,-1,-1,0,0,1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 2:
                        rotateTest = [0,-2,1,-1,0,0,-1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                }
                break;
            case 7:
                switch(rotState) {
                    case 1:
                        rotateTest = [1,1,0,0,1,-1,-1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 4);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 4:
                        rotateTest = [-1,1,0,0,1,1,1,-1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 3);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 3:
                        rotateTest = [-1,-1,0,0,-1,1,1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 2);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                    case 2:
                        rotateTest = [1,-1,0,0,-1,-1,-1,1];
                        if(this.rotateCheck(rotateTest)) {
                            this.rotateConfirm(rotateTest, 1);
                        }else {
                            this.superRotationCheckJLSZT(rotateTest, 1);
                        }
                        break;
                }
                break;
            
        }
    }

    placeBlock() {
        this.soundFX = this.sound.add("lock");
        this.soundFX.play();
        grid[block[1]][block[2]] = block[0];
        grid[block[3]][block[4]] = block[0];
        grid[block[5]][block[6]] = block[0];
        grid[block[7]][block[8]] = block[0];
        this.scanGrid();
    }

    scanGrid() {

        linesClearedAtOnce = 0;

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
                linesClearedAtOnce++;
                linesCleared++;
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
            linesClearedAtOnce++;
            linesCleared++;
        }
       
        this.addScore();

        holdLimit = 0;
        this.initializePiece();

    }

    addScore() {
        switch(linesClearedAtOnce) {
            case 0:
                switch(tSpin) {
                    case 0:
                        actionType = "";
                        break;
                    case 1:
                        actionType = "T-Spin Mini";
                        score += 100*level;
                        this.soundFX = this.sound.add("tspin0");
                        this.soundFX.play();
                        break;
                    case 2:
                        actionType = "T-Spin";
                        score += 400*level;
                        this.soundFX = this.sound.add("tspin0");
                        this.soundFX.play();
                        break;
                }
                combo = 0;
                break;
            case 1:
                switch(tSpin) {
                    case 0:
                        actionType = "Single";    
                        score += 100*level;
                        backToBack = 0;
                        this.soundFX = this.sound.add("clear123");
                        this.soundFX.play();
                        break;
                    case 1:
                        actionType = "T-Spin Mini Single";
                        if(backToBack == 1) {
                            score += 300*level;
                            this.soundFX = this.sound.add("backtoback");
                            this.soundFX.play();
                            actionType += "\nBack-to-Back";
                        } else {
                            score += 200*level;
                            this.soundFX = this.sound.add("clear4");
                            this.soundFX.play();
                        }
                        backToBack = 1;
                        break;
                    case 2:
                        actionType = "T-Spin Single";
                        if(backToBack == 1) {
                            score += 1200*level;
                            this.soundFX = this.sound.add("backtoback");
                            this.soundFX.play();
                            actionType += "\nBack-to-Back";
                        } else {
                            score += 800*level;
                            this.soundFX = this.sound.add("clear4");
                            this.soundFX.play();
                        }
                        backToBack = 1;
                        break;
                }
                combo++;
                break;
            case 2:
                switch(tSpin) {
                    case 0:
                        actionType = "Double";    
                        score += 300*level;
                        backToBack = 0;
                        this.soundFX = this.sound.add("clear123");
                        this.soundFX.play();
                        break;
                    case 1:
                        actionType = "T-Spin Mini Double";
                        if(backToBack == 1) {
                            score += 600*level;
                            this.soundFX = this.sound.add("backtoback");
                            this.soundFX.play();
                            actionType += "\nBack-to-Back";
                        } else {
                            score += 400*level;
                            this.soundFX = this.sound.add("clear4");
                            this.soundFX.play();
                        }
                        backToBack = 1;
                        break;
                    case 2:
                        actionType = "T-Spin Double";
                        if(backToBack == 1) {
                            score += 1800*level;
                            this.soundFX = this.sound.add("backtoback");
                            this.soundFX.play();
                            actionType += "\nBack-to-Back";
                        } else {
                            score += 1200*level;
                            this.soundFX = this.sound.add("clear4");
                            this.soundFX.play();
                        }
                        backToBack = 1;
                        break;
                }
                combo++;
                break;
            case 3:
                switch(tSpin) {
                    case 0:
                        actionType = "Triple";    
                        score += 500*level;
                        backToBack = 0;
                        this.soundFX = this.sound.add("clear123");
                        this.soundFX.play();
                        break;
                    case 2:
                        actionType = "T-Spin Triple";
                        if(backToBack == 1) {
                            score += 2400*level;
                            this.soundFX = this.sound.add("backtoback");
                            this.soundFX.play();
                            actionType += "\nBack-to-Back";
                        } else {
                            score += 1600*level;
                            this.soundFX = this.sound.add("clear4");
                            this.soundFX.play();
                        }
                        backToBack = 1;
                        break;
                }
                combo++;
                break;
            case 4:
                actionType = "Tetris";
                if(backToBack == 1) {
                    score += 1200*level;
                    this.soundFX = this.sound.add("backtoback");
                    this.soundFX.play();
                    actionType += "\nBack-to-Back";
                } else {
                    score += 800*level;
                    this.soundFX = this.sound.add("clear4");
                    this.soundFX.play();
                }
                backToBack = 1;
                combo++;
                break;
        }

        if(combo > 1) {
            score += 50*(combo-1)*level;
        }

        switch(combo) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                actionType += ("\n") 
                actionType += combo-1 + " Combo";
                this.soundFX = this.sound.add("combo1");
                this.soundFX.play();
                break;
            case 3:
                actionType += ("\n") 
                actionType += combo-1 + " Combo";
                this.soundFX = this.sound.add("combo2");
                this.soundFX.play();
                break;
            case 4:
                actionType += ("\n") 
                actionType += combo-1 + " Combo";
                this.soundFX = this.sound.add("combo3");
                this.soundFX.play();
                break;
            case 5:
                actionType += ("\n") 
                actionType += combo-1 + " Combo";
                this.soundFX = this.sound.add("combo4");
                this.soundFX.play();
                break;
            default:
                actionType += ("\n") 
                actionType += combo-1 + " Combo";
                this.soundFX = this.sound.add("combo5");
                this.soundFX.play();
                break;
        }

        //Perfect Clear
        let pcCheck = 0;
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
                if(grid[i][j] > 0) pcCheck++;
            }
        }
        if(pcCheck == 0) {
            actionType += "\nPerfect Clear";
            this.soundFX = this.sound.add("perfectclear");
            this.soundFX.play();
        }

        if(textAction != null) {
            textFlash = 60;
        }
        

        

    }

    //GRAPHICS
    //==========================================================================================

    preload() {
        this.load.spritesheet('skin', 'assets/skin.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('skinghost', 'assets/skinghost.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('preview','assets/preview.png', { frameWidth: 96, frameHeight: 48 });
        this.load.image('background', "assets/background/" + (Math.floor(Math.random() * 3) + 1) + ".png");
        this.load.image('hud', 'assets/hud.png');
        this.load.image('gameovergood', 'assets/gameovergood.png');
        this.load.image('gameoverbad', 'assets/gameoverbad.png');
        this.load.image('count3', 'assets/3.png');
        this.load.image('count2', 'assets/2.png');
        this.load.image('count1', 'assets/1.png');

        //SOUNDS
        this.load.audio('rotatecw',["assets/sfx/RotateClockwise.mp3"]);
        this.load.audio('rotateccw',["assets/sfx/RotateCounterClockwise.mp3"]);
        this.load.audio('perfectclear',["assets/sfx/PerfectClear.mp3"]);
        this.load.audio('hold',["assets/sfx/Hold.mp3"]);
        this.load.audio('lock',["assets/sfx/Lock.wav"]);
        this.load.audio('clear123',["assets/sfx/clear123.wav"]);
        this.load.audio('clear4',["assets/sfx/clear4.wav"]);
        this.load.audio('backtoback',["assets/sfx/Backtoback.wav"]);
        this.load.audio('tspin0',["assets/sfx/tspin0.wav"]);
        this.load.audio('combo1',["assets/sfx/combo5.wav"]);
        this.load.audio('combo2',["assets/sfx/combo6.wav"]);
        this.load.audio('combo3',["assets/sfx/combo7.wav"]);
        this.load.audio('combo4',["assets/sfx/combo8.wav"]);
        this.load.audio('combo5',["assets/sfx/combo9.wav"]);
        this.load.audio('pause',["assets/sfx/pause.mp3"]);
        this.load.audio('count',["assets/sfx/Countdown.mp3"]);
        this.load.audio('countend',["assets/sfx/Countdown End.mp3"]);
    }

    create() {

        this.init();

        this.input.keyboard.on('keydown_P', (event) => {
            this.soundFX = this.sound.add("pause");
            this.soundFX.play();
            switch(gamePaused) {
                case true:
                    gamePaused = false;
                    textPaused.setText("");
                    break;
                case false:
                    gamePaused = true;
                    textPaused.setText("PAUSE");
                    break;
            }
        })

        this.input.keyboard.on('keydown_R', (event) => {
            this.init();
        })

        this.input.keyboard.on('keydown_Q', (event) => {
            this.scene.start("Menu");
        })

        

        //Backgrounds
        this.add.image(400,300,'background');
        this.add.image(400,280,'hud');
        this.imageGroup = this.add.group();

        
        
        //Input
        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_C = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.key_X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key_SHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.key_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //Text
        textMode = this.add.text(20,200,"ULTRA", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FF88FF"});
        textScore = this.add.text(20,240,score, {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textLinesCleared = this.add.text(20,280,linesCleared, {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textLevel = this.add.text(20,320,level, {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textTimer = this.add.text(20,360,"Time: 0:00.00", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textPaused = this.add.text(350,10,"", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textAction = this.add.text(20,400,actionType, {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#00FFFF"});
        

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
        //Ghost
        let ghostCheck = 0;
        while(block[1]+ghostCheck < 22 &&
              block[3]+ghostCheck < 22 &&
              block[5]+ghostCheck < 22 &&
              block[7]+ghostCheck < 22 &&
              grid[block[1]+ghostCheck+1][block[2]] == 0 &&
              grid[block[3]+ghostCheck+1][block[4]] == 0 &&
              grid[block[5]+ghostCheck+1][block[6]] == 0 &&
              grid[block[7]+ghostCheck+1][block[8]] == 0) {
            ghostCheck++;
        }
        if(block[1] + ghostCheck > 2) {
            var imageBlock = this.add.image(imageGridXPos+(24*block[2]),imageGridYPos+(24*(block[1]+ghostCheck)), 'skinghost', block[0]);
            this.imageGroup.add(imageBlock);
        }
        if(block[3] + ghostCheck > 2) {
        var imageBlock = this.add.image(imageGridXPos+(24*block[4]),imageGridYPos+(24*(block[3]+ghostCheck)), 'skinghost', block[0]);
        this.imageGroup.add(imageBlock);
        }
        if(block[5] + ghostCheck > 2) {
        var imageBlock = this.add.image(imageGridXPos+(24*block[6]),imageGridYPos+(24*(block[5]+ghostCheck)), 'skinghost', block[0]);
        this.imageGroup.add(imageBlock);
        }
        if(block[7] + ghostCheck > 2) {
        var imageBlock = this.add.image(imageGridXPos+(24*block[8]),imageGridYPos+(24*(block[7]+ghostCheck)), 'skinghost', block[0]);
        this.imageGroup.add(imageBlock);
        }
        //Block
        if(block[1] > 2) {
            var imageBlock = this.add.image(imageGridXPos+(24*block[2]),imageGridYPos+(24*block[1]), 'skin', block[0]);
            this.imageGroup.add(imageBlock);
        }
        if(block[3] > 2) {
            var imageBlock = this.add.image(imageGridXPos+(24*block[4]),imageGridYPos+(24*block[3]), 'skin', block[0]);
            this.imageGroup.add(imageBlock);
        }
        if(block[5] > 2) {
            var imageBlock = this.add.image(imageGridXPos+(24*block[6]),imageGridYPos+(24*block[5]), 'skin', block[0]);
            this.imageGroup.add(imageBlock);
        }
        if(block[7] > 2) {
            var imageBlock = this.add.image(imageGridXPos+(24*block[8]),imageGridYPos+(24*block[7]), 'skin', block[0]);
            this.imageGroup.add(imageBlock);
        }
        //Next
        var image = this.add.image(imageGridXPos+(imageBlockSize*12),imageGridYPos+(imageBlockSize*4), 'preview', nextPiece1);
        this.imageGroup.add(image);
        var image = this.add.image(imageGridXPos+(imageBlockSize*12),imageGridYPos+(imageBlockSize*7), 'preview', nextPiece2);
        this.imageGroup.add(image);
        var image = this.add.image(imageGridXPos+(imageBlockSize*12),imageGridYPos+(imageBlockSize*10), 'preview', nextPiece3);
        this.imageGroup.add(image);
        var image = this.add.image(imageGridXPos+(imageBlockSize*12),imageGridYPos+(imageBlockSize*13), 'preview', nextPiece4);
        this.imageGroup.add(image);
        var image = this.add.image(imageGridXPos+(imageBlockSize*12),imageGridYPos+(imageBlockSize*16), 'preview', nextPiece5);
        this.imageGroup.add(image);
        //Hold
        var image = this.add.image(imageGridXPos+(imageBlockSize*-3),imageGridYPos+(imageBlockSize*4), 'preview', holdPiece);
        this.imageGroup.add(image);
        


        //TEXT
        //----------------------------------------------------------------------------
        textScore.setText("Score: " + score);
        textLinesCleared.setText("Lines: " + linesCleared);
        textLevel.setText("Level: " + level);
        textTimer.setText("Time: " + this.convertTime(framesElapsed));
        if(textFlash > 0) {
            textAction.setText(actionType);
            textFlash--;
        } else {
            textAction.setText("");
        }
        
        
        

    }

    countdown() {
        this.draw();
        switch(gameCountdownCount) {
            case 3:
                var image = this.add.image(400,300, 'count3');
                this.imageGroup.add(image);
                break;
            case 2:
                var image = this.add.image(400,300, 'count2');
                this.imageGroup.add(image);
                break;
            case 1:
                var image = this.add.image(400,300, 'count1');
                this.imageGroup.add(image);
                break;
        }
        if(gameCountdownCount == 3 && gameCountdownTimer == 30) {
            this.soundFX = this.sound.add("count");
            this.soundFX.play();
        }
        if(gameCountdownTimer < 1) {
            gameCountdownTimer = 30;
            gameCountdownCount--;
            if(gameCountdownCount == 0) {
                this.soundFX = this.sound.add("countend");
                this.soundFX.play();
            } else {
                this.soundFX = this.sound.add("count");
                this.soundFX.play();
            }
        } else {
            gameCountdownTimer--;
        }
        if(gameCountdownCount == 0) {
            gameCountdown = false;
        }
        
    }

    convertTime(frames) {
        let seconds = ((frames/60) % 60).toFixed(2);
        let minutes = Math.floor((frames/3600) % 60);
        let hours = Math.floor(frames/216000);

        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return ((hours > 0) ? (hours + ":") : ("")) + minutes + ":" + seconds;
    }

}