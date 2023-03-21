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


  function checkProjectileCollision2() {
    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];
      // check for collision between the player and the projectile
      if (projectile.x > player2.position.x && projectile.x < player2.position.x + player2.width &&
          projectile.y > player2.position.y && projectile.y < player2.position.y + player2.height) {
        // decrease the lives and update the lifeText
        lives--;
        if(lives <= 0){
            lifeText.innerText = "YOU LOST!"
            lossImg.style.display = 'inline';
            startBtn.style.display = 'inline';
            startBtn.innerText = 'Try again';
            player2.position.x = 600;
            player2.position.y = 300;
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