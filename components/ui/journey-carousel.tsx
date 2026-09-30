'use client';

import {useRef,useState,type CSSProperties,type PointerEvent} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,Film,Globe,ContactRound,MessageSquare,Handshake,Mail,CalendarClock,Users} from 'lucide-react';

export type JourneyCard={title:string;paragraphs:readonly string[];href?:string;linkLabel?:string};
const systemIcons=[Film,Globe,ContactRound,MessageSquare,Handshake];
const followIcons=[Mail,CalendarClock,Users];

/** Original implementation inspired by nexus-ui's curved carousel on 21st.dev. */
export function JourneyCarousel({cards,kind='system'}:{cards:JourneyCard[];kind?:'system'|'followup'}){
 const [active,setActive]=useState(0);
 const pointer=useRef<{x:number;y:number;id:number}|null>(null);
 const dragged=useRef(false);
 const go=(direction:number)=>setActive(n=>(n+direction+cards.length)%cards.length);
 const onDown=(e:PointerEvent<HTMLDivElement>)=>{if(e.button!==0)return;pointer.current={x:e.clientX,y:e.clientY,id:e.pointerId};dragged.current=false;};
 const onUp=(e:PointerEvent<HTMLDivElement>)=>{const start=pointer.current;pointer.current=null;if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.2){dragged.current=true;go(dx<0?1:-1);}};
 const names=kind==='system'?['Ad creative','Website','Customer management','Follow-up','Sale']:['Inquiry','Quote','Your team'];
 return <section className={`journey-carousel journey-carousel-${kind}`} aria-label={kind==='system'?'Explore the connected customer journey':'Explore follow-up services'} aria-roledescription="carousel" onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(e.key==='ArrowRight'?1:-1);}}}>
  <div className="orbit-intro"><span className="eyebrow">{kind==='system'?'ONE CUSTOMER. EVERY CONNECTION.':'FOLLOW-UP THAT FITS THE MOMENT'}</span><p>Swipe, use the arrows, or choose a step.</p></div>
  <div className="journey-orbit" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={()=>{pointer.current=null;}} onClickCapture={e=>{if(dragged.current){e.preventDefault();e.stopPropagation();dragged.current=false;}}}>
   <div className="orbit-track" aria-hidden="true"/>
   {cards.map((card,i)=>{let offset=(i-active+cards.length)%cards.length;if(offset>cards.length/2)offset-=cards.length;const Icon=(kind==='system'?systemIcons:followIcons)[i];const selected=i===active;const title=card.title.includes(': ')?card.title.split(': ').slice(1).join(': '):card.title;return <article key={card.title} className={`orbit-card ${selected?'is-active':''}`} style={{'--offset':offset,'--distance':Math.abs(offset),zIndex:10-Math.abs(offset)} as CSSProperties} aria-roledescription="slide" aria-label={`${i+1} of ${cards.length}: ${names[i]}`}>
    <button type="button" className="orbit-select" onClick={()=>setActive(i)} aria-label={`Show ${names[i]}`} aria-pressed={selected}><span>0{i+1} / {names[i]}</span><Icon size={25} strokeWidth={1.5}/></button>
    <div className="orbit-card-copy" inert={!selected}><h3>{title}</h3>{card.paragraphs.filter(p=>!p.startsWith('**')).map(p=><p key={p}>{p}</p>)}{card.href&&<a href={card.href}>{card.linkLabel}<ArrowUpRight size={18}/></a>}</div>
   </article>})}
  </div>
  <div className="orbit-controls"><button type="button" onClick={()=>go(-1)} aria-label="Previous step"><ArrowLeft size={20}/></button><div className="orbit-counter" aria-live="polite"><strong>{String(active+1).padStart(2,'0')}</strong><span>of {String(cards.length).padStart(2,'0')}</span></div><button type="button" onClick={()=>go(1)} aria-label="Next step"><ArrowRight size={20}/></button></div>
  <div className="orbit-pagination" role="group" aria-label="Choose a step">{cards.map((card,i)=><button type="button" key={card.title} onClick={()=>setActive(i)} aria-pressed={i===active}><span>0{i+1}</span>{names[i]}</button>)}</div>
 </section>;
}
