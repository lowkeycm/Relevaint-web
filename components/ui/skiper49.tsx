"use client";

import {motion,useReducedMotion} from 'framer-motion';
import {ChevronLeft,ChevronRight,Play} from 'lucide-react';
import {useRef,useState} from 'react';
import type {Swiper as SwiperInstance} from 'swiper';
import {A11y,EffectCoverflow,Pagination} from 'swiper/modules';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {cn} from '@/lib/utils';

/** Adapted from Skiper 49 / Carousel_003 by @gurvinder-singh02.
 * User-supplied free component; attribution retained in the rendered gallery.
 * https://gxuri.me — Swiper coverflow, adapted for Relevaint's own films.
 */
export type CoverflowItem={src:string;alt:string;title:string;duration:string};
export function Carousel_003({images,className,onSelect,onActiveChange,showPagination=true,showNavigation=true}:{images:CoverflowItem[];className?:string;onSelect:(index:number,trigger:HTMLButtonElement)=>void;onActiveChange?:(index:number)=>void;showPagination?:boolean;showNavigation?:boolean}){
 const swiper=useRef<SwiperInstance|null>(null);const reduced=useReducedMotion();const [active,setActive]=useState(Math.min(1,images.length-1));
 return <motion.div initial={false} className={cn('film-coverflow',className)} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();swiper.current?.slidePrev();}if(e.key==='ArrowRight'){e.preventDefault();swiper.current?.slideNext();}}} role="region" aria-label="Commercial film carousel" aria-roledescription="carousel">
  <Swiper modules={[EffectCoverflow,Pagination,A11y]} onSwiper={s=>{swiper.current=s;}} onSlideChange={s=>{setActive(s.realIndex);onActiveChange?.(s.realIndex);}} initialSlide={Math.min(1,images.length-1)} effect="coverflow" grabCursor slidesPerView="auto" centeredSlides rewind speed={reduced?0:300} threshold={8} touchAngle={35} preventClicks preventClicksPropagation coverflowEffect={{rotate:reduced?0:38,stretch:reduced?0:-22,depth:reduced?0:160,modifier:1,slideShadows:!reduced}} pagination={showPagination?{clickable:true}:false} a11y={{prevSlideMessage:'Previous film',nextSlideMessage:'Next film',paginationBulletMessage:'Show film {{index}}'}} className="Carousal_003">
   {images.map((item,index)=><SwiperSlide key={item.title}><button className="film-cover-card" onClick={e=>{if(swiper.current?.allowClick!==false)onSelect(index,e.currentTarget);}} aria-label={`Watch ${item.title}`}><div className="film-cover-image"><img src={item.src} alt={item.alt} width="1280" height="720" loading="lazy" draggable={false}/><span className="film-cover-play"><Play fill="currentColor" size={20}/></span><span className="film-duration">{item.duration}</span></div><div className="film-cover-title"><strong>{item.title}</strong><span>Watch film <Play size={12}/></span></div></button></SwiperSlide>)}
  </Swiper>
  {showNavigation&&<div className="film-cover-controls"><button onClick={()=>swiper.current?.slidePrev()} aria-label="Previous film"><ChevronLeft size={22}/></button><span aria-live="polite">{images[active]?.title}<small>{active+1} / {images.length}</small></span><button onClick={()=>swiper.current?.slideNext()} aria-label="Next film"><ChevronRight size={22}/></button></div>}
 </motion.div>;
}
export const Skiper49=Carousel_003;
export default Skiper49;
