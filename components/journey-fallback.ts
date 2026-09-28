import {journeyPose,recordJourneyFrame,type JourneyRenderer} from '@/lib/journey-motion';
import * as THREE from 'three';
import {CSS3DRenderer,CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
export function createFallback(el:HTMLElement):JourneyRenderer{
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100),renderer=new CSS3DRenderer();renderer.domElement.style.pointerEvents='none';renderer.domElement.className='css-journey-renderer';renderer.domElement.setAttribute('aria-hidden','true');el.appendChild(renderer.domElement);
 const positions=[[-7,0],[-3.5,-2],[0,-3],[3.5,-2],[7,0]];
 const content=[`<small>VIDEO & AD CREATIVE</small><div class="screen-ad"><img src="/media/rtv-project.jpg" alt=""/><span class="screen-play">▶</span></div><strong>A reason to<br/>look closer.</strong><span>Creative that earns attention.</span>`,`<small>WEBSITES & LANDING PAGES</small><img class="screen-website" src="/media/total-project.jpg" alt=""/><strong>Let's talk about<br/>your project.</strong><div class="screen-input">Your name</div><div class="screen-input">How can we help?</div><div class="screen-cta">Start a conversation ↗</div>`,`<small>SALES TOOLS & INTEGRATIONS</small><strong>Every inquiry.<br/>In the right place.</strong><div class="pipeline-row"><b>NEW INQUIRY</b><span>Website inquiry received</span><i></i></div><div class="pipeline-row"><b>IN CONVERSATION</b><span>The details, together</span><i></i></div><div class="pipeline-row"><b>PROPOSAL</b><span>A clear next step</span><i></i></div>`,`<small>FUNNELS & FOLLOW-UP</small><strong>A conversation.<br/>With continuity.</strong><div class="screen-message">Thanks for reaching out.<br/><span>Let's talk about your project.</span></div><div class="screen-message reply">A call sounds good.<br/><span>See you Thursday.</span></div><div class="human-handoff">YOUR TEAM TAKES IT FROM HERE</div>`,`<small>YOUR NEXT CUSTOMER</small><div class="screen-check">✓</div><strong class="customer-confirm">Let's get<br/><em>started.</em></strong><div class="human-handoff">PROJECT CONFIRMED</div>`];
 positions.forEach(([x,z],i)=>{const dom=document.createElement('div');dom.className='fallback-screen screen-'+i;dom.innerHTML=`<div class="screen-brand">relevaint<span>● ● ●</span></div>${content[i]}`;const o=new CSS3DObject(dom);o.scale.setScalar(.005);o.position.set(x,2.25,z);o.rotation.y=[.18,.08,0,-.08,-.18][i];scene.add(o);const base=document.createElement('div');base.className='fallback-plinth';const b=new CSS3DObject(base);b.scale.setScalar(.005);b.position.set(x,.02,z);b.rotation.x=-Math.PI/2;scene.add(b);});
 const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-9,.07,2.2),...positions.map(([x,z])=>new THREE.Vector3(x,.07,z+1.5)),new THREE.Vector3(9,.07,2.2)]);
 // Floor path is a diagram projected through the same camera as the screens.
 const c=document.createElement('canvas');c.width=2400;c.height=1200;const ctx=c.getContext('2d')!;ctx.lineWidth=5;ctx.strokeStyle='#b45e35';ctx.beginPath();curve.getPoints(150).forEach((v,i)=>{const x=(v.x+12)*100,y=(v.z+6)*100;if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.stroke();const path=new CSS3DObject(c);path.scale.setScalar(.01);path.rotation.x=-Math.PI/2;path.position.set(0,.05,0);scene.add(path);
 const card=document.createElement('div');card.className='travel-card';card.innerHTML='<span>NEW CONNECTION</span><b>Your next<br/>customer.</b><i></i>';const token=new CSS3DObject(card);token.scale.setScalar(.004);scene.add(token);

 let disposed=false,mobile=el.clientWidth<700,lastP=0,lastReduced=false;
 const target=new THREE.Vector3();
 function render(p:number,reduced:boolean){
  if(disposed)return;lastP=p;lastReduced=reduced;const start=performance.now();const pose=journeyPose(reduced?1:p,mobile,camera.aspect);
  camera.position.set(...pose.camera);target.set(...pose.target);camera.lookAt(target);const v=curve.getPointAt(pose.token);token.position.copy(v);token.position.y=1;token.rotation.copy(camera.rotation);
  renderer.render(scene,camera);recordJourneyFrame(el,pose.p,pose.camera,[token.position.x,token.position.y,token.position.z],performance.now()-start,reduced);
 }
 function resize(){mobile=el.clientWidth<700;renderer.setSize(el.clientWidth,el.clientHeight);camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();render(lastP,lastReduced);}
 const res=new ResizeObserver(resize);res.observe(el);resize();
 return {render,destroy(){disposed=true;res.disconnect();renderer.domElement.remove();}};
}
