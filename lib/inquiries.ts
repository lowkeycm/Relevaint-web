import 'server-only';
export function inquiriesConfigured(){return Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_SECRET_KEY);}
export type Inquiry={id:string;name:string;email:string;company:string;service:string;message:string};
export async function saveInquiry(value:Inquiry):Promise<'saved'|'rate_limited'>{
 const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SECRET_KEY;
 if(!url||!key)throw new Error('Inquiry storage is not configured');
 const response=await fetch(`${url.replace(/\/$/,'')}/rest/v1/rpc/submit_relevaint_inquiry`,{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({payload:value}),cache:'no-store',signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw new Error('Inquiry storage request failed');
 const result=await response.json();
 if(result!=='saved'&&result!=='rate_limited')throw new Error('Unexpected inquiry response');
 return result;
}
