class dextgameWelcomeScreen extends Phaser.Scene{
  constructor(){
    super({key:"welcomeScreen"});
  }

  // init() {
  //   //prepare data
  // }

  preload(){
    //USed for load music and pictures

  }

  create(){
    //create objects
    graphics = this.add.graphics();
    this.input.addPointer(1);
    text = this.add.text(20,20, 'Welcome! Place Two Fingers Down To Begin');
    // this.scene.start("playScreen");
  }

  update(){
    //is a loop that runs constantly
    if (this.input.pointer1.isDown || this.input.pointer2.isDown){
      // graphics.clear();
      // this.scene.start("playScreen");
    }
  }
}