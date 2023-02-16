var alienbulletGroup, playerBulletGroup,alienGroup,coinGroup
var gameState="start"
function preload(){
  backgroundImage = loadImage("stars.jpeg");
  playerImage=loadImage("player.png")
  alien1Image=loadImage("alien1.png")
  alien2Image=loadImage("alien2.png")
  alien3Image=loadImage("alien3.png")
  alien4Image=loadImage("alien4.png")
  coinImage=loadImage("coin.png")
  playerbulletImage=loadImage("playerbullet.png")
  alienbulletImage=loadImage("alienbullet.png")
  
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(width/2,height/2)
  bg.addImage("bg",backgroundImage)
  bg.velocityX=-6
bg.scale=1.5
player=createSprite(width/20,height/2)
player.addImage("player",playerImage)
player.scale=0.6
  alienGroup=new Group()
  coinGroup=new Group()
  playerBulletGroup=new Group()
  alienbulletGroup=new Group()
  score=0
}

function draw() {
 background(0);

 if(gameState==="start"){
startgame()
 }
 else if(gameState==="play"){
gamePlay()
 }
 else{
endgame()
 }
 
}

function gamePlay(){
  player.y=mouseY
  if(bg.x<width/8){
    bg.x=width/2
  }
 if(keyDown("space")|| touches.length>0){
   if(frameCount%5==0){
 
   bullet=createSprite(player.x+100,player.y)
 bullet.addImage("bullet",playerbulletImage)
 bullet.velocityX=10
 bullet.scale=0.1
 playerBulletGroup.add(bullet)
 }
 }
 
 player.overlap(coinGroup,collectCoins)
 for(var i=0;i<playerBulletGroup.length;i++){
 for(var j=0;j<alienbulletGroup.length;j++){
   if(playerBulletGroup.isTouching(alienbulletGroup)){
     destroybullets(playerBulletGroup[i],alienbulletGroup[j])
 }
 }
 
 }
 for(var i=0;i<playerBulletGroup.length;i++){
   for(var j=0;j<alienGroup.length;j++){
     if(playerBulletGroup.isTouching(alienGroup)){
       destroyaliens(playerBulletGroup[i],alienGroup[j])
   }
   }
   
   }
 if(player.isTouching(alienGroup) || player.isTouching(alienbulletGroup)){
   gameState="over"
 }
 //playerbullet.isTouching(alienbulletGroup,destroybullets)
 //playerbullet .isTouching(alienGroup,destroyaliens)
 // setInterval(regularBullet(),5000)
 regularBullet()
 spawnAliens()
 spawnCoins()
  drawSprites()
}

function spawnAliens(){
  if(frameCount%80==0){
    var alien=createSprite(width,random(50,height-50))
    var r=Math.round(random(1,4))
    switch(r){
      case 1:alien.addImage("alien",alien1Image)
break
      case 2:alien.addImage("alien",alien2Image)
break
      case 3:alien.addImage("alien",alien3Image)
break
     case 4:alien.addImage("alien",alien4Image)
break
default:break
    }
    alien.velocityX=-6.5
    alien.scale=1.5
    alien.velocityY=random(-2,2)
    alienGroup.add(alien)
    //spawnBullet(alien.x,alien.y)
  }
}

function spawnBullet(a,b){
var alienbullet=createSprite(a,b)
alienbullet.addImage("bullet",alienbulletImage)
alienbullet.setVelocity(-50,0)
alienbullet.scale=0.5
  alienbulletGroup.add(alienbullet)
}
function regularBullet(){
  if(frameCount%80==0){

  
  for(var i=0;i<alienGroup.length;i++){
    spawnBullet(alienGroup[i].x,alienGroup[i].y)
  }
}
}

function spawnCoins(){
  if(frameCount%120===0){
    var coin=createSprite(width,random(50,height-50))
    coin.addImage("coin",coinImage)
    coin.velocityX=random(-3,-6)
    coinGroup.add(coin)
  }
}

function collectCoins(player,coin){
coin.destroy()
score+=5

}
function destroybullets(pbullet,alien){
  pbullet.destroy()
  //playerbullet.remove(pbullet)
  //alienbulletGroup.remove(alien)
  alien.destroy()
  score++
}
function destroyaliens(player,alien){
  alien.destroy()
  score+=10
}
function startgame()
{
  swal(
    {
      title: `lets Go and Win with Alien Raiders`,
      text: "Alien Raider!! tap or click to start",
      imageUrl:
        "alien1.png",
      imageSize: "150x150",
      confirmButtonText: "Lets Go"
    },
    function(isConfirm) {
      if (isConfirm) {
        gameState="play";
        
      }
    }
  );
}
function endgame(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "player.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}







