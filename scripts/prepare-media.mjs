import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(readFileSync(new URL('../assets/video/manifest.json',import.meta.url),'utf8'));
for(const asset of manifest){
 const data=Buffer.concat(asset.parts.map(part=>readFileSync(part)));
 if(createHash('sha256').update(data).digest('hex')!==asset.sha256)throw new Error(`Media integrity check failed: ${asset.output}`);
 mkdirSync(dirname(asset.output),{recursive:true});writeFileSync(asset.output,data);
}
