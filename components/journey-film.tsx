'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {capabilities,serviceHref} from '@/lib/services';

export default function JourneyFilm(){
 const [mobile,setMobile]=useState<boolean|null>(null);
 useEffect(()=>{const query=matchMedia('(max-width: 600px)');const update=()=>setMobile(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
 return <section className="journey-film" id="connected-path" aria-labelledby="journey-film-title">
  <div className="journey-film-layout"><div className="journey-film-copy"><p className="eyebrow">FROM FIRST CLICK TO CUSTOMER</p><h2 id="journey-film-title">Watch the pieces<br/><em>work together.</em></h2><p>Follow one inquiry through the ad, the website, customer management, and follow-up—toward a sales conversation.</p><Link className="text-link" href="/services/connected-system">Explore the connected system <ArrowUpRight size={17}/></Link></div>
  <div className="journey-film-stage"><video key={mobile?'mobile':'desktop'} className="journey-film-player" controls playsInline preload="none" poster={mobile?'/media/journey-mobile.jpg':'/media/journey-desktop.jpg'} aria-label="Relevaint: ad to website to CRM to follow-up to sale" aria-describedby="journey-film-transcript">
   {mobile!==null&&<source src={mobile?'/media/journey-mobile.mp4':'/media/journey-desktop.mp4'} type="video/mp4"/>}
   Your browser cannot play this video. Read the journey below.
  </video><p className="journey-film-caption">22 seconds · Sound isn’t needed.</p></div></div>
  <nav className="journey-film-links" aria-label="Explore each part of the customer journey">{capabilities.map((s,i)=><Link key={s.slug} href={serviceHref(s.slug)}><span>0{i+1}</span>{['Ad creative','Website','CRM','Follow-up','Sale'][i]}<ArrowUpRight size={15}/></Link>)}</nav>
  <details className="journey-film-transcript" id="journey-film-transcript"><summary>Read the journey</summary><p>A click is only the beginning. Ad creative gives someone a reason to notice. The website makes the next step clear. CRM keeps the inquiry, conversation and next action together. Follow-up keeps the conversation moving, with your team involved. The connected system gives your team the context to support the sale. Start with one project, or connect the pieces.</p></details>
 </section>;
}
