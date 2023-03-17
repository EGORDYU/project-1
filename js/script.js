console.log('hello world');
const canvas = document.querySelector('canvas');
//c = context
const c = canvas.getContext('2d');
console.log(c);

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

c.fillStyle = 'white';
c.fillRect(0,0,canvas.width,canvas.height);





//FUNCTIONS

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
//GRAVITY

const pandaFace = new Image();
pandaFace.src = './panda.png';

class Player {
    constructor(position){
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height=200;
        this.width=200;
    }
    draw() {
            //MAKES THE RED SQUARE
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
        c.drawImage(pandaFace, this.position.x, this.position.y, this.width, this.height);
    }

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

const player = new Player({
    x:0,
    y:0,
})
const player2 = new Player({
    x: 300,
    y: 300
})

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
    imageSrc: './pandaria.png',
 })

//is in its own loop
function animate(){
    window.requestAnimationFrame(animate)
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'white';
    c.fillRect(0,0,canvas.width,canvas.height);
    background.update();
    player.update();
    // player2.update();

    player.velocity.x = 0
    if(keys.arrowRight.pressed){
        player.velocity.x =5;
    } else if(keys.arrowLeft.pressed){
        player.velocity.x = -5
    }


  
}

//calls animation
animate()

//MOVEMENT
window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'ArrowRight':
            console.log('moving right');
            keys.arrowRight.pressed = true;
        break
        case 'ArrowLeft':
            console.log('moving left');
            keys.arrowLeft.pressed = true;
        break
        case ' ':
            console.log('yup this is space');
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
                console.log('moving right');
                keys.arrowRight.pressed = false;
            break
            case 'ArrowLeft':
                console.log('moving left');
                keys.arrowLeft.pressed = false;
            break
            }
        })
    
//ENEMY SHOOTING

//PROJECTILE CODE

//WIN CONDITION TIMER

//START SCREEN??