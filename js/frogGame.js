//Global variables
var lillypad1, lillypad2, lillypad3, frog, lilyPadCenter_x,lilyPadCenter_y;
var ticker_l;
var spawnTimes = [false, false,false, false, false, false];
var lillyCount = 0;
var lillyDirection = 1;
var score = 0;
var total = 0;
var playStage, scoreStage;

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
  playStage.addChild(lillypad1);

  lillypad2.setTransform(0,0,1.5,1.5,Math.PI)
  lillypad2.anchor.set(0.5);
  lillypad2.x = (app.renderer.width - 100);
  lillypad2.y = (app.renderer.height - 50);
  playStage.addChild(lillypad2);

  lillypad3.setTransform(0,0,0.5,0.5)
  lillypad3.anchor.set(0.5);
  lillypad3.x = (app.renderer.width - 100);
  lillypad3.y = (lilyPadCenter_y - 50);
  playStage.addChild(lillypad3);

  ticker_l = app.ticker.add(function(delta) {

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
  frog.setTransform(0,0,0.5,0.5,0);
  frog.anchor.set(0.5,1);
  frog.x = lilyPadCenter_x;
  frog.y = lilyPadCenter_y +10;
  playStage.addChild(frog);
}

function drawTongue(event){
  var g = new PIXI.Graphics();

  g.beginFill(0xFFC0CB);
  g.moveTo(lilyPadCenter_x, lilyPadCenter_y-80);
  g.lineTo(event.data.global.x+15, event.data.global.y);
  g.lineTo(event.data.global.x-15, event.data.global.y);
  g.endFill();

  g.beginFill(0xFFC0CB);
  g.drawCircle(event.data.global.x, event.data.global.y,20);
  g.endFill();
  playStage.addChild(g);
  setTimeout(function(){
    playStage.removeChild(g);
  },600)
}

function spawn(seconds){
  let index = Math.floor(seconds/10);
  if((index == 5 && !spawnTimes[index]) || (index == 4 && !spawnTimes[index]) ||
  (index == 3 && !spawnTimes[index]) || (index == 2 && !spawnTimes[index]) ||
  (index == 1 && !spawnTimes[index]) || (index == 0 && !spawnTimes[index])){
    let amountToSpawn = Math.floor(Math.random() * 10) + 1;

    for(let i=0;i<amountToSpawn; i++){ // spawn anywhere between 1 to 10 bugs
      let fly = new Sprite(resources.fly.texture);
      fly.anchor.set(0.5);
      fly.x = Math.floor(Math.random() * app.renderer.width);
      fly.y = Math.floor(Math.random() * app.renderer.height);
      fly.interactive = true;
      fly.buttonMode = true;
      let thisFlyDirection_X = 1; let thisFlyDirection_Y = 1;
      total +=1;
      function onClick(event){
        score +=1;
        playStage.removeChild(fly);
      };
      fly.on('pointerdown', onClick);
      playStage.addChild(fly);
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
  ticker_l.destroy();
  lillypad1.destroy();
  lillypad2.destroy();
  lillypad3.destroy();
  app.stage.destroy(playStage);
  app.stage.removeChild(playStage);
  gotoResultsPage();
}


function play(){
  let now = new Date();
  let futureDate = new Date(); futureDate.setMinutes(futureDate.getMinutes() + 1);
  let minutes = 0; let seconds = 0;
  let topText = new PIXI.Text(`Time Remaining: ${minutes}:${seconds}`, {});
  playStage.addChild(topText);
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
//Results page
function gotoResultsPage(){
  //score
  scoreStage = new PIXI.Container();

  app.renderer.backgroundColor = "0x1A5276";
  let scoreText = new PIXI.Text(`Final Score (score/total):\n${score}/${total}`, {"fill": "white", "fontSize": "2rem","align":"center"});
  scoreText.x = app.renderer.width/2 - scoreText.width/2;
  scoreText.y = app.renderer.height/2 -70;

  scoreStage.addChild(scoreText);
  app.stage.addChild(scoreStage);
  app.renderer.render(scoreStage);
}


//Main execution ---------------------------------------------------------------

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type);
let app = new PIXI.Application();
var graphics = new PIXI.Graphics();
let loader = PIXI.loader;
let Sprite = PIXI.Sprite;
let resources = PIXI.loader.resources;
document.body.appendChild(app.view);

loader
  .add('lilypad','./img/lilypad.png')
  .add('frog','./img/frog.png')
  .add('fly', './img/fly.png')
  .load(setup);

function setup(){
  playStage();

}

function playStage(){
  playStage = new PIXI.Container();
  app.stage.addChild(playStage);


  lillypad1 = new Sprite(resources.lilypad.texture);
  lillypad2 = new Sprite(resources.lilypad.texture);
  lillypad3 = new Sprite(resources.lilypad.texture);

  frog = new Sprite(resources.frog.texture);

  playStage.addChild(graphics);

  //set background
  app.renderer.backgroundColor = "0x98DDF2";
  lilyPadCenter_x = app.renderer.width/2;
  lilyPadCenter_y = (app.renderer.height/2 + 160);

  //draw tongue when clicking on the stage
  let interactionManager = new PIXI.interaction.InteractionManager(app.renderer);
  interactionManager.on('pointerdown', drawTongue);

  drawBackground();
  drawLilypads();
  drawFrog();
  play();
}
