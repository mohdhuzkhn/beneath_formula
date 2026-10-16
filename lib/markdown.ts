import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import {visit} from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import katex from 'katex';
export const componentNames=['Definition','Theorem','Proof','Derivation','Intuition','Example','Misconception','HistoricalNote','WhyItMatters','Challenge','Solution','Equation','InteractiveLab','VideoLesson','ReferenceList','FurtherReading','PrerequisiteLinks','Callout'];
type AstNode={type:string;name?:string;value?:string;url?:string;alt?:string;depth?:number;children?:AstNode[];attributes?:{type:string;name?:string;value?:unknown}[]};
export const textOf=(n:AstNode):string=>n.value??n.children?.map(textOf).join('')??'';
export function inspectMarkdown(body:string){
 const tree=unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkMdx).parse(body);
 const slugger=new GithubSlugger();const headings:{id:string;text:string}[]=[];const links:string[]=[];const ids:string[]=[];
 visit(tree,node=>{const n=node as AstNode;
 if(['mdxjsEsm','mdxFlowExpression','mdxTextExpression','html'].includes(n.type))throw new Error('MDX imports, exports, expressions and raw HTML are not permitted');
 if(n.type==='mdxJsxFlowElement'||n.type==='mdxJsxTextElement'){
 if(!n.name||!componentNames.includes(n.name))throw new Error(`Unapproved MDX component: ${n.name}`);
 for(const a of n.attributes??[]){if(a.type!=='mdxJsxAttribute'||!['id','title'].includes(a.name??'')||typeof a.value!=='string')throw new Error('Only literal id/title component attributes are allowed');if(a.name==='id'){if(!/^[a-z][a-z0-9-]*$/.test(a.value))throw new Error('Invalid component anchor');ids.push(a.value)}}
 }
 if(n.type==='heading'){const title=textOf(n);const id=slugger.slug(title);headings.push({id,text:title});ids.push(id)}
 if(n.type==='link'||n.type==='definition'||n.type==='image'){if(n.url){if(!/^(https:\/\/|\/(?!\/)|#|mailto:)/.test(n.url))throw new Error(`Unsafe URL: ${n.url}`);links.push(n.url)}if(n.type==='image'&&!n.alt?.trim())throw new Error('Images require descriptive alt text')}
 if(n.type==='math'||n.type==='inlineMath')katex.renderToString(n.value??'',{throwOnError:true,trust:false,strict:'error'});
 });
 if(new Set(ids).size!==ids.length)throw new Error('Duplicate content anchor');
 return {headings,links,ids};
}
