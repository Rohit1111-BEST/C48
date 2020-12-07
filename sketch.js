var playerImg, AIImg;
var player, AI;
var angle;
var bulletGroup, AIbulletGroup;
var gameState="play"
var bulletSound


function preload (){
  playerImg=loadImage("player.png");
  AIImg=loadImage("AI.png");
  bulletSound=loadSound("bullet.mp3")
  }

function setup() {
  createCanvas(800,600);
  player=createSprite(200,200,50,50)
 AI=createSprite(400, 200, 50, 50);
player.addImage(playerImg);
AI.addImage(AIImg);
player.scale=0.25;
  AI.scale=0.25;
  bulletGroup= new Group()
  AIbulletGroup= new Group()
  
}

function draw() {
  background(6,25,55);  
  if(gameState==="play"){
    if(keyDown("w")){
      player.y=player.y-10
     
       }
     
       if(keyDown("s")){
         player.y=player.y+10
       }
       if(keyDown("d")){
        player.x=player.x+10
      }
    
      if(keyDown("a")){
        player.x=player.x-10
      }
      if(keyWentDown("space") ){
    spawnBullet(player.x,player.y)
    spawnAIBullet(AI.x,AI.y)
    bulletSound.play()

        }
      angle = (Math.atan2(mouseY-player.y, mouseX-player.x)+1.7)*55;
      player.rotation=angle
      console.log(angle) 
     // console.log(player.rotation)
    
      if(AI.x>player.x && AI.y>player.y){
    AI.rotation=315;

      }
      else if(AI.x>player.x && AI.y<player.y){
        AI.rotation=225;

          }
    
          else if(AI.x<player.x && AI.y<player.y){
            AI.rotation=135;

          }
    
              else if(AI.x<player.x && AI.y>player.y){
                AI.rotation=45;
               
                  }
    if(bulletGroup.isTouching(AI)){
    gameState="win"
    }
    if(AIbulletGroup.isTouching(player)){
      gameState="lose"
      }
  }
  

 

else if(gameState==="win"){
  textSize(20)
  fill("orange")
  text("U WIN",width/2,height/2)

  player.destroy()
  AI.destroy()
}
else if(gameState==="lose"){
  textSize(20)
  fill("white")
  text("U lose",width/2,height/2)

  player.destroy()
  AI.destroy()
}
  drawSprites();

}

function spawnBullet (x,y){
  var bullet=createSprite(x,y,4,4)

if(angle>0 && angle<=40){
  bullet.velocityX=1
  bullet.velocityY=-2
}

else if(angle>40 && angle<=80){
  bullet.velocityX=2
  bullet.velocityY=0.1
}

else if(angle>80 && angle<=120){
  bullet.velocityX=1
  bullet.velocityY=1
}

else if(angle>120 && angle<=160){
  bullet.velocityX=0.1
   bullet.velocityY=2
}

else if(angle>160 && angle<=200){
  bullet.velocityX=0
  bullet.velocityY=2
}

else if(angle>200 && angle<=240){
  bullet.velocityX=-2
  bullet.velocityY=0.1
}

else if(angle>240 && angle<=280){
  bullet.velocityX=-2
  bullet.velocityY=-1
}

else if(angle>-80 && angle<=-40){
  bullet.velocityX=-2
  bullet.velocityY=-2
}

else if(angle>-40 && angle<=0){
  bullet.velocityX=0.1
  bullet.velocityY=-2
}

  bullet.shapeColor="white"

  bulletGroup.add (bullet)
}


function spawnAIBullet (x,y){
  var bullet=createSprite(x,y,4,4)
 
if (AI.rotation===45){
  bullet.velocityX=3
  bullet.velocityY=-3
}

else if (AI.rotation===135){
  bullet.velocityX=3
  bullet.velocityY=3
}

else if (AI.rotation===225){
  bullet.velocityX=-3
  bullet.velocityY=3
}

else if (AI.rotation===315){
  bullet.velocityX=-3
  bullet.velocityY=-3
}

  bullet.shapeColor="orange"
  AIbulletGroup.add (bullet)
}

