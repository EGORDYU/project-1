// console.log('hello world');
const canvas = document.querySelector('canvas');
const startBtn = document.querySelector('#startBtn')
const lossImg = document.querySelector('#lossImg')
let main = document.querySelector('#main');
let countdown = document.querySelector('#countdown');
let lvlBtn1 = document.querySelector('#lvlBtn1')
let nextlvlBtn2 = document.querySelector('#nextlvlBtn2');
let nextlvlBtn3 = document.querySelector('#nextlvlBtn3');
let winImg = document.querySelector('#winImg');
let restartBtn = document.querySelector('#restartBtn');
//c = context
const c = canvas.getContext('2d');
// console.log(c);

canvas.width = 1366;
canvas.height = 768;

const gravity = 0.5;
let isAnimating = false;
let gameEnd = false;
let grounded = false;
let lvl1Won = false;
let lvl2Won = false;
let lvl3Won = false;




const startScreenImg = new Image();
startScreenImg.onload = function() {
    c.drawImage(startScreenImg, 0, 0, canvas.width, canvas.height);
}
startScreenImg.src = './images/pandascreen.png';

//PLAYER 1 FACE
const pandaFace = new Image();
    c.drawImage(pandaFace, 0, 0,canvas.width,canvas.height);
pandaFace.src = './images/panda.png';





//ARRAY TO KEEP TRACK OF PROJECTILES
  let projectiles = [];
  let lives = 3;


 




  

//refactored function to make easier
function collision({
    object1,
    object2
}){
    return(
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width && 
    object1.position.x + object1.width >= object2.position.x 
    )
}





//checking if keys pressed
 const keys = {
    arrowLeft: {
        pressed: false,
    },
    arrowRight: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
 }
 const background = new Sprite({
    position: {
        x:0,
        y:0,
    },
    imageSrc: './images/PandaMap.png',
 })

 

//is in its own loop makes the game run
//is in its own loop makes the game run
function animate() {
    if (!isAnimating) {
        isAnimating = true;
    } 
    
    
    if(!lvl1Won){
    window.requestAnimationFrame(animate);
    }
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
  
    background.update();
    
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })

    platformBlocks.forEach(platformBlock => {
        platformBlock.update();
    })
    loss(lvlBtn1,animate,player);
    if(!gameEnd){
    player.update();
    monster2.update();
    monster1.update();
    checkProjectileCollision(player);
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
      }
    }

    if(lives == 1){
        pandaFace.src = './images/1lifepanda.png';
    }
    if(lives == 3){
        pandaFace.src = './images/panda.png'
    }

    if(!lvl1Won){
    player.velocity.x = 0;
    if (keys.arrowRight.pressed) {
        // console.log('pressed');
      player.velocity.x = 5;
    } else if (keys.arrowLeft.pressed) {
      player.velocity.x = -5;
    }
}
    // clear projectiles that are out of bounds
    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];
      if (projectile.x < 0 || projectile.x > canvas.width || projectile.y < 0 || projectile.y > canvas.height) {
        projectiles.splice(i, 1);
        i--;
      }
    }
    if(lives <= 0){
        main.style.display = 'none';
    }
    
    }
  


const background2 = new Sprite({
    position: {
        x:0,
        y:0,
    },
    imageSrc:'./images/PandaMap2.png',
 })

//level 2 function

function animate2() {
    if (!isAnimating) {
        isAnimating = true;
    }





    if(!lvl2Won){
    window.requestAnimationFrame(animate2);
    }
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'rgb(255,0,0,0)';
    c.fillRect(0, 0, canvas.width, canvas.height);


 
    background2.update();

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })

    platformBlocks.forEach(platformBlock => {
        platformBlock.update();
    })
    loss(nextlvlBtn2,animate2,player2);
    if(!gameEnd){
        player2.update();
        monster22.update();
        monster12.update();
        monster122.update();
        monster222.update();
        checkProjectileCollision(player2);
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].update();
          }
        }
        if(lives == 1){
            pandaFace.src = './images/1lifepanda.png';
        }
        if(lives == 3){
            pandaFace.src = './images/panda.png'
        }
        player2.velocity.x = 0;
        if (keys.arrowRight.pressed) {
            // console.log('pressed');
          player2.velocity.x = 5;
        } else if (keys.arrowLeft.pressed) {
          player2.velocity.x = -5;
        }
      
        // clear projectiles that are out of bounds
        for (let i = 0; i < projectiles.length; i++) {
          const projectile = projectiles[i];
          if (projectile.x < 0 || projectile.x > canvas.width || projectile.y < 0 || projectile.y > canvas.height) {
            projectiles.splice(i, 1);
            i--;
          }
        }
        if(lives <= 0){
            main.style.display = 'none';
        }
}

