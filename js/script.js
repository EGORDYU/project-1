// console.log('hello world');
const canvas = document.querySelector('canvas');
//c = context
const c = canvas.getContext('2d');
// console.log(c);

canvas.width = 1366;
canvas.height = 768;

const gravity = 0.5;

c.fillStyle = 'black';
c.fillRect(0,0,canvas.width,canvas.height);

// let gameEnd = false;



//FUNCTIONS
//IMAGES
class Sprite {
    constructor({position, imageSrc}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw(){
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
    }
}
//PLAYER 1 FACE
const pandaFace = new Image();
pandaFace.onload = function() {
    c.drawImage(pandaFace, 0, 0);
}
pandaFace.src = './panda.gif';

//PROJECTILE CLASS
class Projectile {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = 5;
    }
  
    draw() {
      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.angle);
      c.fillStyle = 'red';
      c.fillRect(0, 0, 10, 10);
      c.restore();
    }
  
    update() {
      this.draw();
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
    }
  }
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


//CLASS FOR MONSTER
class Monster {
    constructor({position, imageSrc, speed, distance}) {
      this.position = position;
      this.image = new Image();
      this.image.src = imageSrc;
      this.speed = speed;
      this.distance = distance;
      this.direction = 1;
    }
    //DRAWS IMAGE OF MONSTER
    draw() {
      if (!this.image) return;
      c.drawImage(this.image, this.position.x, this.position.y);
    }
    //INVOKES DRAW + PROJECTILS
    update() {
        this.draw();
        // move the monster horizontally
        this.position.x += this.speed.x * this.direction;
        // check if the monster has moved the specified distance in either direction and change direction
        if (this.position.x >= this.distance || this.position.x <= 0) {
          this.direction *= -1;
        }
      
        const minInterval = 2000; // 2 seconds
        const maxInterval = 4000; // 4 seconds
        const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

        // create a projectile every 3-5 seconds with math.random
        if (Date.now() % interval < 20) {
          const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
          const projectile = new Projectile(this.position.x, this.position.y, angle);
          projectiles.push(projectile);
        }
      
        // updates projectile array for collision later
        for (let i = 0; i < projectiles.length; i++) {
          projectiles[i].update();
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
  

//class for player
class Player {
    constructor(position){
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height=100;
        this.width=100;
        
    }
    draw() {
            //makes the panda
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
        c.drawImage(pandaFace, this.position.x, this.position.y, this.width, this.height);
    }
    //updates panda position and model
    update() {
        this.draw()
        //moves it
        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        //increases speed
        if(this.position.y + this.height + this.velocity.y < canvas.height){
        this.velocity.y += gravity
        } else {
            this.velocity.y = 0;
        }

        
    }
}


//new player start
let player = new Player({
    x:600,
    y:620,
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
//WHERE TO PUT BACKGROUND
 const background = new Sprite({
    position: {
        x:0,
        y:0,
    },
    imageSrc: './PandaMap.png',
 })

 

//is in its own loop makes the game run
function animate() {
    window.requestAnimationFrame(animate);
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
  
    
    background.update();
    
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })
    

    player.update();
    monster2.update();
    monster1.update();
    checkProjectileCollision();
  
    player.velocity.x = 0;
    if (keys.arrowRight.pressed) {
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

  }

//calls animation
animate()

//MOVEMENT
window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'ArrowRight':
            // console.log('moving right');
            keys.arrowRight.pressed = true;
        break
        case 'ArrowLeft':
            // console.log('moving left');
            keys.arrowLeft.pressed = true;
        break
        case ' ':
            // console.log('yup this is space');
            if (player.position.y + player.height === canvas.height) {
                // Only jump if player is on the ground
                player.velocity.y = -15;
            }
        break
        }
    })

    window.addEventListener('keyup', (event) => {
        switch (event.key){
            case 'ArrowRight':
                // console.log('moving right');
                keys.arrowRight.pressed = false;
            break
            case 'ArrowLeft':
                // console.log('moving left');
                keys.arrowLeft.pressed = false;
            break
            }
        })
    
