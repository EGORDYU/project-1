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
let lvl1Won = false;


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


 

  const player = new Player({
    position:{
    x:600,
    y:300,
    },
    collisionBlocks,
    platformBlocks,
})

const player2 = new Player({
    position: { 
    x: 600,
    y: 300,
    },
    collisionBlocks: collisionBlocks2,
    platformBlocks: platformBlocks2
});

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

  //defining monster1
  const monster12 = new Monsterlvl2({
    position: { x: 100, y: 100 },
    imageSrc: './mutalisk.gif',
    speed: { x: 5, y: 0 },
    distance: 1200
  });
  //defining monster2
  const monster22 = new Monsterlvl2({
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
    
    if(!gameEnd){
    player.update();
    monster2.update();
    monster1.update();
    checkProjectileCollision();
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
        isAnimating = true;
        lvl1Won = true;
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
    imageSrc:'./PandaMap2.png',
 })

//level 2 function

function animate2() {
    if (!isAnimating) {
        isAnimating = true;
    }

    isAnimating = false;

    window.requestAnimationFrame(animate2);
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    console.log(gameEnd);


    main.style.display = 'inline';
    background2.update();

    if(!gameEnd){
        player2.update();
        monster22.update();
        monster12.update();
        checkProjectileCollision2();
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
