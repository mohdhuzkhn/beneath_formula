import fs from 'node:fs';
import path from 'node:path';
import {allContent,route} from './content';
import {inspectMarkdown} from './markdown';
export const staticRoutes=['/','/explore','/paths','/lab','/math-to-ai','/inquiry','/lectures','/about','/teaching','/search','/contact','/privacy','/terms','/copyright'];
export function validateContent(){const items=allContent();const publicRoutes=new Set([...staticRoutes,...items.filter(i=>i.status==='published').flatMap(i=>[route(i),...i.aliases])]);
 const inspected=new Map(items.map(i=>[route(i),inspectMarkdown(i.body)]));
 for(const item of items){const own=inspected.get(route(item))!;for(const link of own.links){if(link.startsWith('https:')||link.startsWith('mailto:'))continue;const [target,hash]=link.split('#');const targetPath=target.split('?')[0]||route(item);if(targetPath.startsWith('/images/')){const asset=path.resolve('public',targetPath.slice(1));if(!asset.startsWith(path.resolve('public')+path.sep)||!fs.existsSync(asset))throw new Error(`Missing asset ${link}`);continue;}
 if(!publicRoutes.has(targetPath)&&targetPath!==route(item))throw new Error(`Broken internal link: ${item.id} → ${link}`);
 if(hash){const targetItem=items.find(i=>route(i)===targetPath);const anchors=[...(inspected.get(targetPath)?.ids??[]),...(targetItem?.references.map(r=>`ref-${r.id}`)??[])];if(!anchors.includes(hash))throw new Error(`Missing anchor: ${link}`)}
 }}return items;
}
