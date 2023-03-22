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

  //defining monster1
  const monster12 = new Monsterlvl2({
    position: { x: 100, y: 100 },
    imageSrc: './mutalisk.gif',
    speed: { x: 5, y: 0 },
    distance: 1200
  });
  //defining monster2
  const monster22 = new Monsterlvl2({
    position: { x: 800, y: 100 },
    imageSrc: './mutalisk.gif',
    speed: { x: -5, y: 0 },
    distance: 1200,
  });


  const monster122 = new Monster2lvl2({
    position: { x: 1250, y: 640 },
    imageSrc: './monster2.png',
    speed: { x: 0, y: 0 },
    distance: 0
  });

  const monster222 = new Monster2lvl2({
    position: { x: -25, y: 640 },
    imageSrc: './monster2.png',
    speed: { x: 0, y: 0 },
    distance: 0,
  });


    //defining monster1
    const monster13 = new Monsterlvl3({
        position: { x: 100, y: 100 },
        imageSrc: './mutalisk.gif',
        speed: { x: 5, y: 0 },
        distance: 1200
      });
      //defining monster2
      const monster23 = new Monsterlvl3({
        position: { x: 800, y: 100 },
        imageSrc: './mutalisk.gif',
        speed: { x: -5, y: 0 },
        distance: 1200,
      });
    
    
      const monster123 = new Monster2lvl3({
        position: { x: 1250, y: 640 },
        imageSrc: './monster2.png',
        speed: { x: 0, y: 0 },
        distance: 0
      });
    
      const monster223 = new Monster2lvl3({
        position: { x: -25, y: 640 },
        imageSrc: './monster2.png',
        speed: { x: 0, y: 0 },
        distance: 0,
      });