const background3 = new Sprite({
    position: {
        x:0,
        y:0,
    },
    imageSrc:'./images/PandaMap3.png',
 })


 function animate3() {
    if (!isAnimating) {
        isAnimating = true;
    }


    if(!lvl3Won){
    window.requestAnimationFrame(animate3);
    }
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'rgb(255,0,0,0)';
    c.fillRect(0, 0, canvas.width, canvas.height);
 


    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })

    platformBlocks.forEach(platformBlock => {
        platformBlock.update();
    })

    background3.update();
    loss(nextlvlBtn3,animate3,player3);

    if(lives == 1){
        pandaFace.src = './images/1lifepanda.png';
    }
    if(lives == 3){
        pandaFace.src = './images/panda.png'
    }
    console.log("game end is" + gameEnd);
    if(!gameEnd){
        player3.update();
        monster23.update();
        monster13.update();
        monster123.update();
        monster223.update();
        checkProjectileCollision(player3);
        falling(player3)
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].update();
          }
        }
        
        player3.velocity.x = 0;
        if (keys.arrowRight.pressed) {
            // console.log('pressed');
          player3.velocity.x = 5;
        } else if (keys.arrowLeft.pressed) {
          player3.velocity.x = -5;
        }
      
        // clear projectiles that are out of bounds
        for (let i = 0; i < projectiles.length; i++) {
          const projectile = projectiles[i];
          if (projectile.x < 0 || projectile.x > canvas.width || projectile.y < 0 || projectile.y > canvas.height) {
            projectiles.splice(i, 1);
            i--;
          }
        }
        if(lives <= 0){
            main.style.display = 'none';
        }
}







//calls animation
//win function
function winTimer(level){
    let timeLeft = 5;
    const interval = setInterval(() => {
      timeLeft--;
      countdown.innerText = `${timeLeft} seconds left`;
      if(lives === 0){
        clearInterval(interval);
        countdown.innerText = `You had ${timeLeft+1} seconds left`
        lossImg.style.display = 'inline';
        nextlvlBtn2.style.display = 'none';
      }else if(timeLeft === 0 && lvl1Won == false) {
        //winning lvl1
        clearInterval(interval);
        gameEnd = true;
        winImg.style.display = 'inline';
        winImg.src = "./images/level1won.jpg"
        lifeText.innerText = 'YOU BEAT LVL 1 LETS GOOOOO'
        nextlvlBtn2.style.display = 'inline';
        level.position.x = 600;
        level.position.y = 300;
        isAnimating = true;
        lvl1Won = true;
        main.style.display = 'none';
        countdown.innerText = `You survived!`;
        
      }else if (timeLeft === 0 && lvl1Won == true && lvl2Won == false && lives > 0){
        //winning lvl2
        nextlvlBtn3.style.display = 'none';
        clearInterval(interval);
        gameEnd = true;
        winImg.style.display = 'inline';
        winImg.src = "./images/level2Won.jpg"
        lifeText.innerText = 'YOU BEAT LVL 2 LETS GOOOOO'
        level.position.x = 600;
        level.position.y = 300;
        nextlvlBtn3.innerText = 'Next Level';
        nextlvlBtn3.style.display = 'inline';
        lvl2Won = true;
        isAnimating = true;
        main.style.display = 'none';
        countdown.innerText = `You survived!`;
      } else if (timeLeft === 0 && lvl2Won == true && lives > 0) {
        //winning lvl 3
        clearInterval(interval);
        lifeText.innerText = 'You beat the game!!!'
        winImg.style.display = 'inline';
        winImg.src = "./images/level3Won.jpg"
        lvl3Won = true;
        gameEnd=true;
        isAnimating=true
        level.position.x = 600;
        level.position.y = 300;
        main.style.display = 'none';
        nextlvlBtn3.style.display = 'none';
        countdown.innerText = `You survived!`;
        restartBtn.style.display = 'inline';
      } else if (timeLeft === 0 && lvl3Won == true && lives > 0){
        clearInterval(interval);
      }
    
},1000)
}

function loss(btn, anim,player){
if(lives == 0){
  clearInterval();
  lifeText.innerText = "YOU LOST!"
  lossImg.style.display = 'inline';
  btn.style.display = 'inline';
  btn.innerText = 'Try again';
  player.position.x = 600;
  player.position.y = 300;
  isAnimating = false;
  gameEnd = true;
  

  btn.addEventListener('click', function(){
      lives = 3;
      lifeText.innerText = `Lives left: ${lives}`
      btn.style.display = 'none';
      lossImg.style.display = 'none';
      isAnimating = true;
      gameEnd = false;

      
      if (!isAnimating) {
          anim();
          console.log('working');
          
        }
        main.style.display = 'inline';
  })
  // gameEnd = true;
} else {
  lifeText.innerText = `Lives left: ${lives}`;
}}