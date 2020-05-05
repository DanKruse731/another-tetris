var textHeader;
var textOption1;
var textOption2;
var textOption3;
var textOption4;
var textOption5;

var modeOption = 1;

var globalDasSpeed = 1;

class Menu extends Phaser.Scene {

    constructor() {
        super({key:"Menu"});
    }

    init() {

    }

    update(delta) {
        
        this.draw();
        
    }

    preload() {
        this.load.image('back', 'assets/background/1.png');
    }

    create() {

        
        this.add.image(400,300,'back');
    
        textHeader = this.add.text(20,20,"Select a Mode | Press X to Play", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FF88FF"});
        textOption1 = this.add.text(20,60," Marathon", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textOption2 = this.add.text(20,100," Sprint", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textOption3 = this.add.text(20,140," Ultra", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textOption4 = this.add.text(20,180," Master", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        textOption5 = this.add.text(20,220," Ultimate", {font:"30px Arial", stroke:"#000000", strokeThickness:6, fill:"#FFFFFF"});
        

        this.key_X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.input.keyboard.on('keydown_X', (event) => {
            switch(modeOption) {
                case 1:
                    this.scene.restart("Marathon");
                    this.scene.start("Marathon");
                    break;
                case 2:
                    this.scene.restart("Sprint");
                    this.scene.start("Sprint");
                    break;
                case 3:
                    this.scene.restart("Ultra");
                    this.scene.start("Ultra");
                    break;
                case 4:
                    this.scene.restart("Master");
                    this.scene.start("Master");
                    break;
                case 5:
                    this.scene.restart("Ultimate");
                    this.scene.start("Ultimate");
                    break;
            }
            
        })

        this.input.keyboard.on('keydown_UP', (event) => {
            if(modeOption > 1) {
                modeOption--;
            }
        })

        this.input.keyboard.on('keydown_DOWN', (event) => {
            if(modeOption < 5) {
                modeOption++;
            }
        })

    }

    draw() {

        switch(modeOption) {
            case 1:
                textOption1.setText("Marathon <---");
                textOption2.setText("Sprint");
                textOption3.setText("Ultra");
                textOption4.setText("Master");
                textOption5.setText("Ultimate");
                break;
            case 2:
                textOption1.setText("Marathon");
                textOption2.setText("Sprint <---");
                textOption3.setText("Ultra");
                textOption4.setText("Master");
                textOption5.setText("Ultimate");
                break;
            case 3:
                textOption1.setText("Marathon");
                textOption2.setText("Sprint");
                textOption3.setText("Ultra <---");
                textOption4.setText("Master");
                textOption5.setText("Ultimate");
                break;
            case 4:
                textOption1.setText("Marathon");
                textOption2.setText("Sprint");
                textOption3.setText("Ultra");
                textOption4.setText("Master <---");
                textOption5.setText("Ultimate");
                break;
            case 5:
                textOption1.setText("Marathon");
                textOption2.setText("Sprint");
                textOption3.setText("Ultra");
                textOption4.setText("Master");
                textOption5.setText("Ultimate <---");
                break;
        }
        
    }

    

}