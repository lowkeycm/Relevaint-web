import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {notFound} from 'next/navigation';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import SiteHeader from '@/components/site-header';
import {CustomerContextDemo,FollowupDemo,LayerTrack} from '@/components/workflow-scenes';
import {WebsiteShowcase,CreativeGallery,AdGallery} from '@/components/service-media';
import {capabilities,serviceHref,inquiryHref,type ServiceSlug} from '@/lib/services';
import {serviceCopy} from '@/lib/service-copy';

function Inline({text}:{text:string}){return <>{text.split(/(\*\*.*?\*\*)/g).map((part,i)=>part.startsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:part)}</>}
const links:Record<string,string>={
 'Explore creative':'creative','Explore websites':'websites','Explore websites & landing pages':'websites','Explore CRM & customer management':'crm','Explore CRM setups':'crm','Explore follow-up':'follow-up',
};
function Paragraphs({items,slug}:{items:readonly string[];slug:ServiceSlug}){return <>{items.map((p,i)=>{
 if(p.startsWith('- '))return <ul key={i}>{p.split('\n').map(line=><li key={line}><Inline text={line.replace(/^- /,'')}/></li>)}</ul>;
 if(/^\*\*[^*]+\*\*$/.test(p)){const text=p.slice(2,-2);return <a key={i} className="text-link" href={links[text]?serviceHref(links[text]):inquiryHref(slug)}>{text}<ArrowUpRight size={17}/></a>}
 return <p key={i}><Inline text={p}/></p>;
 })}</>}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const c=serviceCopy[slug as ServiceSlug];return c?{title:`${c.sections[0].title} | Relevaint`,description:c.sections[0].paragraphs[0],alternates:{canonical:`/services/${slug}`}}:{}}
export function generateStaticParams(){return capabilities.map(({slug})=>({slug}))}
export const dynamicParams=false;
export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
 const {slug:requested}=await params;const service=capabilities.find(s=>s.slug===requested);if(!service)notFound();const slug=service.slug;const index=capabilities.indexOf(service);const c=serviceCopy[slug];const [hero,problem,solution,...remaining]=c.sections;
 const final=remaining[remaining.length-1];const body=remaining.slice(0,-1);
 const heroCta=hero.paragraphs.find(p=>/^\*\*[^*]+\*\*$/.test(p));
 const heroParagraphs=hero.paragraphs.filter(p=>p!==heroCta);
 const sections:ReactNode[]=[];
 for(let i=0;i<body.length;i++){
  const section=body[i];
  if(section.title==='Watch the videos.'){sections.push(<CreativeGallery key="films"/>);continue;}
  if(section.title==='See how an image can explain an offer.'){sections.push(<AdGallery key="ads"/>);continue;}
  if(section.title==='Explore the websites.'){sections.push(<WebsiteShowcase key="websites"/>);continue;}
  if(section.title==='See what a useful customer record holds.'){sections.push(<CustomerContextDemo key="crm"/>);continue;}
  if(section.title==='Walk through an example.'){sections.push(<FollowupDemo key="followup"/>);continue;}
  if(section.title==='Choose the creative your business needs.'){
   const options=section.paragraphs[0].split('\n').map(line=>{const match=line.match(/^- \*\*(.+?):\*\* (.+)$/);return match?{title:match[1],body:match[2]}:{title:'',body:line};});
   sections.push(<section className="service-scope" key={section.title}><div><p className="eyebrow">VIDEO, IMAGES & SOCIAL</p><h2>{section.title}</h2></div><div className="scope-rows">{options.map(option=><article key={option.title}><h3>{option.title}</h3><p>{option.body}</p></article>)}</div></section>);continue;
  }
  if(section.title==='Choose the right approach for your team.'){
   sections.push(<section className="copy-crm-choice" key={section.title}><h2>{section.title}</h2><div className="crm-compare">{[0,2].map((n,i)=><div key={n}><span className="eyebrow">OPTION 0{i+1}</span><h3>{section.paragraphs[n].replaceAll('**','')}</h3><p>{section.paragraphs[n+1]}</p></div>)}</div></section>);continue;
  }
  // Keep the dimensional benefit panels and route-specific demonstrations.
  if(section.level===3){const group:{level:number;title:string;paragraphs:readonly string[]}[]=[section];while(i+1<body.length&&body[i+1].level===3)group.push(body[++i]);if(group.length===1){sections.push(<section className="service-note copy-note" key={section.title}><h2>{section.title}</h2><div><Paragraphs items={section.paragraphs} slug={slug}/></div></section>);continue;}sections.push(<LayerTrack className={`copy-benefit-track ${slug==='connected-system'?'connected-copy-track':''}`} key={section.title}><section className="website-jobs" data-sc-act="flow">{group.map((s,n)=><article key={s.title}><span>0{n+1}</span><h3>{s.title}</h3><Paragraphs items={s.paragraphs} slug={slug}/></article>)}</section></LayerTrack>);continue;}
  const isCrossLink=section.paragraphs.some(p=>Boolean(links[p.replaceAll('**','')]));
  sections.push(<section className={isCrossLink?'service-next copy-next':'service-note copy-note'} key={section.title}><h2>{section.title}</h2><div><Paragraphs items={section.paragraphs} slug={slug}/></div></section>);
 }
 return <><SiteHeader/><main id="main" className={`service-page service-page-${slug} copy-service-page`}><section className="service-page-hero"><a className="service-back" href={`/?step=${slug}#journey`}>← Back to your business journey</a><div className="service-hero-grid"><div><p className="eyebrow">{String(index+1).padStart(2,'0')} / {c.name.toUpperCase()}</p><h1>{hero.title}</h1></div><div className="service-hero-intro"><Paragraphs items={heroParagraphs.slice(0,slug==='crm'?2:1)} slug={slug}/><a className="button copper" href={inquiryHref(slug)}>{heroCta?.slice(2,-2)}<ArrowUpRight size={17}/></a>{heroParagraphs.slice(slug==='crm'?2:1).map(p=><span key={p}>{p}</span>)}</div></div></section>
 <nav className="service-route-nav" aria-label="Customer journey">{capabilities.map((s,i)=><a key={s.slug} href={serviceHref(s.slug)} aria-current={slug===s.slug?'page':undefined}><span>0{i+1}</span>{s.slug==='connected-system'?'Full system':s.slug==='crm'?'Customers':s.label}{i<4&&<ArrowRight size={14}/>}</a>)}</nav>
 <section className="service-problem"><h2>{problem.title}</h2><div><Paragraphs items={problem.paragraphs} slug={slug}/></div></section>
 <section className="service-solution"><p className="eyebrow">HOW RELEVAINT HELPS</p><h2>{solution.title}</h2><Paragraphs items={solution.paragraphs} slug={slug}/></section>
 {sections}
 <section className="service-final"><p className="eyebrow">START WITH WHAT NEEDS WORK</p><h2>{final.title}</h2><Paragraphs items={final.paragraphs.filter(p=>!p.startsWith('**'))} slug={slug}/><a className="button copper" href={inquiryHref(slug)}>{heroCta?.slice(2,-2)}<ArrowUpRight size={17}/></a></section>
 </main><footer className="service-footer"><a href="/" className="footer-brand" aria-label="Relevaint home"><img src="/media/relevaint-logo.png" alt="Relevaint" width="145" height="50"/></a><p>Your business. Improved.</p><a href="/#contact">Let’s talk <ArrowUpRight size={16}/></a></footer></>
}
