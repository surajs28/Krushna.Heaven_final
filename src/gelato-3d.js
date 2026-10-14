import * as THREE from 'three';
const stage=document.querySelector('#gelato-stage');
const status=document.querySelector('#scene-status');
function boot(){
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.45;
 renderer.domElement.setAttribute('aria-hidden','true');stage.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,30);camera.position.set(0,.3,8.6);camera.lookAt(0,.2,0);
 scene.add(new THREE.HemisphereLight(0xfff9ef,0x647446,3));const key=new THREE.DirectionalLight(0xfff2db,4);key.position.set(-3,5,5);scene.add(key);const rim=new THREE.DirectionalLight(0xf4c3d4,2.3);rim.position.set(4,2,-2);scene.add(rim);
 const cone=new THREE.Group();cone.rotation.z=-.18;scene.add(cone);
 // An original procedural model: tapered waffle cone, woven ridges and irregular creamy scoops.
 const coneGeometry=new THREE.ConeGeometry(.75,2.05,64,24);coneGeometry.rotateZ(Math.PI);
 const wafer=new THREE.Mesh(coneGeometry,new THREE.MeshStandardMaterial({color:0xcb9153,roughness:.72}));wafer.position.y=-1.05;cone.add(wafer);
 const ridgeMaterial=new THREE.MeshStandardMaterial({color:0xe5b16e,roughness:.67});
 for(let direction of [-1,1])for(let i=0;i<18;i++){
  const points=[];for(let j=0;j<=48;j++){const t=j/48;const y=-2.075+t*2.05;const radius=.009+t*.75;const angle=i/18*Math.PI*2+direction*t*3.5;points.push(new THREE.Vector3(Math.cos(angle)*radius,y,Math.sin(angle)*radius));}
  cone.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),48,.013,4,false),ridgeMaterial));
 }
 const rimMesh=new THREE.Mesh(new THREE.TorusGeometry(.74,.035,8,64),ridgeMaterial);rimMesh.rotation.x=Math.PI/2;rimMesh.position.y=-.025;cone.add(rimMesh);
 function scoop(radius,colour,position,seed){
  const geometry=new THREE.SphereGeometry(radius,64,40);const pos=geometry.attributes.position,v=new THREE.Vector3();
  for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i);const n=v.clone().normalize();const ripple=Math.sin(n.x*14+seed)*Math.sin(n.y*17+seed)*Math.sin(n.z*13-seed)*.025+Math.sin(n.x*5+seed)*Math.cos(n.z*7)*.035;v.multiplyScalar(1+ripple);pos.setXYZ(i,v.x,v.y,v.z);}geometry.computeVertexNormals();
  const material=new THREE.MeshPhysicalMaterial({color:colour,roughness:.49,metalness:0,clearcoat:.18,clearcoatRoughness:.36});const mesh=new THREE.Mesh(geometry,material);mesh.position.set(...position);mesh.scale.y=.87;cone.add(mesh);
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const curl=new THREE.Mesh(new THREE.SphereGeometry(radius*.19,12,8),material);curl.position.set(position[0]+Math.cos(a)*radius*.82,position[1]-.29,position[2]+Math.sin(a)*radius*.82);curl.scale.set(1,.65,1);cone.add(curl);}return material;
 }
 scoop(.77,0x90aa68,[-.36,.42,0],1);scoop(.73,0x6e4536,[.38,.48,.1],3);const topMaterial=scoop(.79,0xe7a2b8,[0,1.28,0],7);
 const particles=new THREE.Group();scene.add(particles);const sprinkleGeometry=new THREE.CapsuleGeometry(.018,.075,2,4);const sprinkleColours=[0xdf92a8,0xf0c769,0x7f9b61,0x6c4537];
 for(let i=0;i<25;i++){const mesh=new THREE.Mesh(sprinkleGeometry,new THREE.MeshStandardMaterial({color:sprinkleColours[i%4],roughness:.5}));const angle=i*2.4;mesh.position.set(Math.cos(angle)*(1.4+(i%4)*.16),-.8+(i/25)*3.1,Math.sin(angle)*.8);mesh.rotation.set(i*.6,i*.2,i*.8);mesh.userData.base=mesh.position.y;particles.add(mesh);}
 let targetX=-.08,targetY=.2,drag=false,startX=0,lastY=0,visible=true,disposed=false,failed=false;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let paused=document.documentElement.classList.contains('motion-paused');const isReduced=()=>paused||motion.matches;
 function resize(){const rect=stage.getBoundingClientRect();if(!rect.width||!rect.height)return;renderer.setSize(rect.width,rect.height);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();render();}
 function render(){if(!disposed)renderer.render(scene,camera);}
 let lastTime=0,elapsed=0;
 function loop(time){if(!lastTime)lastTime=time;const dt=Math.min((time-lastTime)/1000,.04);lastTime=time;elapsed+=dt;const damp=1-Math.exp(-10*dt);cone.rotation.y+=(targetY-cone.rotation.y)*damp;cone.rotation.x+=(targetX-cone.rotation.x)*damp;cone.position.y=Math.sin(elapsed*.8)*.06;particles.children.forEach((p,i)=>{p.position.y=p.userData.base+Math.sin(elapsed*.65+i)*.055;p.rotation.z+=dt*.12;});render();}
 function sync(){renderer.setAnimationLoop(null);lastTime=0;if(failed||disposed)return;if(visible&&!document.hidden&&!isReduced())renderer.setAnimationLoop(loop);else{cone.rotation.x=targetX;cone.rotation.y=targetY;cone.position.y=0;render();}}
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();});observer.observe(stage);
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);
 const onMove=e=>{if(drag){targetY=lastY+(e.clientX-startX)*.009;}else if(e.pointerType==='mouse'&&!isReduced()){const rect=stage.getBoundingClientRect();targetY=(e.clientX-rect.left-rect.width/2)/rect.width*.5+.2;targetX=-(e.clientY-rect.top-rect.height/2)/rect.height*.15;}if(isReduced()){cone.rotation.y=targetY;cone.rotation.x=targetX;render();}};
 const onDown=e=>{drag=true;startX=e.clientX;lastY=targetY;stage.setPointerCapture(e.pointerId);};
 const onUp=()=>{drag=false;};
 const reset=()=>{targetX=-.08;targetY=.2;if(isReduced()){cone.rotation.x=targetX;cone.rotation.y=targetY;render();}};
 const onKey=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();targetY+=(e.key==='ArrowLeft'?-1:1)*.2;cone.rotation.y=targetY;render();}if(e.key==='Home'){e.preventDefault();reset();}};
 const onScoop=e=>{topMaterial.color.set({strawberry:'#e7a2b8',pistachio:'#90aa68',chocolate:'#6e4536'}[e.detail]);render();};
 const onMotion=e=>{paused=e.detail;sync();};
 stage.addEventListener('pointermove',onMove);stage.addEventListener('pointerdown',onDown);stage.addEventListener('pointerup',onUp);stage.addEventListener('pointercancel',onUp);stage.addEventListener('keydown',onKey);document.querySelector('.cone-reset').addEventListener('click',reset);window.addEventListener('gelato-scoop',onScoop);window.addEventListener('gelato-motion',onMotion);document.addEventListener('visibilitychange',sync);
 const selected=document.querySelector('[data-scoop][aria-pressed="true"]');if(selected)onScoop({detail:selected.dataset.scoop});
 const fallback=()=>{failed=true;renderer.setAnimationLoop(null);stage.classList.remove('scene-ready');renderer.domElement.style.display='none';status.textContent='Showing the product image. Interactive 3D is unavailable.';};renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();fallback();});
 resize();stage.classList.add('scene-ready');status.textContent='3D concept · rotate with drag or arrow keys';sync();
 function dispose(){if(disposed)return;disposed=true;renderer.setAnimationLoop(null);observer.disconnect();resizeObserver.disconnect();scene.traverse(object=>{object.geometry?.dispose();if(object.material){const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(m=>m.dispose());}});renderer.dispose();}
 window.addEventListener('pagehide',e=>{if(e.persisted){renderer.setAnimationLoop(null);}else dispose();});window.addEventListener('pageshow',e=>{if(e.persisted)sync();});
}
try{if(stage)boot();}catch(error){stage?.querySelector('canvas')?.remove();stage?.classList.remove('scene-ready');if(status)status.textContent='Showing the product image. Your browser couldn’t start 3D.';console.warn('Gelato 3D fallback:',error.message);}
