// console.log('hello world');
const canvas = document.querySelector('canvas');
const startBtn = document.querySelector('#startBtn')
const lossImg = document.querySelector('#lossImg')
let main = document.querySelector('#main');
let countdown = document.querySelector('#countdown');
let nextlvlBtn = document.querySelector('#nextlvlBtn');
//c = context
const c = canvas.getContext('2d');
// console.log(c);

canvas.width = 1366;
canvas.height = 768;

const gravity = 0.5;
let isAnimating = false;
let gameEnd = false;
let grounded = false;

c.fillStyle = 'black';
c.fillRect(0,0,canvas.width,canvas.height);



//PLAYER 1 FACE
const pandaFace = new Image();
pandaFace.onload = function() {
    c.drawImage(pandaFace, 0, 0);
}
pandaFace.src = './panda.png';


//ARRAY TO KEEP TRACK OF PROJECTILES
  const projectiles = [];
  let lives = 3;


  function checkProjectileCollision() {
    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];
      // check for collision between the player and the projectile
      if (projectile.x > player.position.x && projectile.x < player.position.x + player.width &&
          projectile.y > player.position.y && projectile.y < player.position.y + player.height) {
        // decrease the lives and update the lifeText
        lives--;
        if(lives <= 0){
            lifeText.innerText = "YOU LOST!"
            lossImg.style.display = 'inline';
            startBtn.style.display = 'inline';
            startBtn.innerText = 'Try again';
            player.position.x = 600;
            player.position.y = 300;
            isAnimating = false;
            

            startBtn.addEventListener('click', function(){
                lives = 3;
                lifeText.innerText = `Lives left: ${lives}`
                startBtn.style.display = 'none';
                lossImg.style.display = 'none';

                
                if (!isAnimating) {
                    animate();
                    console.log('working');
                  }
                  main.style.display = 'inline';
            })
            // gameEnd = true;
        } else {
            lifeText.innerText = `Lives left: ${lives}`;
        }
        // remove the projectile from the projectiles array
        projectiles.splice(i, 1);
        i--;
      }
    }
  }



  //defining monster1
  const monster1 = new Monster({
    position: { x: 100, y: 100 },
    imageSrc: './mutalisk.gif',
    speed: { x: 5, y: 0 },
    distance: 1200
  });
  //defining monster2
  const monster2 = new Monster({
    position: { x: 800, y: 100 },
    imageSrc: './mutalisk.gif',
    speed: { x: -5, y: 0 },
    distance: 1200,
  });

//   const monster3 = new Monster({
//     position: {x:50, y: 700},
//     imageSrc: './mutalisk.png',
//     speed: {x: 0, y: 0},
//     distance: 0,
//   })
  

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




//new player start
const player = new Player({
    position:{
    x:600,
    y:300,
    },
    collisionBlocks,
    platformBlocks,
})

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
    imageSrc: './PandaMap.png',
 })

 

//is in its own loop makes the game run
function animate() {
    if (!isAnimating) {
        isAnimating = true;
    }
    window.requestAnimationFrame(animate);
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
    
    if(!gameEnd){
    player.update();
    monster2.update();
    monster1.update();
    checkProjectileCollision();
    }
    console.log(grounded);
  
    player.velocity.x = 0;
    if (keys.arrowRight.pressed) {
        // console.log('pressed');
      player.velocity.x = 5;
    } else if (keys.arrowLeft.pressed) {
      player.velocity.x = -5;
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
function winTimer(){
    let timeLeft = 3;
    const interval = setInterval(() => {
      timeLeft--;
      countdown.innerText = `${timeLeft} seconds left`;
      if(lives === 0){
        clearInterval(interval);
        countdown.innerText = `You had ${timeLeft} seconds left`
      }else if(timeLeft === 0) {
        clearInterval(interval);
        gameEnd = true;
        lifeText.innerText = 'YOU WON LETS GOOOOO'
        nextlvlBtn.style.display = 'inline';
        lossImg.style.display = 'inline';
        player.position.x = 600;
        player.position.y = 300;
        isAnimating = false;
        nextlvlBtn.innerText = 'Next level';
        main.style.display = 'none';
        countdown.innerText = `You survived!`;

        
      }
},1000)
}

const background2 = new Sprite({
    position: {
        x:0,
        y:0,
    },
    imageSrc: './PandaMap2.png',
 })

//level 2 function

function animate2() {
    if (!isAnimating) {
        isAnimating = true;
    }

    window.requestAnimationFrame(animate);
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);



    main.style.display = 'inline';
    background2.update();

    if(!gameEnd){
        player.update();
        monster2.update();
        monster1.update();
        checkProjectileCollision();
        }
}
