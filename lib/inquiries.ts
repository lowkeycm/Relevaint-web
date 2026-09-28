import 'server-only';
export function inquiriesConfigured(){return Boolean(process.env.INQUIRY_INGRESS_URL&&process.env.INQUIRY_INGRESS_TOKEN);}
export type Inquiry={id:string;name:string;email:string;company:string;service:string;message:string};
export async function saveInquiry(value:Inquiry):Promise<'saved'|'rate_limited'>{
 const url=process.env.INQUIRY_INGRESS_URL;const key=process.env.INQUIRY_INGRESS_TOKEN;
 if(!url||!key)throw new Error('Inquiry storage is not configured');
 const response=await fetch(url,{method:'POST',headers:{'x-relevaint-token':key,'Content-Type':'application/json'},body:JSON.stringify(value),cache:'no-store',signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw new Error('Inquiry storage request failed');
 const result=await response.json();
 if(result!=='saved'&&result!=='rate_limited')throw new Error('Unexpected inquiry response');
 return result;
}
