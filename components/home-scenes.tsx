'use client';
import {useEffect,useRef} from 'react';
import {ArrowUpRight,Check} from 'lucide-react';
import {mountScrollcraft} from '@/lib/scrollcraft';

function useScene(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!root.current)return;let disposed=false;let resize:ResizeObserver|undefined;
  mountScrollcraft(root.current).then(api=>{if(disposed)return;resize=new ResizeObserver(()=>api.layout());resize.observe(document.body);api.layout();}).catch(()=>{});
  return()=>{disposed=true;resize?.disconnect();};
 },[]);return root;
}

export function Hero(){
 const root=useScene();
 return <div ref={root} className="hero-scene"><section className="connection-hero" data-sc-act="pin" data-sc-span="1.7" data-sc-dwell="0" aria-labelledby="hero-title">
  <div className="hero-stage" data-sc-stage>
   <div className="hero-orbit" aria-hidden="true"/>
   <div className="hero-lead"><h1 id="hero-title">Be found.<br/><span>Be chosen.</span></h1><p>Websites, creative, and follow-up that help the right customers see your value and take the next step.</p><div className="hero-actions"><a className="button copper" href="#contact">Let’s talk <ArrowUpRight size={17}/></a><a className="text-link" href="#work">See the work <ArrowUpRight size={16}/></a></div></div>
   <div className="connection-composition" aria-label="Website and creative work, connected to a customer conversation">
    <div className="depth-website"><div className="surface-bar"><span>Total Detailing</span><span>Website · Live project</span></div><img src="/media/total-project.jpg" alt="Total Detailing website" width="1353" height="929" fetchPriority="high"/></div>
    <div className="depth-creative"><img src="/media/rtv-project.jpg" alt="RTV AI Studios website design preview" width="1200" height="750"/><span>Creative that starts a conversation.</span></div>
    <div className="depth-inquiry"><Check size={20}/><div><strong>A clearer next step.</strong><span>From first interest to a conversation.</span></div></div>
   </div>
   <p className="hero-footnote">Start with one piece. Make the connections count.</p>
  </div>
 </section></div>;
}

export function CustomerProblems({choose}:{choose:(service:string)=>void}){
 const root=useScene();
 return <div ref={root} className="problem-scenes">
  <div className="problem-intro"><h2>Good business.<br/>Room to show it better.</h2><p>You’ve built something people value. Your marketing should help them see it.</p></div>
  <div className="problem-stack">
   <article className="problem-panel problem-presence" data-sc-act="flow"><div className="problem-message"><span className="problem-kicker">WHEN YOUR WEBSITE UNDERSELLS YOUR WORK</span><h3>Give people a reason<br/>to choose you.</h3><p>A visitor shouldn’t have to piece together what you offer or why it matters. Give them a clear story, work they can trust, and an obvious way to get in touch.</p><button className="text-link" onClick={()=>choose('Websites & landing pages')}>Let’s talk <ArrowUpRight size={17}/></button><span className="problem-service">Websites & landing pages</span></div><div className="problem-media"><img src="/media/total-project.jpg" alt="Total Detailing service presentation on its live website" width="1353" height="929" loading="lazy"/><span>Total Detailing · Live website</span></div></article>
   <article className="problem-panel problem-creative" data-sc-act="flow"><div className="problem-message"><span className="problem-kicker">WHEN CONTENT KEEPS GETTING PUSHED BACK</span><h3>Stay visible.<br/>Stay worth a look.</h3><p>You have a business to run. Turn your expertise, your offer, and the work you’re proud of into video and social content, with a practical way to keep it coming.</p><button className="text-link" onClick={()=>choose('Video & ad creative')}>Let’s talk <ArrowUpRight size={17}/></button><span className="problem-service">Video, ad creative & social content</span></div><div className="problem-media"><img src="/media/rtv-project.jpg" alt="RTV AI Studios creative portfolio design preview" width="1200" height="750" loading="lazy"/><span>RTV AI Studios · Website design preview</span></div></article>
   <article className="problem-panel problem-followup" data-sc-act="flow"><div className="problem-message"><span className="problem-kicker">WHEN GOOD INQUIRIES GO QUIET</span><h3>Don’t let interest<br/>end in an inbox.</h3><p>Make it clear who responds, what they need to know, and what happens next. Connect your inquiry forms, sales tools, and follow-up around the way your customers decide.</p><button className="text-link" onClick={()=>choose('Funnels & follow-up')}>Let’s talk <ArrowUpRight size={17}/></button><span className="problem-service">Funnels, follow-up & sales tools</span></div><div className="handoff-diagram" aria-label="A useful follow-up connects three things"><p>The right person.</p><p>The full context.</p><p>A clear next step.</p><a href="#journey">See how the pieces connect <ArrowUpRight size={20}/></a></div></article>
  </div>
 </div>;
}
