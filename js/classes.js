//class for player
class Player {
    constructor({position, collisionBlocks, platformBlocks}){
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height = 40;
        this.width = 40;
        this.collisionBlocks = collisionBlocks
        this.platformBlocks = platformBlocks
        
    }
    draw() {
            //makes the panda
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
        c.drawImage(pandaFace, this.position.x, this.position.y, this.width, this.height);
    }
    //updates panda position and model
    update() {
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height;
        }


       
        this.draw()
        //moves it
        this.position.x += this.velocity.x
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions()
        
        
        //increases speed
       
        
        
    }

    checkForHorizontalCollisions(){
        for(let i=0; i<this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(collision({
                object1: this,
                object2: collisionBlock,
            })
            ){
                if(this.velocity.x > 0){
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    grounded = true;
                    break;
                    
                }

                if(this.velocity.x < 0){
                    this.velocity.x =0
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                    grounded = true;
                    break;
                }
            }
        }
    }


    applyGravity(){
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }

    checkForVerticalCollisions(){
        for(let i=0; i<this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            if(collision({
                object1: this,
                object2: collisionBlock,
            })
            ){
                if(this.velocity.y > 0){
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    grounded = true;
                    break;
                }

                if(this.velocity.y < 0){
                    this.velocity.y =0
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                    grounded = true;
                    break;
                }
            }
        }
        //for platform collision blocks
        for(let i=0; i<this.platformBlocks.length; i++){
            const platformBlock = this.platformBlocks[i]

            if(collision({
                object1: this,
                object2: platformBlock,
            })
            ){
                if(this.velocity.y > 0){
                    this.velocity.y = 0
                    this.position.y = platformBlock.position.y - this.height - 0.01
                    grounded = true;
                    break;
                }

        
            }
        }
    }
}




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



//PROJECTILE CLASS
class Projectile {
    constructor(x, y, angle,width,height) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = 5;
      this.width = width;
      this.height = height;
    }
  
    draw() {
        c.save();
        c.translate(this.x, this.y);
        // c.rotate(this.angle);
        const img = new Image();
        img.src = './projectile1.png'; // replace with the path to your image file
        c.drawImage(img, 0, 0, this.width, this.height);
        c.restore();
      }
  
    update() {
      this.draw();
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
    }
  }
  
//PROJECTILE CLASS
class Projectile2 {
    constructor(x, y, angle, width, height, side) {
      this.x = side === 'left' ? x + 26 : x;
      this.y =  y-15;
      this.angle = angle;
      this.speed = 3;
      this.width = width;
      this.height = height;
 // adjust to match visual size
    }
  
    draw() {
        c.save();
        c.translate(this.x, this.y);
        // c.rotate(this.angle);
        const img = new Image();
        img.src = './projectile.png'; // replace with the path to your image file
        c.drawImage(img, 0, 0, this.width, this.height);
        c.restore();
      }
  
    update() {
      this.draw();
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
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
      
        const minInterval = 1000; // 2 seconds
        const maxInterval = 2000; // 4 seconds
        const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

        // create a projectile every 3-5 seconds with math.random
        if (Date.now() % interval < 20) {
          const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
          const projectile = new Projectile(this.position.x, this.position.y, angle, 20, 20);
          projectiles.push(projectile);
        }
      
        // updates projectile array for collision later
        
      }
  }


  class Monsterlvl2 {
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
        
        const canvasCenterX = 0; // set to 0 for left side of canvas
         const canvasCenterY = this.position.y;
        const angle = Math.atan2(canvasCenterY - this.position.y, canvasCenterX - this.position.x);
        
        const minInterval = 1000; // 2 seconds
        const maxInterval = 2000; // 4 seconds
        const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

        // create a projectile every 3-5 seconds with math.random
        if (Date.now() % interval < 20) {
          const angle = Math.atan2(player2.position.y - this.position.y, player2.position.x - this.position.x);
          const projectile = new Projectile(this.position.x, this.position.y, angle, 20, 20);
          projectiles.push(projectile);
        }
      
        
        // updates projectile array for collision later
      
      }
  }

  

  class Monster2lvl2 {
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
        if (this.position.y >= this.distance || this.position.y <= 0) {
          this.direction *= -1;
        }
      
        const minInterval = 3000; // 2 seconds
        const maxInterval = 6000; // 4 seconds
        const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

        // create a projectile every 3-5 seconds with math.random
        if (Date.now() % interval < 20) {
            const canvasCenterX = canvas.width / 2;
            const canvasCenterY = this.position.y;
            const angle = Math.atan2(canvasCenterY - this.position.y, canvasCenterX - this.position.x);
            const side = this.position.x < canvasCenterX ? 'left' : 'right'; // determine which side the monster is on
            const projectile = new Projectile2(this.position.x, this.position.y, angle, 120, 120, side);
            projectiles.push(projectile);
          }
      
        // updates projectile array for collision later
  
      }
  }


  class Monsterlvl3 {
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
      
        const minInterval = 1000; // 2 seconds
        const maxInterval = 2000; // 4 seconds
        const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

        // create a projectile every 3-5 seconds with math.random
        if (Date.now() % interval < 20) {
          const angle = Math.atan2(player2.position.y - this.position.y, player2.position.x - this.position.x);
          const projectile = new Projectile(this.position.x, this.position.y, angle, 20, 20);
          projectiles.push(projectile);
        }
      
        // updates projectile array for collision later
      
      }
  }

  class Monster2lvl3 {
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
        this.position.y += this.speed.y * this.direction;
        // check if the monster has moved the specified distance in either direction and change direction
        if (this.position.y >= this.distance || this.position.y <= 0) {
          this.direction *= -1;
        }
      
        const minInterval = 2000; // 2 seconds
        const maxInterval = 5000; // 4 seconds
        const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

        // create a projectile every 3-5 seconds with math.random
        if (Date.now() % interval < 20) {
            const canvasCenterX = canvas.width / 2;
            const canvasCenterY = this.position.y;
            const angle = Math.atan2(canvasCenterY - this.position.y, canvasCenterX - this.position.x);
            const side = this.position.x < canvasCenterX ? 'left' : 'right'; // determine which side the monster is on
            const projectile = new Projectile2(this.position.x, this.position.y, angle, 90, 90, side);
            projectiles.push(projectile);
          }
      
        // updates projectile array for collision later
  
      }
  }