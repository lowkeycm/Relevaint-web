import {spawn} from 'node:child_process';
// Accept the supervised preview's Vite-style flags without passing them to Next.
const args=process.argv.slice(2);const portIndex=args.indexOf('--port');
const port=portIndex>=0?args[portIndex+1]:(process.env.PORT||'4173');
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','0.0.0.0','--port',port],{stdio:'inherit'});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
