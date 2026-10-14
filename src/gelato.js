import { signatureFlavours } from "./signature-flavours";
import {createIcons,ArrowUpRight,ArrowRight,Menu, X, Sparkles, Heart, MoveHorizontal,RotateCcw,Asterisk,Search,Info,Wind,Cherry,IceCreamCone,Download,Star,MapPin,Clock3,Plus,Minus,Camera,Users,Pause,Play,Cake,BriefcaseBusiness} from 'lucide';
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
const iconSet={ArrowUpRight,ArrowRight,Menu,X,Sparkles,Heart,MoveHorizontal,RotateCcw,Asterisk,Search,Info,Wind,Cherry,IceCreamCone,Download,Star,MapPin,Clock3,Plus,Minus,Camera,Users,Pause,Play,Cake,BriefcaseBusiness};
gsap.registerPlugin(ScrollTrigger,Flip);
const icons=()=>createIcons({icons:iconSet,attrs:{'aria-hidden':'true'}});
const $=selector=>document.querySelector(selector), $$=selector=>[...document.querySelectorAll(selector)];
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
let paused=false;try{paused=localStorage.getItem('mr-gelato-motion-paused')==='true';}catch{}
const reduced=()=>paused||motionQuery.matches;
function syncMotion(){
 document.documentElement.classList.toggle('motion-paused',reduced());
 const button=$('.motion-toggle');if(button){button.setAttribute('aria-pressed',String(reduced()));button.querySelector('span').textContent=motionQuery.matches?'Reduced motion (system)':paused?'Resume motion':'Pause motion';button.disabled=motionQuery.matches;}
 if(reduced()){document.getAnimations?.().forEach(a=>a.cancel());confetti.reset();}
 window.dispatchEvent(new CustomEvent('gelato-motion',{detail:reduced()}));
}
$('.motion-toggle')?.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('mr-gelato-motion-paused',String(paused));}catch{}syncMotion();});
motionQuery.addEventListener?.('change',syncMotion);syncMotion();
const menu=$('.menu-toggle'),nav=$('#main-nav');
const desktopNav=matchMedia('(min-width:801px)');let navAnimation;
function setMenu(open,animateChange=false){
 if(!nav||!menu)return;
 const interrupted=navAnimation?.playState==='running';
 const current=interrupted?getComputedStyle(nav):null;
 const from=current?{opacity:current.opacity,transform:current.transform}:null;
 navAnimation?.cancel();menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');
 nav.inert=!desktopNav.matches&&!open;
 if(open)nav.classList.add('open');
 const finish=()=>{if(menu.getAttribute('aria-expanded')!=='true')nav.classList.remove('open');};
 if(animateChange&&!reduced()&&!desktopNav.matches&&nav.animate){
  navAnimation=nav.animate([from||(open?{opacity:0,transform:'translateY(-8px)'}:{opacity:1,transform:'translateY(0)'}),open?{opacity:1,transform:'translateY(0)'}:{opacity:0,transform:'translateY(-6px)'}],{duration:open?200:150,easing:'cubic-bezier(.23,1,.32,1)'});
  navAnimation.onfinish=()=>{navAnimation=null;finish();};
 }else finish();
}
menu?.addEventListener('click',e=>setMenu(menu.getAttribute('aria-expanded')!=='true',e.detail>0));
nav?.addEventListener('click',e=>{if(e.target.closest('a')&&!desktopNav.matches)setMenu(false,e.detail>0);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))setMenu(false,e.detail>0);});
desktopNav.addEventListener?.('change',()=>setMenu(false));
window.addEventListener('gelato-motion',()=>{if(reduced())setMenu(menu?.getAttribute('aria-expanded')==='true');});setMenu(false);

