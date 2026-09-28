// Custom server-to-server authentication: the plaintext token exists only in Vercel.
const expectedDigest = "5760504e2639144996e630e36fa9c986697935bcc0befe64c120ed5e815553c9";
const allowed = new Set(['Websites & landing pages','Video & ad creative','Social content & workflows','Funnels & follow-up','Sales tools & integrations','Connected system','Not sure yet']);
const reply = (value, status = 200) => Response.json(value, {status, headers:{'Cache-Control':'no-store'}});
async function authorized(request) {
 const token = request.headers.get('x-relevaint-token');
 if (!token || token.length > 256) return false;
 const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)));
 const digest = Array.from(bytes, b => b.toString(16).padStart(2,'0')).join('');
 let difference = 0;
 for (let i = 0; i < expectedDigest.length; i++) difference |= digest.charCodeAt(i) ^ expectedDigest.charCodeAt(i);
 return difference === 0;
}
const textField = (v, min, max) => typeof v === 'string' && v.trim().length >= min && v.length <= max;
Deno.serve(async request => {
 if (!(await authorized(request))) return reply({error:'Unauthorized'},401);
 if (request.method !== 'POST') return reply({error:'Method not allowed'},405);
 if (!request.headers.get('content-type')?.includes('application/json')) return reply({error:'JSON required'},415);
 if (Number(request.headers.get('content-length') || 0) > 20000) return reply({error:'Too large'},413);
 let value;
 try {
  // Bound the streamed body too; callers cannot bypass the limit by omitting Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply({error:'Invalid inquiry'},400);
  let length = 0; const chunks = [];
  while (true) {
   const part = await reader.read(); if (part.done) break;
   length += part.value.length;
   if (length > 20000) { await reader.cancel(); return reply({error:'Too large'},413); }
   chunks.push(part.value);
  }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  value = JSON.parse(new TextDecoder().decode(bytes));
 } catch { return reply({error:'Invalid inquiry'},400); }
 if (!value || typeof value !== 'object' ||
  typeof value.id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value.id) ||
  !textField(value.name,2,120) || !textField(value.email,3,254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) ||
  !textField(value.company,2,160) || !allowed.has(value.service) || !textField(value.message,10,4000) ||
  (value.website !== undefined && value.website !== '')) return reply({error:'Invalid inquiry'},400);
 try {
  const url = Deno.env.get('SUPABASE_URL');
  const modernKey = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}').default;
  const key = modernKey || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('Storage unavailable');
  const headers = {'Content-Type':'application/json', apikey:key};
  if (!modernKey) headers.Authorization = 'Bearer ' + key;
  const result = await fetch(url + '/rest/v1/rpc/submit_relevaint_inquiry', {
   method:'POST', headers, body:JSON.stringify({payload:{
    id:value.id,name:value.name.trim(),email:value.email.trim().toLowerCase(),
    company:value.company.trim(),service:value.service,message:value.message.trim()
   }}), signal:AbortSignal.timeout(8000)
  });
  if (!result.ok) throw new Error('Storage unavailable');
  const outcome = await result.json();
  if (outcome !== 'saved' && outcome !== 'rate_limited') throw new Error('Unexpected response');
  return reply(outcome);
 } catch { return reply({error:'Storage unavailable'},503); }
});
