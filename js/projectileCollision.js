let invulnerable = false;
const INVULNERABILITY_DURATION = 1000; // 1 second

function checkProjectileCollision(player) {
  for (let i = 0; i < projectiles.length; i++) {
    const projectile = projectiles[i];
    // check for collision between the player and the projectile
    if (projectile.x + projectile.width >= player.position.x && 
      projectile.x <= player.position.x + player.width &&
      projectile.y + projectile.height >= player.position.y && 
      projectile.y <= player.position.y + player.height) {
      // decrease the lives and update the lifeText
      if (!invulnerable) {
        lives--;
        invulnerable = true;
        projectiles.splice(i, 1);
      i--;
        setTimeout(() => {
          invulnerable = false;
        }, INVULNERABILITY_DURATION);
      }
      // remove the projectile from the projectiles array
      
    }
  }
}



function falling(player){
console.log('player position:' + player.position.y);
console.log('player height:' + player.height + 2)
console.log('canvas.height:' + canvas.height)
        if (player.position.y + player.height + 2 >= canvas.height) {
            
            // the player has hit the bottom of the canvas, decrement lives by 3
            lives = 0;
        }
    }