const products=[
 ...signatureFlavours.map(p=>({name:p.name,category:"Signature",colour:p.colour,tile:"#fff9ef",atlasPosition:p.position,copy:p.copy})),
 {name:'Mango',category:'Seasonal',colour:'#f0c677',tile:'#f5e1b3',image:'mango',copy:'A sunny little escape, by the scoop.'},
 {name:'Chocolate',category:'Classic',colour:'#785246',tile:'#ead4c0',image:'chocolate',copy:'For the days that call for chocolate.'},
 {name:'Custard Apple',category:'Seasonal',colour:'#dadbc1',tile:'#e3eacb',image:'custard',copy:'Sitaphal. Sarifa. A familiar kind of happy.'},
 {name:'Strawberry',category:'Seasonal',colour:'#e7a9b9',tile:'#f2d2db',copy:'Meet your next berry crush.'},
 {name:'Coffee',category:'Classic',colour:'#b58b6d',tile:'#e4d6c9',copy:'Mr Caffaine, for your coffee moment.'},
 {name:'Kulfi',category:'Classic',colour:'#dfc992',tile:'#e9e2c9',copy:'A little nostalgia in every scoop.'},
 ...['Chikoo','Litchi','Black Currant','Jamun','Peach','Kiwi','Melon','Fig','Fruit Punch'].map((name,i)=>({name,category:'Seasonal',colour:['#bb9879','#edddd0','#8e6b92','#735c87','#e7b19b','#a2bd79'][i%6],tile:['#eadbc6','#f0e1d5','#e2d1e4','#d8cee1','#f3d8c4','#dfe6c9'][i%6],copy:'From the Indian fruit favourites collection.'})),
 ...['Choco Italiano','Choco King','Charlie Chocolate','Butterscotch','Yogurt','Coconut','Manhattan Cheesecake','Strawberry Cheesecake','Boomer'].map((name,i)=>({name,category:'Classic',colour:['#785246','#b38b6e','#eedcb1'][i%3],tile:['#e8d8c5','#e4decf','#e5eacb'][i%3],copy:'A flavour from the Mr Gelato collection.'}))
];
const featured=$('#flavour-grid');let filter='All';const menuCards=new Map();
function renderMenu(animateChange=false){
 if(!featured)return;const term=$('#flavour-search').value.trim().toLowerCase();const all=products.filter(p=>(filter==='All'||p.category===filter)&&p.name.toLowerCase().includes(term));
 const selected=filter==='All'&&!term?all.slice(0,Number(featured.dataset.limit)):all;
 const flipState=animateChange&&!reduced()?Flip.getState([...featured.children]):null;
 featured.querySelectorAll('.flavour-card').forEach(card=>card.getAnimations?.().forEach(animation=>animation.cancel()));
 featured.replaceChildren();$('#menu-count').textContent=`${selected.length} flavours shown${selected.length<all.length?' of '+all.length:''}`;
 if(!selected.length){const box=document.createElement('div');box.className='empty-results';const h=document.createElement('h3');h.textContent=filter==='Vegan'?'Vegan details are on their way.':'No scoops found.';const p=document.createElement('p');p.textContent=filter==='Vegan'?'We’ll add this collection once recipes and dietary suitability are confirmed.':'Try another flavour name or clear your filters.';const button=document.createElement('button');button.type='button';button.className='btn outline';button.textContent='Show all scoops';button.addEventListener('click',()=>{filter='All';$('#flavour-search').value='';$$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='All')));renderMenu();$('#flavour-search').focus();});box.append(h,p,button);featured.append(box);return;}
 for(const product of selected){
  if(menuCards.has(product.name)){featured.append(menuCards.get(product.name));continue;}
  const card=document.createElement('article');card.className='flavour-card';card.dataset.flavour=product.name;menuCards.set(product.name,card);card.style.setProperty('--tile',product.tile);
  const art=document.createElement('div');art.className='flavour-image';
  if(product.atlasPosition){const image=document.createElement("div");image.className="signature-menu-photo";image.setAttribute("role","img");image.setAttribute("aria-label",`Illustrative ${product.name} gelato`);image.style.backgroundPosition=product.atlasPosition;art.append(image);}else if(product.image){const image=document.createElement('img');image.src=`assets/plates/${product.image}.png`;image.alt=`Illustrative ${product.name.toLowerCase()} gelato`;image.loading='lazy';image.width=1536;image.height=1024;art.append(image);}else{const word=document.createElement('span');word.className='flavour-monogram';word.textContent=product.name;word.setAttribute('aria-hidden','true');art.append(word);}
  const pill=document.createElement('span');pill.className='flavour-pill';pill.textContent=product.category;art.append(pill);
  const h=document.createElement('h3');h.textContent=product.name;const p=document.createElement('p');p.textContent=product.copy;
  const bottom=document.createElement('div');bottom.className='flavour-bottom';const nutrition=document.createElement('span');nutrition.className='nutrition';nutrition.textContent='Ingredients awaiting approval';
  const add=document.createElement('button');add.type='button';add.className='add-flavour';add.textContent='Add to my mix';add.setAttribute('aria-label',`Add ${product.name} to my pint`);const icon=document.createElement('i');icon.dataset.lucide='plus';add.append(icon);
  add.addEventListener('click',e=>{const select=$('#layer-1');if(select){select.value=product.name;updatePint();$('#mix-status').textContent=`${product.name} added to layer one. Choose your other layers below.`;$('#builder').scrollIntoView({behavior:reduced()||e.detail===0?'instant':'smooth'});select.focus({preventScroll:true});}});
  bottom.append(nutrition,add);card.append(art,h,p,bottom);featured.append(card);
 }
 icons();
 if(flipState)Flip.from(flipState,{duration:.28,ease:'power3.inOut',absolute:true,stagger:.018,prune:true,
  onEnter:elements=>gsap.fromTo(elements,{opacity:0,y:8},{opacity:1,y:0,duration:.24,ease:'power3.out'}),
  onLeave:elements=>gsap.to(elements,{opacity:0,y:-6,duration:.18,ease:'power2.out'})});
}
$$('[data-filter]').forEach(button=>button.addEventListener('click',e=>{filter=button.dataset.filter;$$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderMenu(e.detail>0);}));
$('#flavour-search')?.addEventListener('input',()=>renderMenu());
const query=new URLSearchParams(location.search).get('flavour');if(query&&$('#flavour-search'))$('#flavour-search').value=query;

