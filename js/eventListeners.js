startBtn.addEventListener('click', function(){
    if (!isAnimating) {
        animate();
      }
      startBtn.style.display ='none';
      winTimer(player);
      gameEnd = false;
      main.style.display = 'inline';
      lossImg.style.display = 'none';
      lives = 3;
      lifeText.innerText = `Lives left: ${lives}`
})




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


      nextlvlBtn.addEventListener('click', function(){
        nextlvlBtn.style.display = 'none';
        lives = 3;
        lifeText.innerText = `Lives left:${lives}`;
        gameEnd = false;
        if (isAnimating) {
          animate2();
        }
        winTimer(player2)
          

      })