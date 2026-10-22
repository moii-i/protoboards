(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const brand=document.querySelector('.brand'),hero=document.querySelector('.hero>div');
  if(hero){const actions=document.createElement('div');actions.className='hero-actions';actions.innerHTML='<a class="hero-start" href="#montaje">Empezar / continuar <span aria-hidden="true">↗</span></a><a href="#materiales">Ver materiales</a><span class="save-badge"><i aria-hidden="true"></i> Avance guardado automáticamente</span>';hero.append(actions);}
  function intro(){
    if(reduced.matches||!brand||document.querySelector('.brand-intro'))return;
    const overlay=document.createElement('div');overlay.className='brand-intro';
    const mark=brand.querySelector('svg').cloneNode(true);mark.classList.add('intro-mark');
    const card=document.createElement('div');card.className='intro-card';card.append(mark);
    const title=document.createElement('strong');title.textContent='Protoboards';
    const sub=document.createElement('span');sub.textContent='by moi & chat';card.append(title,sub);
    const line=document.createElement('div');line.className='intro-trace';card.append(line);
    const skip=document.createElement('button');skip.type='button';skip.textContent='Entrar →';skip.className='intro-skip';overlay.append(card,skip);document.body.append(overlay);
    let closing=false,timer;function close(){if(closing)return;closing=true;clearTimeout(timer);overlay.classList.add('is-leaving');setTimeout(()=>overlay.remove(),250);}
    skip.onclick=close;overlay.addEventListener('keydown',e=>{if(e.key==='Escape')close();});timer=setTimeout(close,1050);
    reduced.addEventListener('change',()=>{if(reduced.matches)close();},{once:true});
  }
  try{if(!sessionStorage.getItem('protoboards:welcome:v1')){sessionStorage.setItem('protoboards:welcome:v1','1');intro();}}catch{intro();}
  const replay=document.createElement('button');replay.type='button';replay.className='brand-replay';replay.title='Ver animación de entrada';replay.setAttribute('aria-label','Ver animación de entrada');replay.textContent='↻';replay.onclick=intro;replay.hidden=reduced.matches;brand?.after(replay);reduced.addEventListener('change',()=>replay.hidden=reduced.matches);
})();
