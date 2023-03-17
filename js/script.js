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

//GRAVITY

class Player {
    constructor(position){
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height=100;
    }
    draw() {
            //MAKES THE RED SQUARE
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,100,this.height);
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
    y:0
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

//is in its own loop
function animate(){
    window.requestAnimationFrame(animate)
    //FILLS WHOLE THING WHITE
    c.fillStyle = 'white';
    c.fillRect(0,0,canvas.width,canvas.height);
    player.update();
    player2.update();

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
            player.velocity.y = -15;
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