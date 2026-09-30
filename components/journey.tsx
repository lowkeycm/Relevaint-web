'use client';
import {useEffect,useRef,useState} from 'react';
import {mountScrollcraft,type ScrollcraftApi} from '@/lib/scrollcraft';
import {JOURNEY_STOPS,journeyStage,type JourneyRenderer} from '@/lib/journey-motion';
const stages=[
{title:'Give the right people a reason to notice.',label:'Discovery',body:'Show people what makes your business worth a closer look. Useful content and strong creative make the introduction before anyone reaches your website.',service:'Video, ad creative & social content',next:'From unfamiliar to interested.'},
{title:'Make the next step feel obvious.',label:'Interest',body:'When someone lands on your website, help them understand your offer, trust the work, and find a simple way to ask about it.',service:'Websites & landing pages',next:'From interested to reaching out.'},
{title:'Put the inquiry in the right hands.',label:'Connection',body:'Give your team the customer’s details, what they need, and where they came from. Less searching through inboxes. A better place to start the conversation.',service:'Sales tools & integrations',next:'From scattered details to useful context.'},
{title:'Keep a good conversation moving.',label:'Follow-up',body:'A useful reply, a timely reminder, and a clear owner help interest move forward. Connect the routine steps so your team can focus on the person.',service:'Funnels & follow-up',next:'From an unanswered inquiry to a next step.'},
{title:'Start the relationship on solid ground.',label:'Customer',body:'When the customer is ready, make the handoff clear. An agreed project or booking, the right details, and a team ready to deliver.',service:'A connected customer experience',next:'From a decision to getting started.'},
{title:'Make every good first impression easier to follow through on.',label:'Together',body:'Your creative, website, and sales tools each have a job. Connect the steps that need attention so a potential customer has a clearer path through your business.',service:'One project or a connected build',next:'Better pieces. More useful connections.'}
];
export default function Journey(){
 const wrapper=useRef<HTMLDivElement>(null),root=useRef<HTMLElement>(null),mount=useRef<HTMLDivElement>(null);
 const api=useRef<ScrollcraftApi|null>(null),renderer=useRef<JourneyRenderer|null>(null),readFrame=useRef<()=>void>(()=>{});
 const manual=useRef(false),[manualReduced,setManualReduced]=useState(false),[reduced,setReduced]=useState(false),[active,setActive]=useState(0),[status,setStatus]=useState('loading');
 useEffect(()=>{
  if(!wrapper.current||!root.current||!mount.current)return;
  const host=wrapper.current,act=root.current,canvas=mount.current,media=matchMedia('(prefers-reduced-motion: reduce)');
  let disposed=false,visible=false,starting=false,previousStage=-1,observer:MutationObserver|undefined,resize:ResizeObserver|undefined,lostCanvas:HTMLCanvasElement|null=null;
  const motion=()=>{setReduced(media.matches||manual.current);requestAnimationFrame(()=>{api.current?.layout();paint();});};
  function paint(){
   const p=Number(act.style.getPropertyValue('--sc-p'))||0,still=media.matches||manual.current;
   const stage=journeyStage(p);if(stage!==previousStage){previousStage=stage;setActive(stage);}
   if(visible&&!document.hidden)renderer.current?.render(p,still);
  }
  readFrame.current=paint;
  async function useCompatible(){
   const {createFallback}=await import('./journey-fallback');if(disposed)return;
   renderer.current?.destroy();renderer.current=createFallback(canvas);canvas.dataset.renderer='css3d';setStatus('ready');paint();
  }
  const lost=(event:Event)=>{event.preventDefault();useCompatible().catch(()=>setStatus('failed'));};
  async function startScene(){
   if(starting||disposed)return;starting=true;
   try{
    const probe=document.createElement('canvas'),context=probe.getContext('webgl2');
    if(context){const {createJourneyWebGL}=await import('./journey-webgl');if(disposed){context.getExtension('WEBGL_lose_context')?.loseContext();return;}
     const scene=await createJourneyWebGL(canvas,probe,context);if(disposed){scene.destroy();return;}renderer.current=scene;canvas.dataset.renderer='webgl';lostCanvas=probe;probe.addEventListener('webglcontextlost',lost);setStatus('ready');paint();
    }else await useCompatible();
   }catch{try{await useCompatible();}catch{if(!disposed)setStatus('failed');}}
  }
  const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){startScene();paint();}},{rootMargin:'350px'});visibility.observe(act);
  mountScrollcraft(host).then(instance=>{
   if(disposed)return;api.current=instance;act.dataset.engine='scrollcraft';
   observer=new MutationObserver(paint);observer.observe(act,{attributes:true,attributeFilter:['style']});
   resize=new ResizeObserver(()=>instance.layout());resize.observe(document.body);
   instance.layout();paint();
  }).catch(()=>{if(!disposed)setStatus('failed');});
  media.addEventListener('change',motion);document.addEventListener('visibilitychange',paint);motion();
  return()=>{disposed=true;observer?.disconnect();resize?.disconnect();visibility.disconnect();media.removeEventListener('change',motion);document.removeEventListener('visibilitychange',paint);lostCanvas?.removeEventListener('webglcontextlost',lost);renderer.current?.destroy();renderer.current=null;readFrame.current=()=>{};};
 },[]);
 useEffect(()=>{api.current?.layout();readFrame.current();},[reduced,status]);
 function go(i:number){if(!root.current)return;const section=root.current;const y=section.getBoundingClientRect().top+scrollY+(section.offsetHeight-innerHeight)*JOURNEY_STOPS[i];window.scrollTo({top:y,behavior:'instant'});api.current?.read();readFrame.current();}
 function toggle(){manual.current=!manual.current;setManualReduced(manual.current);setReduced(manual.current||matchMedia('(prefers-reduced-motion: reduce)').matches);requestAnimationFrame(()=>{api.current?.layout();root.current?.scrollIntoView({behavior:'instant',block:'start'});readFrame.current();});}
 return <div ref={wrapper} data-sc-lerp="1"><section id="journey" data-sc-act="pin" data-sc-span="4.5" data-sc-dwell="0" className={`journey ${reduced||status==='failed'?'static-journey':''}`} ref={root} aria-label="From discovery to customer">
  <div className="journey-sticky" data-sc-stage>
   <button className="motion-control" aria-pressed={manualReduced} onClick={toggle}>{manualReduced?'Enable motion':'Reduce motion'}</button>
   <div className="journey-heading"><h2>From discovery to customer.</h2><p>Help people take the next step.</p></div>
   <div className="journey-story"><div className="journey-message"><span className="journey-chapter">{stages[active].label}</span><h3>{stages[active].title}</h3><p>{stages[active].body}</p><div className="journey-payoff"><span aria-hidden="true">↗</span>{stages[active].next}</div><span className="journey-service">{stages[active].service}</span></div>
   <div className="journey-visual"><div className="journey-canvas" ref={mount} aria-hidden="true"/>{status!=='ready'&&<div className="journey-loading" aria-hidden="true">{stages[active].label}</div>}<p className="journey-scene-caption">{stages[active].label}</p></div></div>
   <div className="journey-controls" aria-label="Journey stages">{stages.map((s,i)=><button key={s.label} onClick={()=>go(i)} className={i===active?'active':''} aria-current={i===active?'step':undefined}><span className="journey-step-track" aria-hidden="true"/>{s.label}</button>)}</div>
  </div>
  <div className="journey-accessible">{stages.map(s=><article key={s.label}><span>{s.label}</span><h3>{s.title}</h3><p>{s.body}</p></article>)}</div>
 </section></div>;
}
