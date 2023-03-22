function checkProjectileCollision(player) {
    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];
      // check for collision between the player and the projectile
      if (projectile.x + projectile.width >= player.position.x && 
        projectile.x <= player.position.x + player.width &&
        projectile.y + projectile.height >= player.position.y && 
        projectile.y <= player.position.y + player.height) {
          console.log('hit');
        // decrease the lives and update the lifeText
        lives--;
          
        // remove the projectile from the projectiles array
        projectiles.splice(i, 1);
        i--;
      }
    }
  }


  