var heroPlane,heroPlaneImg;
var villianPlane,villianPlane1,villianPlane2,villianPlane3;
var background,backgroundImg;
var bullet,bulletImg;
var missileImage;
var explosionImage;
var misilleCount = 0;
var missileIndicator,missileIndicatorImage;
var missileLaunched,missileLaunchedImage;
var score = 0;
var villianBullets,villianBulletsImage;

function preload(){
groundImg = loadImage("sky2.jpg");
heroPlaneImg = loadImage("heroPlane.png");
bulletImg = loadImage("bullet.png");
villianPlane1 = loadImage("enemy1.png");
villianPlane2 = loadImage("enemy2.png");
villianPlane3 = loadImage("enemy3.png");
missileImage = loadImage("missile.png");
explosionImage = loadImage("explosion.png");
missileIndicatorImage = loadImage("missile indicator.png");
missileLaunchedImage = loadImage("MISSILE IMAGE.png");
villianBulletsImage = loadImage("bullet2.png");
}

function setup(){
createCanvas(1900,800);

ground = createSprite(950,400,1900,800);
ground.addImage(groundImg);
ground.velocityX = -3;
ground.x = ground.width /2;
ground.scale = 1;

heroPlane = createSprite(200,400,20,20);
heroPlane.addImage("hero Image",heroPlaneImg);
heroPlane.scale = 0.5;
//heroPlane.y = World.mouseY;

missileIndicator = createSprite(200,600,20,20);
missileIndicator.addImage(missileIndicatorImage);
missileIndicator.scale = 0.4;




villianPlanesGroup = new Group();
missileGroup = new Group();
bulletGroup = new Group();
missileLaunchedGroup = new Group(); 
villianBulletsGroup = new Group();



}

function draw(){
  background(200);
  

  heroPlane.y = World.mouseY;

  if (ground.x < 500){
    ground.x = ground.width/2;
  }

//spawnBullets();

if(keyDown("space")){
spawnBullets();
}

/*if(keyDown("F")){
  spawnLaunchedMissile();

}*/





spawnVillians();
spawnMissiles();

if(bulletGroup.isTouching(villianPlanesGroup)){
  //console.log("hello");
  villianPlanesGroup.destroyEach();
  //villianPlanesGroup.addImage(explosionImage);
    
  }





if(heroPlane.isTouching(missileGroup)){
missileGroup.destroyEach();
score = score + 1;

}

//textSize(20);
//text("SCORE:" + score,200,600);
//fill("black");

if(score > 0){
  if(keyDown("F")){
    spawnLaunchedMissile();
  score = score - 1;
}

}


if(missileLaunchedGroup.isTouching(villianPlanesGroup)){
  villianPlanesGroup.destroyEach();
  missileLaunchedGroup.destroyEach();
  explosion = createSprite(villianPlanesGroup.x,400,20,20);
  explosion.addImage(explosionImage);
  
  //villianPlanesGroup.changeImage(explosionImage);

  }

drawSprites();

text(" : " + score,210,605);
  textSize(90);
  fill("black");
}


function spawnBullets(){
//if (frameCount % 60 === 0) {
//heroPlane.x = bullet.x;
bullet = createSprite(200,400,20,20);
bullet.y = heroPlane.y;
bullet.velocityX = 3;
//heroPlane.x = bullet.x;
bullet.addImage(bulletImg);
bullet.scale = 0.2;
bulletGroup.add(bullet);
}



function spawnVillians(){
  
  if(frameCount % 60 === 0) {
    
    if (frameCount % 240 === 0) {
      var villianPlane = createSprite(900,400,20,20);
      villianPlane.scale = 0.3;
      villianPlane.velocityX = -3;
      villianPlanesGroup.add(villianPlane);
      villianPlane.y = Math.round(random(120,400));
      
    
      //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: villianPlane.addImage(villianPlane1);
      //villianPlane.scale = 0.4;
              break;

      case 2: villianPlane.addImage(villianPlane2);
              break;
      case 3: villianPlane.addImage(villianPlane3);
              break;
      s
      default: break;
      
    //villianPlane.lifetime = 300;
    
    //spawnVillianBullets();
  
  }

  spawnVillianBullets();
  
  
  function spawnVillianBullets(){
    if(frameCount % 60 === 0){
  villianBullets = createSprite(900,400,20,20);
  villianBullets.addImage(villianBulletsImage);
  villianBullets.y = villianPlane.y;
  villianBullets.velocityX = -3;
  villianBullets.scale = 0.2;
  villianBulletsGroup.add(villianBullets);
    }
  }
  
  




}
}
}


function spawnMissiles(){
if(frameCount % 250 === 0){
var missile = createSprite(700,350,20,20);
missile.y = Math.round(random(150,450));
missile.velocityX = -4;
missile.addImage(missileImage);
missile.scale = 0.2;
missileGroup.add(missile);

}

}


function spawnLaunchedMissile(){
missileLaunched = createSprite(200,400,20,20);
missileLaunched.y = heroPlane.y;
missileLaunched.velocityX = 3;
missileLaunched.addImage(missileLaunchedImage);
missileLaunched.scale = 0.2;
missileLaunchedGroup.add(missileLaunched);


}































/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}*/