export const JOURNEY_STOPS = [0, .18, .36, .54, .72, 1] as const;
export function journeyStage(p:number){return p>=.82?5:Math.min(4,Math.max(0,Math.floor((p+.09)/.18)));}
// Spatial interpolation only: a given scroll position always produces this pose.
// No time-based easing, no queued camera target, no post-scroll catch-up.
export function journeyPose(progress:number,mobile:boolean,aspect=0.45){
 const p=Math.max(0,Math.min(1,progress)),travel=Math.min(1,p/.72);
 const x=-7+14*travel,z=-3*Math.sin(travel*Math.PI);
 const pull=Math.max(0,Math.min(1,(p-.72)/.28));
 const blend=(a:number,b:number)=>a+(b-a)*pull;
 const overview=mobile?Math.max(23,31.5/aspect):26;
 return {p,camera:[blend(x+1.5,mobile?9:7),blend(4.2,mobile?overview*.34:9),blend(z+(mobile?11:8.4),overview)] as const,target:[blend(x-(mobile?0:1.05),0),blend(mobile?2:1.85,1.3),blend(z,0)] as const,token:travel*.8+.1+pull*.05};
}
export type JourneyRenderer={render:(progress:number,reduced:boolean)=>void;destroy:()=>void};
export function recordJourneyFrame(el:HTMLElement,p:number,position:readonly number[],token:readonly number[],elapsed:number,reduced:boolean){
 el.dataset.renderedProgress=p.toFixed(4);
 el.dataset.scVerifyState=[...position,...token].map(n=>n.toFixed(3)).join(',');
 el.dataset.scVerifyHold=String(reduced||p===1);
 el.dataset.drawMs=elapsed.toFixed(2);
}
