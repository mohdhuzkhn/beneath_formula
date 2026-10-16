import fs from 'node:fs';
import {published} from '../lib/content';
import {buildIndex,search} from '../lib/search';
const index=buildIndex(published());fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/search-index.json',JSON.stringify(index));
for(const size of [100,1000]){const sample=Array.from({length:size},(_,i)=>({...index[i%index.length],id:String(i)}));const start=performance.now();for(let i=0;i<100;i++)search(sample,{q:'derivative'});console.log(`${size} records: ${((performance.now()-start)/100).toFixed(2)} ms/query over 100 queries; ${Buffer.byteLength(JSON.stringify(sample))} index bytes`)}
