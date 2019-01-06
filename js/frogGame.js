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


function spawn(seconds){
  let index = Math.floor(seconds/10);
  if((index == 5 && !spawnTimes[index]) || (index == 4 && !spawnTimes[index]) ||
  (index == 3 && !spawnTimes[index]) || (index == 2 && !spawnTimes[index]) ||
  (index == 1 && !spawnTimes[index]) || (index == 0 && !spawnTimes[index])){
    let amountToSpawn = Math.floor(Math.random() * 10) + 1;

    for(let i=0;i<amountToSpawn; i++){ // spawn anywhere between 1 to 10 bugs
      let fly = PIXI.Sprite.fromImage('./img/fly.png');
      fly.anchor.set(0.5);
      fly.x = Math.floor(Math.random() * app.renderer.width);
      fly.y = Math.floor(Math.random() * app.renderer.height);
      fly.interactive = true;
      fly.buttonMode = true;
      let thisFlyDirection_X = 1; let thisFlyDirection_Y = 1;
      function onClick(){
        score +=1;
        app.stage.removeChild(fly);
      };
      fly.on('pointerdown', onClick);
      app.stage.addChild(fly);
      app.ticker.add(function(delta){
        let probability = Math.floor(Math.random()*10);
        if(probability == 4){ //there is a 1/5 chance of this being picked, change dir.
          thisFlyDirection_X = (Math.floor(Math.random() * 2 )) ? 1 : -1;
          thisFlyDirection_Y = (Math.floor(Math.random() * 2 )) ? 1 : -1;
        }
        fly.x = (delta*2 * thisFlyDirection_X) + fly.x;
        fly.y = (delta*2 * thisFlyDirection_Y) + fly.y;
        fly.rotation += 0.1 * delta;
      });
    }

    spawnTimes[index] = true;

  }
  else{}//noop
}

function gameOver(){
  alert('game over your score is '+score);
}

function play(){
  let now = new Date();
  let futureDate = new Date(); futureDate.setMinutes(futureDate.getMinutes() + 1);
  let minutes = 0; let seconds = 0;
  let topText = new PIXI.Text(`Time Remaining: ${minutes}:${seconds}`, {});
  app.stage.addChild(topText);
  var interval = setInterval(function(){
    let difference = futureDate - now;
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    now = new Date();
    topText.setText(`Time Remaining: ${minutes}:${seconds}`);

    spawn(seconds);

    if(minutes<1 && seconds < 1){
      clearInterval(interval);
      gameOver();
    }
  },1000);

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
let score = 0;
let spawnTimes = [false, false,false, false, false, false];


//set background
app.renderer.backgroundColor = "0x98DDF2";
let lilyPadCenter_x = app.renderer.width/2;
let lilyPadCenter_y = (app.renderer.height/2 + 160);

drawBackground();
drawLilypads();
drawFrog();
play();
