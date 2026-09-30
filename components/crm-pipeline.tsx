'use client';

import {useEffect,useRef,useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {Pause,Play,Check,UserRound} from 'lucide-react';
const stages=[
 {name:'New inquiry',action:'A new customer raises their hand.',next:'Assign the inquiry to your team.'},
 {name:'Contacted',action:'Your team starts the conversation.',next:'Understand what the customer needs.'},
 {name:'Proposed',action:'The right option is on the table.',next:'Answer questions and agree on next steps.'},
 {name:'Sold',action:'An inquiry becomes a customer.',next:'Keep the details for a smooth handoff.'},
];
export function CRMPipeline(){
 const root=useRef<HTMLDivElement>(null);const reduce=useReducedMotion();
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[visible,setVisible]=useState(false);
 useEffect(()=>{const el=root.current;if(!el)return;const o=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.35});o.observe(el);return()=>o.disconnect();},[]);
 useEffect(()=>{if(paused||reduce||!visible)return;const timer=setInterval(()=>{if(!document.hidden)setActive(n=>(n+1)%4);},2600);return()=>clearInterval(timer);},[paused,reduce,visible]);
 return <div ref={root} className="crm-pipeline" aria-label="Example customer moving through sales stages">
  <div className="pipeline-heading"><span>ONE CUSTOMER, MOVING FORWARD</span><button type="button" onClick={()=>setPaused(p=>!p)} aria-label={paused?'Play customer journey':'Pause customer journey'} disabled={Boolean(reduce)}>{paused||reduce?<Play size={16}/>:<Pause size={16}/>}</button></div>
  <div className="pipeline-scene">
   <div className="pipeline-rail" aria-hidden="true"><span style={{transform:`scaleX(${active/3})`}}/></div>
   <motion.div className="pipeline-person-position" initial={false} animate={{left:`${12.5+active*25}%`}} transition={{duration:reduce?0:.72,ease:[.22,.68,.25,1]}} aria-hidden="true"><motion.div className="pipeline-person" key={`${active}-${Boolean(reduce)}`} animate={{y:reduce?0:[0,-48,0],rotate:reduce?0:[0,active===0?-10:10,0]}} transition={{duration:.72,ease:'easeInOut'}}><UserRound size={48} strokeWidth={2.7}/>{active===3&&<span className="pipeline-won"><Check size={14}/></span>}</motion.div><span className="person-shadow"/></motion.div>
   <div className="pipeline-stages">{stages.map((s,i)=><button type="button" key={s.name} onClick={()=>{setPaused(true);setActive(i);}} aria-pressed={i===active} className={i<=active?'reached':''}><span className="pipeline-platform">{i<active?<Check size={16}/>:String(i+1).padStart(2,'0')}</span><strong>{s.name}</strong></button>)}</div>
  </div>
  <div className="pipeline-note"><span>STAGE {active+1} / 4</span><h3>{stages[active].action}</h3><p>{stages[active].next}</p></div>
  <p className="pipeline-caption">Example journey · Your stages follow your sales process.</p>
 </div>;
}
