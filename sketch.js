var monkey, monkey_running;
var ground, invisibleGround, groundImage;
var bananaImg,banana;
var obstacleImage1, obstacleImage2;
var obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6;
var over, restart;
var cloud, cloudsGroup, cloudImage;
var score = 0;
var obstaclesGroup;
var newImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var checkSound;
var dieSound;
var jumpSound;
var rockImg;
var rock;
var score1 = 0;
var bananaGroup;

function preload() {

 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
                                 
                                 
 bananaImg = loadImage("banana.png");               
          
 
  
  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacleImage1 = loadImage("obstacle1.png");

  obstacleImage2 = loadImage("obstacle2.png");

  obstacleImage3 = loadImage("obstacle3.png");

  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");

  obstacleImage6 = loadImage("obstacle6.png");

  obstacleImage7 = loadImage("obstacle.png");
  
  obstacleImage8 = loadImage("obstacle8.jpg");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  checkSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");



}
function displayBanana() {
   if (frameCount % 60 === 0) {
     banana = createSprite(400, 100, 40, 10);
     banana.addImage("banana",bananaImg);
     banana.velocityX = -5 - score/50;
     banana.scale = 0.05;
     bananaGroup.add(banana);
   }
  
}

function moveMonkey() {

  if (keyDown("space") || monkey.y>145 ){
     monkey.velocityY = -10;
  }

 monkey.velocityY = monkey.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
}

function gameOver() {

  

}

function endGame() {

  //what happens when game state is end
  //trex.changeAnimation("collided", trex_collided);
  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  
  monkey.velocityY = 0;
  


}

function setup() {
  createCanvas(600, 200);

  
  over = createSprite(300, 100);
  over.addImage("over", gameOverImg);
  over.visible = false;

  restart = createSprite(300, 150);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  
  
  monkey = createSprite(50, 180, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
 
  ground = createSprite(300, 180, 600, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(300, 190, 600, 10);
  invisibleGround.visible = false;

  console.log("Hello" + 5)

  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  bananaGroup = new Group();

}

function draw() {
  background("black");
  //display the score
  fill("white");
  text("Score = " + score, 530, 50);
  text("Score 2 = " +score1,530,70);

    monkey.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
        reset();
    
  }
  
  
  if (gameState === PLAY) {
    ground.velocityX = -4 - score/50;
    //gameState, play
    displayScore();
    spawnObstacles();
    spawnClouds();
    moveMonkey();
    

       if (obstaclesGroup.isTouching(monkey)) {
        
           dieSound.play();
           gameState = END;
        
       }
  }
  
  else if (gameState === END) {
      over.visible = true;
      restart.visible = true;
    
    
    endGame();
         
    }


  displayBanana();
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 320, 40, 10);
    cloudsGroup.add(cloud);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.8;
    cloud.velocityX = -3;
    cloud.lifetime = -1;
    cloud.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
  }
}

function spawnObstacles() {

  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 180, 40, 10);
    obstacle.velocityX = -5 - score/50;
    var rand = Math.round(random(1, 6));
    obstaclesGroup.add(obstacle);
    
  
  if (frameCount % 110 === 0) {
    obstacle2 = createSprite(600, 190, 40, 10);
    obstacle2.addImage("rock",obstacleImage7);
    obstacle2.scale = 0.1;
    obstacle2.velocityX = -5 - score/50;
  
    obstaclesGroup.add(obstacle2);
  }

    //randomly pick which obstacle image we want
    switch (rand) {

      case 1:
        obstacle.addImage("ob", obstacleImage1);
        break;
      case 2:
        obstacle.addImage("ob", obstacleImage2);
        break;
      case 3:
        obstacle.addImage("ob", obstacleImage3);
        break;
      case 4:
        obstacle.addImage("ob", obstacleImage4);
        break;
      case 5:
        obstacle.addImage("ob", obstacleImage5);
        break;
      case 6:
        obstacle.addImage("ob", obstacleImage6);
        break;

    }

    obstacle.scale = 0.5;
    obstacle.lifetime = -1;

  }

}

function displayScore() {

  score = score + Math.round(getFrameRate() / 60);
  
  if(bananaGroup.isTouching(monkey)) {   
     score1++
       bananaGroup.destroyEach(); 
     
     }
  
  if(score%50===0 && score > 0 ) {
   checkSound.play(); 
  }
  

}

function reset() {
  restart.visible = false;
  over.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score =0;
  gameState=PLAY;
  
}

