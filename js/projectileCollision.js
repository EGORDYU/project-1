function checkProjectileCollision(player) {
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


  