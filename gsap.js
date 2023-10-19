var tl = gsap.timeline({
    repeat: 1,
    repeatDelay: 1,
  });
  
  tl.from(".header", {
    y: -200,
    duration: 1,
  });
  
  tl.from("#eskano-text", {
    opacity: 0,
    duration: 1,
    delay: 0.5,
  });
  
  // planet rotation
  tl.to("#planetimg", 4, {
    rotation: 720,
    ease: Expo.easeOut,
    repeat: -1,
    yoyo: true,
  });

  tl.from('.othercontetn',1,{
    x:-100,
    delay:0.5,
  })
  
  function loopRotation() {
    tl.play();
  }
  
  loopRotation();
