//Game Functions ---------------------------------------------------------------
function drawBackground(){
  //draw water
  graphics.beginFill("0x2878E1");
  graphics.drawRect(0, (app.renderer.height/2 +50), app.renderer.width, app.renderer.height);
  graphics.endFill();

  //draw big lillypad
  graphics.beginFill("0x299526");
  graphics.drawEllipse(lilyPadCenter_x, lilyPadCenter_y, 230,50);
  graphics.endFill();
  graphics.beginFill("0x2878E1");
  graphics.moveTo(lilyPadCenter_x, lilyPadCenter_y);
  graphics.lineTo(lilyPadCenter_x + 230 + 50, lilyPadCenter_y - 20);
  graphics.lineTo(lilyPadCenter_x + 230 + 50, lilyPadCenter_y + 40);
  graphics.endFill();
}

function drawLilypads(){
  //draw little lillypads
  lillypad1.setTransform(0,0,0.7,0.7,Math.PI)
  lillypad1.anchor.set(0.5);
  lillypad1.x = 100;
  lillypad1.y = (lilyPadCenter_y - 50);
  app.stage.addChild(lillypad1);

  let lillypad2 = PIXI.Sprite.fromImage('./img/lilypad.png');
  lillypad2.setTransform(0,0,1.5,1.5,Math.PI)
  lillypad2.anchor.set(0.5);
  lillypad2.x = (app.renderer.width - 100);
  lillypad2.y = (app.renderer.height - 50);
  app.stage.addChild(lillypad2);

  lillypad3.setTransform(0,0,0.5,0.5)
  lillypad3.anchor.set(0.5);
  lillypad3.x = (app.renderer.width - 100);
  lillypad3.y = (lilyPadCenter_y - 50);
  app.stage.addChild(lillypad3);

  app.ticker.add(function(delta) {

    if(lillyCount > 3){
      lillyDirection = -1;
    }else if(lillyCount < -3){
      lillyDirection = 1;
    }
    else{}//noop

    lillyCount = (lillyDirection * (lillyCount+0.2) );

    lillypad1.rotation = 0.01 * lillyCount;
    lillypad1.x = 100+lillyCount*3;
    lillypad3.rotation = -0.01 * lillyCount;
    lillypad3.x = (app.renderer.width - 100) +lillyCount*2;
});
}

function drawFrog(){
  console.log('got to draw frog')
  frog.setTransform(0,0,0.5,0.5,0);
  frog.anchor.set(0.5,1);
  frog.x = lilyPadCenter_x;
  frog.y = lilyPadCenter_y +10;
  app.stage.addChild(frog);
}

//Main execution ---------------------------------------------------------------

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type);
let app = new PIXI.Application();
var graphics = new PIXI.Graphics();
document.body.appendChild(app.view);
app.stage.addChild(graphics);

//freeMoving game sprite elements
let lillypad1 = PIXI.Sprite.fromImage('./img/lilypad.png');
let lillypad3 = PIXI.Sprite.fromImage('./img/lilypad.png');
let lillyCount = 0;
let lillyDirection = 1;

let frog = PIXI.Sprite.fromImage('./img/frog.png');


//set background
app.renderer.backgroundColor = "0x98DDF2";
let lilyPadCenter_x = app.renderer.width/2;
let lilyPadCenter_y = (app.renderer.height/2 + 160);

drawBackground();
drawLilypads();
drawFrog();
