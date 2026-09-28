'use client';
import {useEffect,useRef,useState,type CSSProperties,type PointerEvent} from 'react';
import {ArrowUpRight,ArrowLeft,ArrowRight,Film,Globe,ContactRound,MessageCircle,Handshake} from 'lucide-react';
import {capabilities,serviceHref} from '@/lib/services';
import {mountScrollcraft} from '@/lib/scrollcraft';
const icons=[Film,Globe,ContactRound,MessageCircle,Handshake];
export default function BusinessWorld(){
 const [active,setActive]=useState(0);const [still,setStill]=useState(false);const root=useRef<HTMLDivElement>(null);
 const gesture=useRef<{id:number;x:number;y:number;axis:'pending'|'horizontal'|'vertical'}|null>(null);
 const suppressClickUntil=useRef(0);
 function startSwipe(event:PointerEvent<HTMLDivElement>){
  // A second finger cancels the carousel gesture so pinch zoom stays native.
  if(!event.isPrimary){gesture.current=null;return;}
  suppressClickUntil.current=0;
  if(event.button!==0||(event.target as Element).closest('button'))return;
  gesture.current={id:event.pointerId,x:event.clientX,y:event.clientY,axis:'pending'};
 }
 function moveSwipe(event:PointerEvent<HTMLDivElement>){
  const start=gesture.current;if(!start||start.id!==event.pointerId)return;
  const dx=event.clientX-start.x,dy=event.clientY-start.y;
  if(start.axis==='pending'&&Math.max(Math.abs(dx),Math.abs(dy))>10){
   start.axis=Math.abs(dx)>Math.abs(dy)*1.2?'horizontal':'vertical';
   if(start.axis==='horizontal')event.currentTarget.setPointerCapture(event.pointerId);
  }
  if(start.axis==='horizontal'){
   event.preventDefault();
   // Dragging a linked card must not navigate when the finger is released.
   suppressClickUntil.current=Date.now()+800;
  }
 }
 function endSwipe(event:PointerEvent<HTMLDivElement>){
  const start=gesture.current;if(!start||start.id!==event.pointerId)return;
  gesture.current=null;
  if(start.axis==='horizontal'){
   const dx=event.clientX-start.x;
   const threshold=Math.min(45,Math.max(28,event.currentTarget.clientWidth*.08));
   if(Math.abs(dx)>=threshold)setActive(i=>(i+(dx<0?1:capabilities.length-1))%capabilities.length);
   suppressClickUntil.current=Date.now()+800;
   if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  }
 }
 useEffect(()=>{const step=new URLSearchParams(location.search).get('step');const i=capabilities.findIndex(s=>s.slug===step);if(i>=0)setActive(i);const el=root.current;if(!el)return;let disposed=false;let ro:ResizeObserver|undefined;mountScrollcraft(el).then(api=>{if(disposed)return;ro=new ResizeObserver(()=>api.layout());ro.observe(el);api.layout();}).catch(()=>{});return()=>{disposed=true;ro?.disconnect();};},[]);
 const current=capabilities[active];
 return <div ref={root} className={`business-world ${still?'world-still':''}`}>
 <section className="world-hero" data-sc-act="flow" aria-labelledby="world-title">
 <div className="world-copy"><p className="world-kicker">CREATIVE. WEBSITES. CUSTOMER CONNECTIONS.</p><h1 id="world-title">Your business.<br/><em>Improved.</em></h1><p className="world-promise">More attention.<br/>More value. More sales.</p><p className="world-intro">Get noticed. Turn interest into inquiries. Make follow-up easier. Choose the help your business needs—or connect it all.</p><a href="/services/connected-system" className="text-link">See how it all works together <ArrowUpRight size={17}/></a></div>
 <div className="world-scene" aria-label="Explore the services around your business. Swipe left or right to change the selected service."
 onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={endSwipe}
 onPointerCancel={()=>{gesture.current=null;}}
 onDragStart={event=>event.preventDefault()}
 onClickCapture={event=>{if(event.detail>0&&Date.now()<suppressClickUntil.current){event.preventDefault();event.stopPropagation();suppressClickUntil.current=0;}}}>
 <img className="neighborhood" src="/media/business-neighborhood.webp" alt="An illustrative three-dimensional neighborhood with a local business at its center" width="1536" height="1024" fetchPriority="high"/>
 <div className="capability-orbit" aria-roledescription="carousel" aria-label="Business capabilities"><div className="orbit-track">{capabilities.map((s,i)=>{const offset=((i-active+7)%5)-2;const Icon=icons[i];return <a key={s.slug} href={serviceHref(s.slug)} className={`capability-card ${active===i?'selected':''}`} style={{'--position':offset,'--distance':Math.abs(offset),zIndex:5-Math.abs(offset)} as CSSProperties} aria-label={`${s.label}: ${s.verb} Explore this service`}><span className="capability-number">0{i+1}<ArrowUpRight size={14}/></span><Icon size={27} strokeWidth={1.3}/><strong>{s.label}</strong><small>{s.verb}</small></a>})}</div></div>
 <span className="storefront-label">YOUR BUSINESS<span>At the center of it all.</span></span>
 <div className="orbit-controls"><button aria-label="Previous capability" onClick={()=>setActive(i=>(i+4)%5)}><ArrowLeft size={17}/></button><span>{String(active+1).padStart(2,'0')} / 05</span><button aria-label="Next capability" onClick={()=>setActive(i=>(i+1)%5)}><ArrowRight size={17}/></button><button className="motion-toggle" aria-pressed={still} onClick={()=>setStill(!still)}>{still?'Motion off':'Reduce motion'}</button></div>
 </div>
 <div className="journey-explorer" id="journey"><div className="journey-explorer-label"><span>FROM FIRST LOOK TO CUSTOMER</span><p>Choose a step. See what it does.</p></div><div className="journey-step-buttons" role="group" aria-label="Choose a step in your customer journey">{capabilities.map((s,i)=><button key={s.slug} aria-pressed={active===i} aria-controls="capability-detail" className={active===i?'active':''} onClick={()=>setActive(i)}><span>0{i+1}</span>{s.label}{i<4&&<ArrowRight size={14}/>}</button>)}</div><div className="capability-detail" id="capability-detail" aria-live="polite" aria-atomic="true"><div><span className="detail-stage">{current.label}</span><h2>{current.verb}</h2></div><p>{current.benefit}</p><a className="button copper" href={serviceHref(current.slug)}>{current.cta}<ArrowUpRight size={17}/></a></div></div>
 </section></div>
}
export function ServiceChoices(){return <section className="service-choices" id="services"><div className="choice-heading"><p className="eyebrow">BUILT AROUND WHAT YOU NEED</p><h2>One missing piece.<br/>Or the whole picture.</h2><p>You can start with a single service. You can also connect the entire journey, so the work in one place supports the next.</p></div><div className="individual-choices"><h3>Improve one part of your business.</h3>{capabilities.slice(0,4).map((s,i)=><a href={serviceHref(s.slug)} key={s.slug}><span>0{i+1}</span><div><strong>{s.label==='Website'?'Websites & databases':s.label==='CRM'?'CRM setups':s.label}</strong><p>{s.detail}</p></div><ArrowUpRight size={22}/></a>)}</div><a className="whole-system-choice" href="/services/connected-system"><span>THE CONNECTED SYSTEM</span><h3>Make every piece<br/>work together.</h3><p>From the ad that catches their eye to the conversation that earns their business.</p><span className="whole-system-link">Explore the full system <ArrowUpRight size={22}/></span></a></section>}
