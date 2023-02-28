let ground;
let lander;
var lander_image;
var bg_img;
var background1;
var landerflying;
var vx = 0;
var g = 0.01;
var vy = 0;
var rocketsound;
var asteroid1img;
var asteroid2img;
var asteroid3img;
var asteroid1_sprite;
var asteroid2_sprite;
var asteroid3_sprite;
var background_sprite, background_stars;
var heart1, heart2, heart3, heartImage;
var asteroid1Group, asteroid2Group, asteroid3Group;
var life = 3
var gameover, gameoverImage;
var gameState = "play"
function preload()
{
  lander_image = loadAnimation("rocket.png");
  bg_img = loadImage("bg.png");
  background1 = loadAnimation("bg_sur.png");
  landerflying = loadAnimation("rocketflying.png");
  rocketsound = loadSound("rocketSound.wav");
  asteroid1img = loadImage("asteroid1.png");
  asteroid2img = loadImage("asteroid2.png");
  asteroid3img = loadImage("asteroid3.png");
  background_stars = loadAnimation("spacebackground.jpg");
  heartImage = loadImage("heart.png");
  gameoverImage = loadImage("gameover1.jpg");
}

function setup() {
  createCanvas(1200,800);
  frameRate(80);

  
  
  background_sprite = createSprite(0,0,1000,700);
  background_sprite.scale = 2;
  background_sprite.velocityY = 1;
  background_sprite.addAnimation("bgSprite", background1);
  background_sprite.addAnimation("bgStars", background_stars);
  background_sprite.changeAnimation("bgSprite", background1);
  gameover = createSprite(600,400);
  gameover.addImage("gameover1",gameoverImage);
  gameover.visible = false;

  lander = createSprite(100,50,30,30);
  lander.addAnimation("lander", lander_image);
  lander.addAnimation("landerFlying", landerflying);
  lander.scale = 0.5;
  
  ground = createSprite(0,height - 100, 900, 20);
  ground.visible = false;
  rectMode(CENTER);
  textSize(15);
  heart1 = createSprite(25,50,50,50);
  heart1.addImage("heart", heartImage);
  heart1.scale = 0.1

  heart2 = createSprite(60,50,50,50);
  heart2.addImage("heart", heartImage);
  heart2.scale = 0.1

  heart3 = createSprite(95,50,50,50);
  heart3.addImage("heart", heartImage);
  heart3.scale = 0.1

  
  asteroid1Group = new Group()
  asteroid2Group = new Group()
  asteroid3Group = new Group()
}

function asteroid1(){
  if(frameCount%150 === 0){
asteroid1_sprite = createSprite(400,100);
asteroid1_sprite.scale = 0.5;
asteroid1_sprite.velocityY = 2;
asteroid1_sprite.x = Math.round(random(100, 700));
asteroid1Group.add(asteroid1_sprite);
asteroid1_sprite.addImage("asteroid1", asteroid1img);
asteroid1_sprite.visible = true;
console.log(World.frameCount);
}
}

function asteroid2(){
  if(frameCount%150 === 0){
asteroid2_sprite = createSprite(700,100);
asteroid2_sprite.scale = 0.5;
asteroid2_sprite.velocityY = 2;
asteroid2_sprite.x = Math.round(random(100, 700));
asteroid2Group.add(asteroid2_sprite);
asteroid2_sprite.addImage("asteroid2", asteroid2img);
asteroid2_sprite.visible = true;
console.log(World.frameCount);
}
}

function asteroid3(){
  if(frameCount%150 === 0){
asteroid3_sprite = createSprite(1000,100);
asteroid3_sprite.scale = 0.2;
asteroid3_sprite.velocityY = 2;
asteroid3_sprite.x = Math.round(random(100, 700));
asteroid3Group.add(asteroid3_sprite);
asteroid3_sprite.addImage("asteroid3", asteroid3img);
asteroid3_sprite.visible = true;
console.log(World.frameCount);
}
}




function draw() 
{
  background(51);
  if(gameState === "play"){
    asteroid1();
    asteroid2();
    asteroid3();
    vy +=g;
  lander.position.y+=vy;

  if (keyDown(UP_ARROW)){
    vy = vy - 0.5;
    lander.changeAnimation("landerFlying");
    lander.scale = 1
    rocketsound.play();
    rocketsound.setVolume(0.03);
  }
  if (keyDown(LEFT_ARROW)){
    lander.x = lander.x - 5
   }

   if (keyDown(RIGHT_ARROW)){
    lander.x = lander.x + 5
   }
  
   if (lander.isTouching(asteroid1Group)){
    life = life - 1;
  
    asteroid1Group.destroyEach();
    if(life === 2){
     heart3.visible = false;
    }

    if(life === 1){
      heart2.visible = false;
    }
    if(life === 0){
      gameState = "end";
      heart1.visible = false;
      
      
    }
  

   }
  if(background_sprite.y > 800){
    background_sprite.y = 700;

  }

   if (lander.isTouching(asteroid2Group)){
    life = life - 1;
    asteroid2Group.destroyEach();
    if(life === 2){
     heart3.visible = false;
     
     
    }

    if(life === 1){
      heart2.visible = false;
    }
    if(life === 0){
      gameState = "end";
      heart1.visible = false;
      
      
    }

   }
    

   if (lander.isTouching(asteroid3Group)){
    life = life - 1;
    asteroid3Group.destroyEach();
    if(life === 2){
     heart3.visible = false;
    }

    if(life === 1){
      heart2.visible = false;
    }
    if(life === 0){
      gameState = "end";
      heart1.visible = false;
      
      
    }

   }
   if(lander.y<50){
    background_sprite.changeAnimation("bgStars", background_stars);
    background_sprite.scale = 2.4;
    lander.y = 500;
    lander.x = 550;
   }
  }
  if(gameState === "end"){
   gameover.visible = true;

   asteroid3.visible = false;
      asteroid3Group.destroyEach();
      lander.visible = false;

      asteroid2.visible = false;
      asteroid2Group.destroyEach();
      lander.visible = false;

      asteroid1.visible = false;
      asteroid1Group.destroyEach();
      lander.visible = false;



  }


  //image(background1,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();
  
  lander.collide(ground);
  //fall down
  
  
  drawSprites();
  
  }
   


