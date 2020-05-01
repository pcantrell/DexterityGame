class dextgameLevelOne extends Phaser.Scene{
  constructor(){
    super({key:"levelOne"});
  }

  preload(){
    //Used for load music and pictures
    this.load.image('brush', 'www/img/brush1.png');
    touchCounter = 2;
  }

  create(){
    //create objects
    var pointer = this.input.addPointer(1);
    text = this.add.text(20,20, 'Welcome to Level: '+ userLevel+'!');

    text2 = this.add.text(300,20, 'Text2');
    timeText1 = this.add.text(40, 40, 'Left: ');
    timeText2 = this.add.text(500, 40, 'Right: ');

    //picks a shape from the shape database and checks to make sure we have not used this shape yet.
    leftShape = shapeList[Math.floor(Math.random() * shapeList.length)];
    // while(leftShape.hasUsed == true){
    //   leftShape = shapeList[Math.floor(Math.random() * shapeList.length)];
    // }

    //picks a shape from the shape database and checks
    //to make sure the two randomly picked shapes are not the same shape
    //and checks to make sure we have not used this shape yet
    rightShape = shapeList[Math.floor(Math.random() * shapeList.length)];
    while (rightShape.name == leftShape.name){
      rightShape = shapeList[Math.floor(Math.random() * shapeList.length)];
    }
    //
    // while (rightShape.name == leftShape.name && rightShape.hasUsed == true){
    //   rightShape = shapeList[Math.floor(Math.random() * shapeList.length)];
    // }

    //marks the two shapes as used
    leftShape.hasUsed = true;
    rightShape.hasUsed = true;

    var leftGraphics = this.strokeShape(leftShape.shapePoints);
    var rightGraphics = this.strokeShape(rightShape.shapePoints);

    leftGraphics.setPosition(150, 250);
    rightGraphics.setPosition(550, 250);
    // rightGraphics.setPosition(105, 250);

    var tracer1 = new Tracer(leftShape.shapePoints);
    var tracer2 = new Tracer(rightShape.shapePoints, rightGraphics);

    var checkedFirstPointer = false;
    var tracer1PointerId;

    for (var tracer of [tracer1, tracer2]){
      tracer.onPointReached = (x, y) =>{
        this.add.image(x, y, 'brush');
        // text2.setText(x);
      };
    }

    // for (var tracer of [tracer1, tracer2]){
    //   tracer.setPath = (num) =>{
    //     if (num == 1)
    //       tracer.path = squarePoints;
    //     else if (num == 2)
    //       tracer.path = trianglePoints;
    //     text.setText([tracer.path]);
    //   };
    // }

    //Finds the point that the player is starting nearest on the shape
    this.input.on('pointerdown', (pointer) => {
      // if (!checkedPointer){
      //   tracer1.pointerID = pointer.pointerId;
      //   checkedPointer = true;
      // }

      var x = pointer.x;
      var y = pointer.y;

      // if (x >= 400 && !checkedFirstPointer){
      //   tracer1.path = trianglePoints;
      //   tracer1.pointerID = pointer.pointerId;
      //   checkedFirstPointer = true;
      // }
      // else if (x < 400 && !checkedFirstPointer){
      //   tracer1.path = squarePoints;
      //   tracer1.pointerID = pointer.pointerId;
      //   checkedFirstPointer = true;
      // }
      //
      // if (x >= 400 && pointer.pointerId != tracer1.pointerID){
      //   tracer2.path = trianglePoints;
      //   tracer2.pointerID = pointer.pointerId;
      // }
      // else if (x < 400 && pointer.pointerId != tracer1.pointerID){
      //   tracer2.path = squarePoints;
      //   tracer2.pointerID = pointer.pointerId;
      // }

      if (x <= 200){
        tracer1.start(x, y);
        pointer.pointerId = 1;
        tracer1.pointerID = pointer.pointerId;
      }
      else if (x > 200){
        tracer2.start(x, y);
        pointer.pointerId = 2;
        tracer2.pointerID = pointer.pointerId;
        text.setText([pointer.pointerId == null]);
      }

    }, this);

    //Allows user to draw when pressing finger down
    this.input.on('pointermove', (pointer) => {

      //This can be used as an anti-cheating method
      // this.input.on('pointerup', function (pointer1){
      //   this.scene.start("pauseScreen");
      // }, this);
      if (pointer.isDown){


        //timeText1.setText('Left: ' + [timer1]);
        //timeText2.setText('Right: ' + [timer2]);
        var x = pointer.x;
        var y = pointer.y;

        if (pointer.pointerId == tracer1.pointerID){
          tracer1.trace(x, y);
          text.setText(['yay']);
          timeText1.setText('Left: ' + [timer1]);
        }
        else if (pointer.pointerId == tracer2.pointerID){
          tracer2.trace(x, y);
          text2.setText(['yay2']);
          timeText2.setText('Right: ' + [timer2]);
        }
        this.add.image(pointer.x, pointer.y, 'brush').setScale(0.5);
      }


    }, this);
  }

  strokeShape(shapePoints){
    var graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFF000, 1.0);
    graphics.beginPath();
    for (var i = 0; i < shapePoints.length; i += 2) {
      var lineOp = (i == 0) ? "moveTo" : "lineTo";
      graphics[lineOp](shapePoints[i], shapePoints[i+1]);
    }
    graphics.closePath();
    graphics.stroke();
    return graphics;
  }

  // advanceToNewLevel(){
  //   //Pseudocode that determines when the user wins the level they are playing
  //   if(userScore >= winThreshHold){
  //     // userWin = true;
  //     this.scene.restart(true, false, {level: this.level+1});
  //   }else {
  //     //else if the user does not
  //     this.scene.restart(true,false{level: this.level});
  //   }
  //
  // }

  update(time){
    //is a loop that runs constantly

    //Sets timer var equal to time
    timer1 = time;
    timer2 = time;

    if (touchCounter < 2){
      // this.scene.pause();
      // this.scene.launch("pauseScreen");
      this.scene.start("pauseScreen");
    }


  }

}
