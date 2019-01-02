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

  //draw little lillypads
  let lillypad1 = PIXI.Sprite.fromImage('./img/lilypad.png');
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

  let lillypad3 = PIXI.Sprite.fromImage('./img/lilypad.png');
  lillypad3.setTransform(0,0,0.5,0.5)
  lillypad3.anchor.set(0.5);
  lillypad3.x = (app.renderer.width - 100);
  lillypad3.y = (lilyPadCenter_y - 50);
  app.stage.addChild(lillypad3);
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

//set background
app.renderer.backgroundColor = "0x98DDF2";
let lilyPadCenter_x = app.renderer.width/2;
let lilyPadCenter_y = (app.renderer.height/2 + 160);

drawBackground();
