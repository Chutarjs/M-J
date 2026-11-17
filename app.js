(() => {
  const TIME_ZONE = 'America/Costa_Rica', START_YEAR = 2026;
  const openedKey = 'estrellita-advent-opened-2026';
  const specialKey = 'estrellita-special-november-19-2026';
  const openedDays = new Set(JSON.parse(localStorage.getItem(openedKey) || '[]'));
  const photosOfUs = [1,2,3,4,5,6].map(number=>`assets/images/us (${number}).jpg`);
  const themes = {
    rapunzel:{name:'Rapunzel',days:[1,24],icon:'✦',fallback:'farolitos & flores'}, lps:{name:'Littlest Pet Shop',days:[2,18],icon:'♧',fallback:'huellitas pastel'}, nana:{name:'Nana',days:[3,19],icon:'✷',fallback:'recortes punk'}, naruto:{name:'Naruto',days:[4,13,21],icon:'〰',fallback:'tinta & remolinos'}, wanda:{name:'Scarlet Witch',days:[5,22],icon:'◉',fallback:'runas rojas'}, spiderman:{name:'Spider-Man',days:[6,15,23],icon:'✹',fallback:'viñeta cómic'}, sabrina:{name:'Sabrina Carpenter',days:[16],icon:'♡',fallback:'lazos & espresso'}, olivia:{name:'Olivia Rodrigo',days:[17],icon:'★',fallback:'libreta violeta'}, taylor:{name:'Taylor Swift',days:[20],icon:'✧',fallback:'pulseras & polaroid'}, coupon:{name:'Cupón',days:[7,14],icon:'✦',fallback:'vale para ti'}, quiz:{name:'Quiz poético',days:[8],icon:'?',fallback:'una pregunta especial'}, nicknames:{name:'Quiz de apodos',days:[9],icon:'♡',fallback:'clave suprema'}, mexico:{name:'México',days:[10],icon:'☀',fallback:'recuerdos de viaje'}, disney:{name:'Disney',days:[11],icon:'✧',fallback:'magia y felicidad'}, music:{name:'Música',days:[12],icon:'♫',fallback:'una canción para ti'}
  };
  const themesByDay = Object.fromEntries(Object.entries(themes).flatMap(([key,t]) => t.days.map(day => [day,{key,...t}])));
  themesByDay[9]={key:'mexico',name:'México',icon:'☀',fallback:'recuerdos de viaje'};
  themesByDay[10]={key:'nicknames',name:'Quiz de apodos',icon:'♡',fallback:'clave suprema'};
  themesByDay[15]={key:'cats',name:'Gatos',icon:'♡',fallback:'gatitos para ti'};
  themesByDay[16]={key:'serious',name:'Pregunta seria',icon:'?',fallback:'una pregunta para ti'};
  themesByDay[17]={key:'ojitos',name:'Ojitos',icon:'♡',fallback:'una canción para tus ojitos'};
  themesByDay[18]={key:'guatemala',name:'Guatemala',icon:'✦',fallback:'nuestra primera aventura'};
  themesByDay[19]={key:'meandyou',name:'Me and you',icon:'♫',fallback:'una canción para nosotros'};
  themesByDay[20]={key:'pets',name:'Mascotas',icon:'♧',fallback:'una pregunta para ti'};
  themesByDay[21]={key:'coupon',name:'Cuponzote',icon:'✦',fallback:'vale para ti'};
  themesByDay[22]={key:'queen',name:'My Queen',icon:'♡',fallback:'una canción para ti'};
  themesByDay[23]={key:'petalito',name:'Mi petalito',icon:'♡',fallback:'una carta para ti'};
  themesByDay[24]={key:'colochitos',name:'Colochitos',icon:'♡',fallback:'nuestra canción final'};
  const envelopeAssets = {rapunzel:'envelope-lilac.png',lps:'envelope-lilac.png',nana:'envelope-punk.png',naruto:'envelope-parchment.png',wanda:'envelope-wine.png',spiderman:'envelope-wine.png',sabrina:'envelope-wine.png',olivia:'envelope-lilac.png',taylor:'envelope-lilac.png',coupon:'envelope-wine.png',quiz:'envelope-parchment.png',nicknames:'envelope-lilac.png',mexico:'envelope-parchment.png',disney:'envelope-lilac.png',music:'envelope-wine.png'};
  envelopeAssets.cats='envelope-lilac.png'; envelopeAssets.serious='envelope-parchment.png'; envelopeAssets.ojitos='envelope-lilac.png'; envelopeAssets.meandyou='envelope-lilac.png'; envelopeAssets.guatemala='envelope-parchment.png'; envelopeAssets.pets='envelope-lilac.png'; envelopeAssets.queen='envelope-lilac.png'; envelopeAssets.petalito='envelope-lilac.png'; envelopeAssets.colochitos='envelope-lilac.png';
  const calendar = document.querySelector('#calendar'), grid = document.querySelector('#calendar-grid');
  const letterDialog = document.querySelector('#letter-dialog');
  const quizDialog = document.querySelector('#quiz-dialog'), quizKey = 'estrellita-advent-quiz-2026';
  const couponsKey = 'estrellita-advent-coupons-2026';
  const coupons = {movie:{day:7,number:'01',title:'Cupón de libre elección por 1 semana',description:'Te has ganado un cupón para escoger todo el tipo de entretenimiento que vamos a ver por 1 semana entera, sin chistar ni alegatos.'},sushi:{day:14,number:'02',title:'Te has ganado un rollo de sushi',description:'Puedes usar este cupón para pedir un rollo de sushi que tú quieras cuando quieras.'},yoba:{day:21,number:'03',title:'Te has ganado un yobaaaa',description:'Canjea este cupón cuando quieras un yoba de tu novioooo.'}};
  coupons.besos={day:16,number:'♡',title:'Cupón de ataque de besos',description:'Un ataque de besos para ti, mi amor.'};
  function costaRicaDate() { const p = new Intl.DateTimeFormat('en-CA',{timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()), v=t=>Number(p.find(x=>x.type===t).value); return {year:v('year'),month:v('month'),day:v('day')}; }
  function isUnlocked(day) { const t=costaRicaDate(); return t.year>START_YEAR || (t.year===START_YEAR && t.month===12 && t.day>=day); }
  const imagePath = day => { const imageDay=({9:10,10:9,18:19,19:18})[day] || day; return imageDay === 20 || imageDay === 21 ? `assets/images/day${imageDay}.jpg` : `assets/images/day-${String(imageDay).padStart(2,'0')}.jpg`; };
  const openingText = day => `Este sobre se abre el ${day} de diciembre de 2026 a las 00:00.`;
  function renderGrid() {
    grid.innerHTML=''; const template=document.querySelector('#envelope-template');
    for(let day=1;day<=24;day++) {
      const theme=themesByDay[day], unlocked=isUnlocked(day), opened=openedDays.has(day), el=template.content.firstElementChild.cloneNode(true);
      el.dataset.theme=theme.key; el.style.setProperty('--tilt',`${[-2,1.4,-1,2.2,-.7,1][(day-1)%6]}deg`);
      el.querySelector('.envelope-art').src=`assets/art/${envelopeAssets[theme.key]}`;
      el.querySelector('.envelope-number').textContent=String(day).padStart(2,'0'); el.querySelector('.envelope-sticker').textContent=theme.icon; el.querySelector('.envelope-topic').textContent=theme.name;
      if (window.CANCIONES?.[day]) { el.classList.add('has-song'); el.querySelector('.song-stamp').textContent='♫ canción'; }
      const status=el.querySelector('.envelope-status'), dayQuiz=quizForDay(day), quizState=readQuizState()[day];
      if(!unlocked) { el.classList.add('locked'); status.textContent='🔒'; el.setAttribute('aria-label',`Día ${day}, bloqueado. ${openingText(day)}`); }
      else if(dayQuiz && !quizState?.passed && !canTryDayQuiz(day)) { el.classList.add('quiz-wait'); status.textContent=`clave: ${displayDate(quizState.retryOn)}`; el.setAttribute('aria-label',`Día ${day}, espera hasta ${displayDate(quizState.retryOn)} para intentar la clave otra vez`); }
      else if(dayQuiz && !quizState?.passed) { el.classList.add('quiz-gated'); status.textContent='resolver clave'; el.setAttribute('aria-label',`Resolver una pregunta para abrir el día ${day}`); }
      else if(opened) { el.classList.add('opened'); status.textContent='abierto ♡'; el.setAttribute('aria-label',`Día ${day}, abierto`); }
      else { status.textContent='abrir ✉'; el.setAttribute('aria-label',`Abrir día ${day}`); }
      el.addEventListener('click',()=>!unlocked?showLocked(day):(dayQuiz && !readQuizState()[day]?.passed ? openDayQuiz(day) : openLetter(day))); grid.append(el);
      if(day%6===0 && day<24) {
        const photos=document.createElement('div'); photos.className='photo-sticker-row';
        photosOfUs.slice(day/3-2,day/3).forEach(src=>{const img=document.createElement('img');img.src=src;img.alt='Foto de nosotros';img.loading='lazy';photos.append(img);});
        grid.append(photos);
      }
    }
  }
  function renderFallback(el,day) { const t=themesByDay[day]; el.textContent=`${t.icon}  ${t.fallback}`; el.className=`image-fallback ${t.key}`; }
  function openLetter(day) {
    openedDays.add(day); localStorage.setItem(openedKey,JSON.stringify([...openedDays])); renderGrid();
    const theme=themesByDay[day], message=window.MENSAJES[day]||{titulo:`Día ${day}`,texto:''};
    document.querySelector('#letter-day').textContent=`Día ${String(day).padStart(2,'0')} · diciembre`;
    document.querySelector('#letter-title').textContent=message.titulo; document.querySelector('#letter-message').textContent=message.texto;
    renderDayCoupon(day); renderDayTravel(day); document.querySelector('#intro-calendar-button').hidden=true;
    const dayType=window.CANCIONES?.[day]?'song':quizForDay(day)?'quiz':couponForDay(day)?'coupon':travelForDay(day)?'travel':'letter';
    document.querySelector('#letter-content').classList.toggle('coupon-letter',dayType==='coupon');
    document.querySelector('#letter-decoration').hidden=false;
    document.querySelector('#letter-day').hidden=dayType==='coupon';
    [['#letter-title',dayType==='letter'||dayType==='quiz'||day===24],['#letter-message',dayType==='letter'||dayType==='quiz'||day===24],['.letter-image-wrap',true]].forEach(([selector,visible])=>{const element=document.querySelector(selector);element.hidden=!visible;element.style.display=visible?'':'none';});
    document.querySelector('#day-coupon-title').hidden=false;
    const song=window.CANCIONES?.[day], songCard=document.querySelector('#song-card'), songLink=document.querySelector('#song-link');
    let songVideo=document.querySelector('#song-video'); if (!songVideo) { songVideo=document.createElement('iframe'); songVideo.id='song-video'; songVideo.className='song-video'; songVideo.title='Video de la canción'; songVideo.loading='lazy'; songVideo.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; songVideo.allowFullscreen=true; songVideo.style.cssText='display:block;width:100%;aspect-ratio:16/9;margin-top:.9rem;border:0;border-radius:12px'; songLink.before(songVideo); }
    songCard.hidden=!song;
    if (song) {
      document.querySelector('#song-title').textContent=song.titulo;
      document.querySelector('#song-artist').textContent=song.artista || '';
      document.querySelector('#song-artist').hidden=!song.artista;
      document.querySelector('#song-reason').textContent=song.motivo || '';
      songLink.hidden=true; songLink.removeAttribute('href');
      const spotifyEmbed=document.querySelector('#spotify-embed'); if (spotifyEmbed) { spotifyEmbed.hidden=true; spotifyEmbed.removeAttribute('src'); }
      songVideo.hidden=!song.video; if (song.video) songVideo.src=song.video; else songVideo.removeAttribute('src');
      const songAudio=document.querySelector('#song-audio'); songAudio.hidden=true; songAudio.removeAttribute('src');
    }
    const deco=document.querySelector('#letter-decoration'); deco.className=`letter-decoration ${theme.key}`; deco.textContent=`${theme.icon} ${theme.name} ${theme.icon}`;
    const image=document.querySelector('#letter-image'), fallback=document.querySelector('#image-fallback'), imageWrap=document.querySelector('.letter-image-wrap'); image.alt=`Imagen del día ${day}: ${theme.name}`;
    image.onload=()=>{image.hidden=false;fallback.hidden=true}; image.onerror=()=>{image.hidden=true;fallback.hidden=true;imageWrap.hidden=true;imageWrap.style.display='none'}; image.src=song?.imagen||imagePath(day);
    const media = document.querySelector('#letter-media'), audio = document.querySelector('#letter-audio'), video = document.querySelector('#letter-video');
    audio.hidden = !message.audio; video.hidden = !message.video; media.hidden = !message.audio && !message.video;
    if (message.audio) audio.src = message.audio; else audio.removeAttribute('src');
    if (message.video) video.src = message.video; else video.removeAttribute('src');
    document.querySelector('#letter-content').classList.toggle('final-letter',day===24); letterDialog.showModal();
  }
  function isSpecialUnlocked() { return dateKey(costaRicaDate()) >= '2026-11-19'; }
  function renderSpecialButton() {
    const button=document.querySelector('#open-special'), status=document.querySelector('#special-status'), opened=localStorage.getItem(specialKey)==='true';
    button.classList.toggle('special-ready',isSpecialUnlocked()); status.textContent=!isSpecialUnlocked()?'se abre 19 nov. · 00:00':opened?'abierta ♡':'abrir ahora →';
  }
  function openSpecialLetter() {
    if (!isSpecialUnlocked()) { const box=document.createElement('div'); box.className='lock-message'; box.textContent='Esta sorpresa se abre el 19 de noviembre de 2026 a las 00:00.'; document.body.append(box); requestAnimationFrame(()=>box.classList.add('visible')); setTimeout(()=>{box.classList.remove('visible');setTimeout(()=>box.remove(),250)},3600); return; }
    const message=window.MENSAJES.noviembre19 || {titulo:'Una sorpresa para ti',texto:''}; localStorage.setItem(specialKey,'true'); renderSpecialButton();
    document.querySelector('#letter-day').textContent='19 de noviembre · antes de diciembre'; document.querySelector('#letter-title').textContent=message.titulo; document.querySelector('#letter-message').textContent=message.texto;
    ['#letter-title','#letter-message','.letter-image-wrap'].forEach(selector=>{const element=document.querySelector(selector);element.hidden=false;element.style.display='';});
    ['#letter-decoration','#letter-day'].forEach(selector=>{document.querySelector(selector).hidden=false;});
    const deco=document.querySelector('#letter-decoration'); deco.className='letter-decoration wanda'; deco.textContent='✦ una sorpresa para ti ✦';
    document.querySelector('#song-card').hidden=true; document.querySelector('#day-coupon').hidden=true; document.querySelector('#day-travel').hidden=true; document.querySelector('#intro-calendar-button').hidden=false;
    const image=document.querySelector('#letter-image'), fallback=document.querySelector('#image-fallback'); image.alt='Imagen de la sorpresa del 19 de noviembre'; image.onload=()=>{image.hidden=false;fallback.hidden=true}; image.onerror=()=>{image.hidden=true;fallback.hidden=false;fallback.className='image-fallback wanda';fallback.textContent='una sorpresa antes de diciembre'}; image.src='assets/images/nov-19.jpg';
    const media=document.querySelector('#letter-media'), audio=document.querySelector('#letter-audio'), video=document.querySelector('#letter-video'); audio.hidden=!message.audio; video.hidden=!message.video; media.hidden=!message.audio&&!message.video; if(message.audio)audio.src=message.audio;else audio.removeAttribute('src'); if(message.video)video.src=message.video;else video.removeAttribute('src');
    document.querySelector('#letter-content').classList.remove('final-letter','coupon-letter'); letterDialog.showModal();
  }
  function showLocked(day) { const box=document.createElement('div'); box.className='lock-message'; box.textContent=`Aún no, mi amor. ${openingText(day)}`; document.body.append(box); requestAnimationFrame(()=>box.classList.add('visible')); setTimeout(()=>{box.classList.remove('visible');setTimeout(()=>box.remove(),250)},3600); }
  const dateKey = date => `${date.year}-${String(date.month).padStart(2,'0')}-${String(date.day).padStart(2,'0')}`;
  function addCalendarDays(date, days) { const d=new Date(Date.UTC(date.year,date.month-1,date.day+days)); return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`; }
  function displayDate(key) { const d=new Date(`${key}T12:00:00Z`); return new Intl.DateTimeFormat('es-CR',{timeZone:'UTC',day:'numeric',month:'long'}).format(d); }
  function readQuizState() { try { return JSON.parse(localStorage.getItem(quizKey) || '{}'); } catch { return {}; } }
  function quizForDay(day) { return (window.QUIZ?.preguntas || []).find(question=>question.dia===day); }
  function canTryDayQuiz(day) { const state=readQuizState()[day]; return isUnlocked(day) && (!state?.retryOn || dateKey(costaRicaDate()) >= state.retryOn); }
  function fillQuizQuestion(question) {
    const questions=document.querySelector('#quiz-questions'); questions.innerHTML='';
      const fieldset=document.createElement('fieldset'); fieldset.className='quiz-question';
      const legend=document.createElement('legend'); const number=document.createElement('span'); number.textContent='CLAVE'; legend.append(number,question.pregunta);
      const options=document.createElement('div'); options.className='quiz-options';
      question.opciones.forEach((option,optionIndex)=>{
        const label=document.createElement('label'); label.className='quiz-option';
        const input=document.createElement('input'); input.type='radio'; input.name='answer'; input.value=String(optionIndex); input.required=true;
        const letter=document.createElement('span'); letter.textContent=String.fromCharCode(65+optionIndex);
        const text=document.createElement('span'); text.textContent=option; label.append(input,letter,text); options.append(label);
      });
      fieldset.append(legend,options); questions.append(fieldset);
  }
  function openDayQuiz(day) {
    const question=quizForDay(day), state=readQuizState()[day], form=document.querySelector('#quiz-form'), lead=document.querySelector('#quiz-lead'), result=document.querySelector('#quiz-result'); if (!question) return openLetter(day);
    quizDialog.dataset.day=day; document.querySelector('#quiz-dialog-title').textContent=`Clave del día ${String(day).padStart(2,'0')}`;
    result.textContent='';
    if (!canTryDayQuiz(day)) { lead.textContent='Esta clave se quedó pensando un ratito.'; form.hidden=true; result.textContent=`Puedes intentarlo de nuevo el ${displayDate(state.retryOn)} a las 00:00.`; }
    else { lead.textContent='Responde bien para que se abra la carta de este día.'; form.hidden=false; fillQuizQuestion(question); }
    quizDialog.showModal();
  }
  function submitQuiz(event) {
    event.preventDefault(); const day=Number(quizDialog.dataset.day), question=quizForDay(day), state=readQuizState(); if (!question || !canTryDayQuiz(day)) return;
    const result=document.querySelector('#quiz-result');
    const choice=document.querySelector('input[name="answer"]:checked'); if (!choice) { result.textContent='Elige una de las cuatro respuestas antes de intentar abrir la carta.'; return; }
    if (Number(choice.value)===question.correcta) { state[day]={passed:true}; localStorage.setItem(quizKey,JSON.stringify(state)); result.textContent='¡Lo lograste! La carta se está abriendo…'; document.querySelector('#quiz-form').hidden=true; renderGrid(); setTimeout(()=>{quizDialog.close();openLetter(day);},550); }
    else { const retryOn=addCalendarDays(costaRicaDate(),2); state[day]={retryOn}; localStorage.setItem(quizKey,JSON.stringify(state)); result.textContent=`Casi, mi amor. Esta carta vuelve a intentarse el ${displayDate(retryOn)} a las 00:00.`; document.querySelector('#quiz-form').hidden=true; renderGrid(); }
  }
  function readClaimedCoupons() { try { return new Set(JSON.parse(localStorage.getItem(couponsKey) || '[]')); } catch { return new Set(); } }
  function couponForDay(day) { return Object.entries(coupons).find(([,coupon])=>coupon.day===day); }
  function renderDayCoupon(day) {
    const entry=couponForDay(day), box=document.querySelector('#day-coupon'); box.hidden=!entry; if (!entry) return;
    const [key,coupon]=entry, claimed=readClaimedCoupons().has(key); box.dataset.coupon=key;
    const title=key==='movie'?'Cupón de libre elección por 1 semana':coupon.title, description=key==='movie'?'Te has ganado un cupón para escoger todo el tipo de entretenimiento que vamos a ver por 1 semana entera, sin chistar ni alegatos.':coupon.description;
    document.querySelector('#day-coupon-number').textContent=`Vale ${coupon.number}`; document.querySelector('#day-coupon-title').textContent=title; document.querySelector('#day-coupon-description').textContent=description;
    document.querySelector('#claim-day-coupon').hidden=claimed; document.querySelector('#day-coupon-result').textContent=claimed?'Este vale ya fue reclamado. Yo lo cumplo. ♡':'';
  }
  function claimDayCoupon() { const key=document.querySelector('#day-coupon').dataset.coupon, claimed=readClaimedCoupons(); if (!key) return; claimed.add(key); localStorage.setItem(couponsKey,JSON.stringify([...claimed])); document.querySelector('#claim-day-coupon').hidden=true; document.querySelector('#day-coupon-result').textContent='Vale reclamado. Ahora solo falta elegir cuándo. ♡'; }
  function makeMediaBlock(memory) {
    const media = document.createElement('div'); media.className='memory-media';
    if (memory.imagen) { const image=document.createElement('img'); image.src=memory.imagen; image.alt=`Foto: ${memory.titulo}`; media.append(image); }
    else { const placeholder=document.createElement('div'); placeholder.className='memory-photo-placeholder'; placeholder.textContent='foto por pegar'; media.append(placeholder); }
    if (memory.audio) { const audio=document.createElement('audio'); audio.controls=true; audio.src=memory.audio; media.append(audio); }
    if (memory.video) { const video=document.createElement('video'); video.controls=true; video.playsInline=true; video.src=memory.video; media.append(video); }
    return media;
  }
  function travelForDay(day) { return Object.values(window.RECUERDOS || {}).find(trip=>trip.dia===day); }
  function renderDayTravel(day) {
    const trip=travelForDay(day), box=document.querySelector('#day-travel'); box.hidden=!trip; if (!trip) return;
    document.querySelector('#day-travel-place').textContent=trip.sello; document.querySelector('#day-travel-title').textContent=trip.lugar; document.querySelector('#day-travel-intro').textContent=trip.intro;
    const stack=document.querySelector('#day-memory-stack'); stack.innerHTML='';
    trip.recuerdos.forEach((memory,index)=>{
      const card=document.createElement('article'); card.className='memory-note'; card.style.setProperty('--memory-tilt',`${index%2 ? '1.8deg' : '-1.3deg'}`);
      const number=document.createElement('span'); number.className='memory-number'; number.textContent=String(index+1).padStart(2,'0');
      const title=document.createElement('h3'); title.textContent=memory.titulo; const text=document.createElement('p'); text.textContent=memory.texto;
      card.append(number,title,makeMediaBlock(memory),text); stack.append(card);
    });
  }
  document.querySelector('#open-calendar').addEventListener('click',()=>{calendar.hidden=false;calendar.scrollIntoView({behavior:'smooth',block:'start'})});
  document.querySelector('#open-special').addEventListener('click',openSpecialLetter);
  document.querySelector('#intro-calendar-button').addEventListener('click',()=>{letterDialog.close();calendar.hidden=false;calendar.scrollIntoView({behavior:'smooth',block:'start'});});
  document.querySelector('#close-letter').addEventListener('click',()=>letterDialog.close());
  document.querySelector('#close-quiz').addEventListener('click',()=>quizDialog.close()); document.querySelector('#quiz-form').addEventListener('submit',submitQuiz);
  document.querySelector('#claim-day-coupon').addEventListener('click',claimDayCoupon);
  [letterDialog,quizDialog].forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()})); renderGrid(); renderSpecialButton();
})();
