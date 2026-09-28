import {journeyPose,recordJourneyFrame,type JourneyRenderer} from '@/lib/journey-motion';
export async function createJourneyWebGL(el:HTMLElement,canvas:HTMLCanvasElement,context:WebGL2RenderingContext):Promise<JourneyRenderer>{
 const THREE=await import('three');const {RoundedBoxGeometry}=await import('three/examples/jsm/geometries/RoundedBoxGeometry.js');
 const scene=new THREE.Scene();scene.background=new THREE.Color('#e8e3da');scene.fog=new THREE.Fog('#e8e3da',60,140);
 const renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;el.appendChild(renderer.domElement);el.dataset.renderer='webgl';renderer.domElement.setAttribute('aria-hidden','true');
 const camera=new THREE.PerspectiveCamera(35,1,.1,150); const hemi=new THREE.HemisphereLight('#ffffff','#9c8872',2.6);scene.add(hemi);
 const sun=new THREE.DirectionalLight('#fff4e3',5);sun.position.set(-8,14,7);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-15,right:15,top:12,bottom:-12,near:.5,far:50});sun.shadow.bias=-.0004;sun.shadow.normalBias=.03;scene.add(sun);
 const rim=new THREE.DirectionalLight('#d2e3e2',2.5);rim.position.set(8,5,-4);scene.add(rim);
 const ivory=new THREE.MeshStandardMaterial({color:'#f2eee7',roughness:.5,metalness:.1});const dark=new THREE.MeshStandardMaterial({color:'#273831',roughness:.32,metalness:.55});const copper=new THREE.MeshStandardMaterial({color:'#c46231',roughness:.28,metalness:.65});const silver=new THREE.MeshStandardMaterial({color:'#aaa99f',roughness:.22,metalness:.8});
 const geometries:import('three').BufferGeometry[]=[];const textures:import('three').Texture[]=[];const materials:import('three').Material[]=[ivory,dark,copper,silver];
 function box(w:number,h:number,d:number,m:import('three').Material,x=0,y=0,z=0,r=.08){const g=new RoundedBoxGeometry(w,h,d,3,r);geometries.push(g);const mesh=new THREE.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;return mesh;}
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(160,120),new THREE.MeshStandardMaterial({color:'#e8e3da',roughness:.88}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.position.y=-.1;scene.add(floor);
 // The screens are illustrative UI surfaces. Their full meaning is repeated in HTML.
 const screenTextures:import('three').CanvasTexture[]=[];
 function screenTexture(i:number){const c=document.createElement('canvas');c.width=768;c.height=900;const ctx=c.getContext('2d')!;ctx.fillStyle=i===0?'#18372d':'#f8f5ef';ctx.fillRect(0,0,768,900);const ink=i===0?'#f7f3eb':'#26352f';
 const rect=(x:number,y:number,w:number,h:number,color:string,r=20)=>{ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();};
 const text=(s:string,x:number,y:number,size:number,color=ink,font='Arial')=>{ctx.fillStyle=color;ctx.font=`${size>42?'600':'400'} ${size}px ${font}`;ctx.fillText(s,x,y);};
 text('relevaint',48,68,32);text(['CREATIVE','YOUR WEBSITE','YOUR SALES PIPELINE','THE CONVERSATION','YOUR NEXT CUSTOMER'][i],48,145,22,i===0?'#adc2b6':'#67756b');
 if(i===0){rect(38,190,692,490,'#345144');text('Worth a',78,300,72);text('closer look.',78,385,72);rect(75,470,325,82,'#c46a3d');text('Meet your next chapter',96,520,23,'#ffffff');ctx.beginPath();ctx.arc(595,430,57,0,7);ctx.fillStyle='#ffffffdd';ctx.fill();ctx.beginPath();ctx.moveTo(580,405);ctx.lineTo(580,455);ctx.lineTo(620,430);ctx.fillStyle='#234435';ctx.fill();text('Made to make an impression.',48,745,29);text('Video · Social · Ad creative',48,809,24,'#adc2b6');}
 if(i===1){rect(38,195,692,270,'#e5dfd2');text('A business worth',65,290,51);text('getting to know.',65,353,51);text('Tell us what you have in mind.',48,538,32);rect(48,580,670,70,'#eae6df');text('Your name',70,626,24);rect(48,672,670,70,'#eae6df');text('What can we help with?',70,719,24);rect(48,771,670,76,'#b7572d');text('Start a conversation',190,821,28,'#ffffff');}
 if(i===2){text('Every inquiry.',48,240,58);text('In the right place.',48,310,58);['NEW INQUIRY','IN CONVERSATION','PROPOSAL'].forEach((s,j)=>{rect(48,370+j*150,670,125,j===0?'#dfebdf':'#ece9e2');text(s,72,413+j*150,20);rect(72,435+j*150,245,12,j===0?'#5b836b':'#bbbeb5',6);rect(72,464+j*150,420,10,'#cbd0c5',5);});}
 if(i===3){text('A conversation.',48,242,58);text('With continuity.',48,313,58);rect(48,377,585,130,'#e5e9e0');text('Thanks for reaching out.',78,430,29);text('Let’s talk about your project.',78,473,25);rect(130,548,590,125,'#2e5141');text('A call sounds good.',164,604,28,'#ffffff');text('See you Thursday.',164,647,25,'#dae7d9');rect(48,714,670,115,'#e4dfd3');text('YOUR TEAM TAKES IT FROM HERE',79,779,23);}
 if(i===4){ctx.beginPath();ctx.arc(384,370,112,0,7);ctx.fillStyle='#dce6d6';ctx.fill();ctx.beginPath();ctx.moveTo(325,370);ctx.lineTo(370,413);ctx.lineTo(450,325);ctx.strokeStyle='#315940';ctx.lineWidth=15;ctx.lineCap='round';ctx.stroke();text('Let’s get',175,587,67);text('started.',212,668,67);text('PROJECT CONFIRMED',224,773,24);}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());textures.push(t);screenTextures.push(t);return t;}
 const positions=[[-7,0],[-3.5,-2],[0,-3],[3.5,-2],[7,0]];const screens:import('three').Group[]=[];
 positions.forEach(([x,z],i)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=[.18,.08,0,-.08,-.18][i];const plinth=box(3.1,.25,2.3,ivory,0,.025,0,.1);g.add(plinth);g.add(box(.18,.72,.22,silver,0,.49,-.05,.035));g.add(box(1.25,.06,.8,silver,0,.18,0,.025));const w=i===0?1.95:2.55,h=i===0?3.45:3.12;g.add(box(w,h,.18,dark,0,2.35,0,.1));g.add(box(w+.045,h+.045,.11,silver,0,2.35,-.045,.11));const face=new THREE.Mesh(new THREE.PlaneGeometry(w-.14,h-.14),new THREE.MeshBasicMaterial({map:screenTexture(i)}));face.position.set(0,2.35,.1);g.add(face);scene.add(g);screens.push(g);});
 const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-9,.17,2.2),...positions.map(([x,z])=>new THREE.Vector3(x,.17,z+1.5)),new THREE.Vector3(9,.17,2.2)]);const tube=new THREE.TubeGeometry(curve,120,.032,8,false);const track=new THREE.Mesh(tube,copper);scene.add(track);geometries.push(tube);
 const token=new THREE.Group();token.add(box(.72,.92,.045,ivory,0,0,0,.055));token.add(box(.42,.07,.02,copper,0,.18,.035,.015));token.add(box(.43,.035,.02,silver,0,-.02,.035,.008));token.add(box(.29,.035,.02,silver,-.07,-.15,.035,.008));token.traverse(o=>{if(o instanceof THREE.Mesh)o.castShadow=false;});scene.add(token);
 const marker=new THREE.Mesh(new THREE.SphereGeometry(.085,16,16),copper);scene.add(marker);

 let mobile=el.clientWidth<700,lastP=0,lastReduced=false,disposed=false;
 renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
 const target=new THREE.Vector3();
 function render(p:number,reduced:boolean){
  if(disposed)return;lastP=p;lastReduced=reduced;const start=performance.now();const pose=journeyPose(reduced?1:p,mobile,camera.aspect);
  camera.position.set(...pose.camera);target.set(...pose.target);camera.lookAt(target);
  const t=curve.getPointAt(pose.token);marker.position.copy(t);token.position.copy(t);token.position.y=1;token.rotation.copy(camera.rotation);
  renderer.render(scene,camera);recordJourneyFrame(el,pose.p,pose.camera,[token.position.x,token.position.y,token.position.z],performance.now()-start,reduced);
 }
 function resize(){const w=el.clientWidth,h=el.clientHeight;mobile=w<700;const budget=mobile?1000000:2000000;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.5,Math.sqrt(budget/Math.max(1,w*h))));renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.shadowMap.needsUpdate=true;render(lastP,lastReduced);}
 const res=new ResizeObserver(resize);res.observe(el);resize();
 return {render,destroy(){disposed=true;res.disconnect();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();}};
}
