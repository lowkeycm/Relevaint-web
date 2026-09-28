import {z} from 'zod';
import {saveInquiry} from '@/lib/inquiries';
const allowed=['Websites & landing pages','Video & ad creative','Social content & workflows','Funnels & follow-up','Sales tools & integrations','Connected system','Not sure yet'] as const;
const schema=z.object({id:z.string().uuid(),name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(254),company:z.string().trim().min(2).max(160),service:z.enum(allowed),message:z.string().trim().min(10).max(4000),website:z.string().max(0).optional()});
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Please submit from the Relevaint website.'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json'))return Response.json({error:'Please use the inquiry form with JavaScript enabled, or email contact@relevaint.com.'},{status:415});
 if(Number(request.headers.get('content-length')||0)>20000)return Response.json({error:'Your message is too long.'},{status:413});
 let value;try{const body=await request.text();if(body.length>20000)return Response.json({error:'Your message is too long.'},{status:413});value=schema.safeParse(JSON.parse(body));}catch{return Response.json({error:'Please check the form and try again.'},{status:400});}
 if(!value.success)return Response.json({error:'Please check your name, email, business, and message (at least 10 characters).'},{status:400});
 const v=value.data;try{const result=await saveInquiry({...v,email:v.email.toLowerCase()});if(result==='rate_limited')return Response.json({error:'You’ve sent a few inquiries recently. Please try again in a few minutes, or book a call.'},{status:429});return Response.json({saved:true,id:v.id},{status:201});}catch{console.error('Inquiry storage failed');return Response.json({error:'We couldn’t save your inquiry right now. Your details are still here. Please try again, or email contact@relevaint.com.'},{status:503});}
}
