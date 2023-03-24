



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
      if(grounded === true){
      player.velocity.y = -15;
      if(lvl1Won === true){
      player2.velocity.y = -15;
      }
      if(lvl2Won === true){
        player3.velocity.y = -15;
        }
      }
      grounded = false;
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


      startBtn.addEventListener('click', function(){
        if (!isAnimating) {
            animate();
          }
          projectiles= [];
          startBtn.style.display ='none';
          winTimer(player);
          gameEnd = false;
          main.style.display = 'inline';
          lossImg.style.display = 'none';
          winImg.style.display = 'none';
          lives = 3;
          lifeText.innerText = `Lives left: ${lives}`
          
    })

    lvlBtn1.addEventListener('click', function(){
      
        projectiles= [];
        lvlBtn1.style.display ='none';
        gameEnd = false;
        main.style.display = 'inline';
        lossImg.style.display = 'none';
        winImg.style.display = 'none';
        lives = 3;
        lifeText.innerText = `Lives left: ${lives}`
        if (isAnimating) {
          animate();
        }
        winTimer(player)
        
  })
    

      nextlvlBtn2.addEventListener('click', function(){
        projectiles= [];
        main.style.display = 'inline';
        nextlvlBtn2.style.display = 'none';
        lives = 3;
        lifeText.innerText = `Lives left:${lives}`;
        gameEnd = false;
        winImg.style.display = 'none';
        if (isAnimating) {
          animate2();
        }
        winTimer(player2)
          

      })

      nextlvlBtn3.addEventListener('click', function(){
        projectiles= [];
        main.style.display = 'inline';
        nextlvlBtn3.style.display = 'none';
        lives = 3;
        lifeText.innerText = `Lives left:${lives}`;
        winImg.style.display = 'none';
        console.log('clicking');
        gameEnd = false;
        if (isAnimating) {
          animate3();
          console.log(gameEnd);
        }
        winTimer(player3)
          

      })

      restartBtn.addEventListener('click', function(){
        lvl1Won = false;
        lvl2Won = false;
        lvl3Won = false;
        gameEnd = false;
        lives = 3;


        startScreenImg.src = './images/pandascreen.png';
        lifeText.style.display = `Lives left: ${lives}`
        main.style.display = 'inline';
        restartBtn.style.display = 'none';
        lvlBtn1.style.display ='inline';
        lvlBtn1.innerText= 'Play again?';
        countdown.innerText = "Survive 30 seconds in each stage to win!"
        winImg.style.display = 'none';
      })