const layers=$('#layer-controls');
if(layers){['Strawberry','Mango','Chocolate'].forEach((initial,index)=>{
 const row=document.createElement('div');row.className='layer-control';const number=document.createElement('span');number.className='layer-number';number.textContent=String(index+1);number.setAttribute('aria-hidden','true');
 const label=document.createElement('label');label.htmlFor=`layer-${index+1}`;label.textContent=['First scoop','Second scoop','Third scoop'][index];const select=document.createElement('select');select.id=label.htmlFor;
 products.forEach(p=>{const o=document.createElement('option');o.value=p.name;o.textContent=p.name;o.selected=p.name===initial;select.append(o);});select.addEventListener('change',()=>{updatePint();$('#mix-status').textContent='';});label.append(select);row.append(number,label);layers.append(row);
});}
function updatePint(){
 if(!$('#pint-form'))return;const values=[1,2,3].map(i=>$(`#layer-${i}`).value);const colours=values.map(name=>products.find(p=>p.name===name).colour);
 ['.scoop-one','.scoop-two','.scoop-three'].forEach((selector,i)=>$(selector).style.setProperty('--scoop',colours[i]));
 const size=$('input[name="size"]:checked').value,topping=$('input[name="topping"]:checked').value;
 $('#pint-size-label').textContent=`${size} ml concept pint`;$('#mix-summary').textContent=values.join(' + ')+(topping==='None'?'':` · ${topping}`);
 $('#pint-preview').setAttribute('aria-label',`${size} ml sample pint: ${values.join(', ')}${topping==='None'?'':', with '+topping}`);
 const toppingHolder=$('.pint-toppings');toppingHolder.replaceChildren();if(topping!=='None')for(let i=0;i<17;i++){const piece=document.createElement('span');piece.style.left=(12+(i*29)%78)+'%';piece.style.top=(8+(i*17)%83)+'%';piece.style.setProperty('--turn',((i*37)%180)+'deg');piece.style.setProperty('--colour',topping==='Chocolate'?'#51382f':['#cf7590','#fff9ef','#6b8f50','#edc15b'][i%4]);if(topping==='Chocolate'){piece.style.width='8px';piece.style.height='7px';piece.style.borderRadius='2px';}toppingHolder.append(piece);}
}
$$('input[name="size"],input[name="topping"]').forEach(input=>input.addEventListener('change',()=>{updatePint();$('#mix-status').textContent='';}));updatePint();renderMenu();
$('#pint-form')?.addEventListener('submit',event=>{
 event.preventDefault();const text=`My Mr Gelato mix\n\n${$('#mix-summary').textContent}\n${$('#pint-size-label').textContent}\n\nThis is a design preview, not an order. Recipes, sizes, nutrition, toppings and availability require confirmation.`;
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='my-mr-gelato-mix.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#mix-status').textContent='Your mix file is ready. This preview does not place an order.';
});
$('#newsletter-form')?.addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.reportValidity())return;$('#newsletter-status').textContent='Sweet! You’ve previewed the signup. No subscription was created and your email wasn’t saved.';if(!reduced()){const box=event.submitter.getBoundingClientRect();confetti({particleCount:55,spread:60,startVelocity:23,origin:{x:(box.left+box.width/2)/innerWidth,y:box.top/innerHeight},colors:['#941b3b','#fff9ef','#c7a071'],disableForReducedMotion:true});}event.currentTarget.reset();});
let zoom=1;function updateMap(){const art=$('#map-art');if(!art)return;art.style.transform=`scale(${zoom})`;$('#map-status').textContent=`Map preview zoom ${Math.round(zoom*100)} percent`;$('#map-in').disabled=zoom>=1.6;$('#map-out').disabled=zoom<=1;}
$('#map-in')?.addEventListener('click',()=>{zoom=Math.min(1.6,zoom+.2);updateMap();});$('#map-out')?.addEventListener('click',()=>{zoom=Math.max(1,zoom-.2);updateMap();});updateMap();
const contact=$('#contact-form');if(contact){const reason=new URLSearchParams(location.search).get('reason');if(reason){const option=[...$('#contact-reason').options].find(o=>o.value.toLowerCase()===reason.toLowerCase());if(option)$('#contact-reason').value=option.value;}contact.addEventListener('submit',e=>{e.preventDefault();if(!contact.reportValidity())return;const subject='Mr Gelato: '+$('#contact-reason').value;const body=`Hello Mr Gelato,\n\n${$('#contact-message').value.trim()}\n\n${$('#contact-name').value.trim()}`;const a=document.createElement('a');a.href=`mailto:query@mrgelato.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;a.click();$('#contact-status').textContent='Your email app will open. If it doesn’t, email query@mrgelato.in directly.';});}

const fine=matchMedia('(hover: hover) and (pointer: fine)');
let heroMotionContext;
function splitHeroHeading(){
 const heading=$('.hero-copy h1');
 if(!heading||heading.dataset.motionSplit)return heading;
 const lines=heading.innerHTML.split(/<br\s*\/?>/i);
 heading.innerHTML=lines.map(line=>`<span class="hero-line-mask"><span class="hero-line">${line.trim()}</span></span>`).join('');
 heading.dataset.motionSplit='true';
 return heading;
}
function setupHeroMotion(){
 heroMotionContext?.revert();heroMotionContext=null;
 const hero=$('.berry-hero'),copy=$('.hero-copy'),image=$('.berry-hero-image'),heading=splitHeroHeading();
 if(!hero||!copy||!image||!heading||reduced())return;
 gsap.registerPlugin(ScrollTrigger);
 heroMotionContext=gsap.context(()=>{
  const lines=$$('.hero-line'),navItems=$$('.site-header .brand, .site-header nav a, .site-header .nav-actions'),paragraph=$('.hero-copy>p'),buttons=$$('.hero-actions .btn');
  const intro=gsap.timeline({defaults:{ease:'power3.out'}});
  if(matchMedia('(min-width: 801px)').matches)intro.fromTo(image,{clipPath:'inset(0 0 0 42%)',opacity:.82,scale:1.035},{clipPath:'inset(0 0 0 0%)',opacity:1,scale:1,duration:1.15,ease:'power4.out'},0);
  else gsap.fromTo(image,{clipPath:'inset(0 0 14% 0)',opacity:.8,y:14},{clipPath:'inset(0 0 0% 0)',opacity:1,y:0,duration:.72,ease:'power4.out',scrollTrigger:{trigger:image,start:'top 94%',once:true}});
  intro
   .fromTo(navItems,{opacity:0,y:-14},{opacity:1,y:0,duration:.55,stagger:.045},.08)
   .fromTo(lines,{yPercent:108},{yPercent:0,duration:.82,stagger:.09,ease:'power4.out'},.2)
   .fromTo(paragraph,{opacity:0,y:12},{opacity:1,y:0,duration:.65},.48)
   .fromTo(buttons,{opacity:0,y:14},{opacity:1,y:0,duration:.55,stagger:.08},.62);
  gsap.matchMedia().add('(min-width: 801px) and (prefers-reduced-motion: no-preference)',()=>{
   const scroll=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'bottom 28%',scrub:.65}});
   scroll.to(copy,{yPercent:-7,opacity:.3,ease:'none'},0).to(image,{yPercent:4,scale:1.025,ease:'none'},0);
   return()=>scroll.scrollTrigger?.kill();
  });
 },hero);
}
setupHeroMotion();
window.addEventListener('gelato-motion',setupHeroMotion);
let coverflowMotionContext;
function setupCoverflowMotion(){
 coverflowMotionContext?.revert();coverflowMotionContext=null;
 const root=$('.coverflow');
 if(!root)return;
 if(reduced()){root.dataset.motionEntered='true';return;}
 coverflowMotionContext=gsap.context(()=>{
  const heading=$$('.coverflow-heading h2, .coverflow-heading p, .coverflow-heading .btn');
  const surfaces=$$('.coverflow-card-surface');
  const controls=$$('.coverflow-controls, .coverflow-credit');
  let played=false;
  const reveal=gsap.timeline({paused:true,onStart:()=>{played=true;root.dataset.motionEntered='true';}})
   .fromTo(heading,{opacity:0,y:14},{opacity:1,y:0,duration:.55,stagger:.06,ease:'power3.out'},0)
   .fromTo(surfaces,{opacity:0,y:24,scale:.965},{opacity:1,y:0,scale:1,duration:.72,stagger:{each:.065,from:'center'},ease:'power4.out'},.16)
   .fromTo(controls,{opacity:0,y:8},{opacity:1,y:0,duration:.42,stagger:.05,ease:'power3.out'},.48);
  const trigger=ScrollTrigger.create({trigger:root,start:'top 82%',once:true,onEnter:()=>reveal.play()});
  requestAnimationFrame(()=>{if(!played&&root.getBoundingClientRect().top<innerHeight*.82)reveal.play();});
  return()=>trigger.kill();
 },root);
}
function animateCoverflowChange(){
 const root=$('.coverflow');
 if(!root||root.dataset.motionEntered!=='true'||reduced())return;
 const active=root.querySelector('.coverflow-card[data-active="true"]');
 if(!active)return;
 const body=active.querySelector('.coverflow-body'),photo=active.querySelector('.coverflow-photo'),light=active.querySelector('.coverflow-light');
 gsap.killTweensOf([body,photo,light]);
 gsap.fromTo(body,{opacity:.68,y:6},{opacity:1,y:0,duration:.28,ease:'power3.out',clearProps:'transform,opacity'});
 gsap.fromTo(photo,{scale:1.018},{scale:1,duration:.55,ease:'power3.out',clearProps:'transform'});
 gsap.timeline().fromTo(light,{opacity:0,xPercent:-36},{opacity:.72,xPercent:0,duration:.22,ease:'power2.out'}).to(light,{opacity:0,xPercent:36,duration:.3,ease:'power2.inOut'});
}
window.addEventListener('gelato-coverflow-ready',setupCoverflowMotion);
window.addEventListener('gelato-coverflow-change',animateCoverflowChange);
window.addEventListener('gelato-motion',setupCoverflowMotion);
let editorialMotionContext;
function setupEditorialMotion(){
 editorialMotionContext?.revert();editorialMotionContext=null;
 if(reduced())return;
 editorialMotionContext=gsap.context(()=>{
  const once=(trigger,build,start='top 82%')=>{if(!trigger)return;const timeline=build();ScrollTrigger.create({trigger,start,once:true,onEnter:()=>timeline.play()});requestAnimationFrame(()=>{const box=trigger.getBoundingClientRect();if(box.bottom<=0)timeline.progress(1);else if(box.top<innerHeight*.82&&box.bottom>0)timeline.play();});};
  const story=$('.story-section');
  once(story,()=>gsap.timeline({paused:true})
   .fromTo(story.querySelector('.story-visual'),{clipPath:'inset(0 0 16% 0)',opacity:.75},{clipPath:'inset(0 0 0% 0)',opacity:1,duration:.8,ease:'power4.out'})
   .fromTo(story.querySelectorAll('.story-text>*'),{opacity:0,y:16},{opacity:1,y:0,duration:.55,stagger:.065,ease:'power3.out'},.16));
  if(story)gsap.matchMedia().add('(min-width: 801px) and (prefers-reduced-motion: no-preference)',()=>gsap.to(story.querySelector('.story-visual img'),{yPercent:5,ease:'none',scrollTrigger:{trigger:story,start:'top bottom',end:'bottom top',scrub:.7}}));
  $$('.cafe-menu-section').forEach(section=>once(section,()=>gsap.timeline({paused:true})
   .fromTo(section.querySelectorAll('.section-head>*'),{opacity:0,y:12},{opacity:1,y:0,duration:.5,stagger:.06,ease:'power3.out'})
   .fromTo(section.querySelectorAll('.cafe-category'),{opacity:0,y:20,scale:.975},{opacity:1,y:0,scale:1,duration:.58,stagger:.065,ease:'power4.out'},.12)));
  const experience=$('.cafe-experience-section');
  once(experience,()=>gsap.timeline({paused:true})
   .fromTo(experience.querySelector('figure'),{clipPath:'inset(0 12% 0 0)',opacity:.75},{clipPath:'inset(0 0% 0 0)',opacity:1,duration:.75,ease:'power4.out'})
   .fromTo(experience.querySelectorAll('.cafe-experience-grid>div>*'),{opacity:0,y:14},{opacity:1,y:0,duration:.5,stagger:.06,ease:'power3.out'},.16));
  const visit=$('.visit-section');
  once(visit,()=>gsap.timeline({paused:true})
   .fromTo(visit.querySelectorAll('.visit-copy>*'),{opacity:0,y:14},{opacity:1,y:0,duration:.52,stagger:.055,ease:'power3.out'})
   .fromTo(visit.querySelector('.map-preview'),{opacity:0,scale:.975},{opacity:1,scale:1,duration:.7,ease:'power4.out'},.08)
   .fromTo(visit.querySelector('.map-pin'),{opacity:0,scale:.86,y:-12},{opacity:1,scale:1,y:0,duration:.55,ease:'back.out(1.35)'},.42)
   .fromTo(visit.querySelector('.map-label'),{opacity:0,y:8},{opacity:1,y:0,duration:.4,ease:'power3.out'},.52));
  const pageIntro=$('.page-intro');
  once(pageIntro,()=>gsap.timeline({paused:true}).fromTo(pageIntro.querySelectorAll('h1,p'),{opacity:0,y:16},{opacity:1,y:0,duration:.6,stagger:.07,ease:'power4.out'}),'top 92%');
  const builder=$('.builder-section');
  once(builder,()=>gsap.timeline({paused:true})
   .fromTo(builder.querySelectorAll('.section-head>*'),{opacity:0,y:12},{opacity:1,y:0,duration:.5,stagger:.06,ease:'power3.out'})
   .fromTo(builder.querySelector('.pint-stage'),{opacity:0,scale:.975},{opacity:1,scale:1,duration:.65,ease:'power4.out'},.12)
   .fromTo(builder.querySelector('.pint-controls'),{opacity:0,x:18},{opacity:1,x:0,duration:.58,ease:'power3.out'},.18));
  const footer=$('.footer');
  once(footer,()=>gsap.timeline({paused:true}).fromTo(footer.querySelectorAll('.footer-top>div'),{opacity:0,y:12},{opacity:1,y:0,duration:.46,stagger:.05,ease:'power3.out'}),'top 94%');
 },document.body);
}
function setupPageTransitions(){
 if($('.page-transition'))return;
 const veil=document.createElement('div');veil.className='page-transition';veil.setAttribute('aria-hidden','true');document.body.append(veil);
 if(!reduced())gsap.fromTo(veil,{scaleY:1,transformOrigin:'top'},{scaleY:0,duration:.55,ease:'power4.inOut'});else gsap.set(veil,{scaleY:0});
 document.addEventListener('click',event=>{
  const link=event.target.closest('a');
  if(!link||event.defaultPrevented||event.detail===0||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||reduced())return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||url.pathname===location.pathname&&url.hash||link.target||url.protocol==='mailto:')return;
  event.preventDefault();gsap.set(veil,{transformOrigin:'bottom'});gsap.to(veil,{scaleY:1,duration:.38,ease:'power3.inOut',onComplete:()=>location.href=url.href});
 });
 window.addEventListener('pageshow',()=>gsap.set(veil,{scaleY:0}));
}
setupEditorialMotion();setupPageTransitions();
window.addEventListener('gelato-motion',setupEditorialMotion);
$$('[data-scoop]').forEach(button=>button.addEventListener('click',()=>{$$('[data-scoop]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));window.dispatchEvent(new CustomEvent('gelato-scoop',{detail:button.dataset.scoop}));}));
const stage=$('#gelato-stage');
if(stage?.dataset.hero==='realistic'){
 const tilt=stage.querySelector('.hero-product-tilt');let visible=true,frame=0,last=0;
 let x=0,y=0,vx=0,vy=0,tx=0,ty=0;
 const active=()=>!reduced()&&visible&&!document.hidden;
 function tick(time){
  frame=0;if(!active())return;
  const dt=Math.min((time-last)/1000||1/60,1/30);last=time;
  vx+=(100*(tx-x)-10*vx)*dt;vy+=(100*(ty-y)-10*vy)*dt;x+=vx*dt;y+=vy*dt;
  tilt.style.transform=`perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
  if(Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(vx)+Math.abs(vy)>.02)frame=requestAnimationFrame(tick);
 }
 function start(){if(!frame&&active()){last=0;frame=requestAnimationFrame(tick);}}
 function reset(){tx=ty=0;start();}
 function syncHero(){
  stage.classList.toggle('hero-idle-paused',!active());
  if(!active()){cancelAnimationFrame(frame);frame=0;x=y=vx=vy=tx=ty=0;tilt.style.transform='';}
 }
 stage.addEventListener('pointermove',e=>{if(!active()||!fine.matches||e.pointerType==='touch')return;const r=stage.getBoundingClientRect();tx=-((e.clientY-r.top)/r.height-.5)*6;ty=((e.clientX-r.left)/r.width-.5)*8;start();});
 stage.addEventListener('pointerleave',reset);
 window.addEventListener('gelato-motion',syncHero);document.addEventListener('visibilitychange',syncHero);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncHero();},{threshold:.05}).observe(stage);
 window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));syncHero();
}else if(stage){const load=()=>{const script=document.createElement('script');script.src='gelato-3d.js';script.defer=true;script.onerror=()=>{$('#scene-status').textContent='Showing the product image. 3D could not load.';};document.body.append(script);};if('requestIdleCallback' in window)requestIdleCallback(load,{timeout:1000});else setTimeout(load,250);}
icons();
