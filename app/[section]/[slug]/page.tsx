import {PathSteps} from '../../../components/PathSteps';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {published,route,readingTime} from '../../../lib/content';
import {inspectMarkdown} from '../../../lib/markdown';
import {labels,sections} from '../../../lib/taxonomy';
import {site} from '../../../lib/site';
import {Breadcrumbs,Heading} from '../../../components/Editorial';
import {Mdx} from '../../../components/Mdx';
import {CopyLink} from '../../../components/CopyLink';
export const dynamicParams=false;
export function generateStaticParams(){return published().map(i=>({section:sections[i.kind],slug:i.slug}))}
export async function generateMetadata({params}:{params:Promise<{section:string;slug:string}>}){const {section,slug}=await params;const item=published().find(i=>route(i)===`/${section}/${slug}`);return item?{title:`${item.title} | ${site.name}`,description:item.summary,alternates:{canonical:route(item)}}:{title:'Not found'}}
export default async function Detail({params}:{params:Promise<{section:string;slug:string}>}){const {section,slug}=await params;const all=published();const item=all.find(i=>route(i)===`/${section}/${slug}`);if(!item)notFound();const {headings}=inspectMarkdown(item.body);
 return <><Breadcrumbs title={item.title} section="Explore" href="/explore"/><Heading eyebrow={labels[item.kind]} title={item.title} summary={item.summary}/><p className="byline">{site.author} · {item.publishedAt} · {readingTime(item.body)} min estimated reading{item.updatedAt?` · Updated ${item.updatedAt}`:''}</p><div>{[...item.levels,...item.depths].map(t=><span className="chip" key={t}>{t}</span>)}</div>{item.demo&&<p className="notice">Engineering demonstration · AI-assisted sample, awaiting author editorial review. Not a research publication.</p>}<div className="article-layout"><nav className="toc" aria-label="On this page"><strong>On this page</strong><ol>{headings.map(h=><li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol><CopyLink/></nav><article className="prose"><aside className="callout"><div className="callout-title">Why this matters</div><p>{item.whyItMatters}</p></aside><Mdx source={item.body}/><PathSteps item={item}/>{item.references.length>0&&<section aria-label="References"><h2>References</h2><ol>{item.references.map(r=><li id={`ref-${r.id}`} key={r.id}>{r.authors.join(', ')}{r.year?` (${r.year})`:''}. <a href={r.url||`https://doi.org/${r.doi}`}>{r.title}</a>{r.publisher?`. ${r.publisher}`:''}{r.pages?`, ${r.pages}`:''}</li>)}</ol></section>}<section className="connections"><h2>Connected ideas</h2><ul>{item.prerequisites.map(id=>{const target=all.find(i=>i.id===id)!;return <li key={id}>Prerequisite: <Link href={route(target)}>{target.title}</Link></li>})}{item.connections.map(c=>{const target=all.find(i=>i.id===c.target)!;return <li key={c.target}>{c.type.replaceAll('_',' ')}: <Link href={route(target)}>{target.title}</Link></li>})}{all.filter(i=>i.prerequisites.includes(item.id)).map(i=><li key={i.id}>Learn next: <Link href={route(i)}>{i.title}</Link></li>)}</ul><Link href="/explore">Return to all ideas →</Link></section></article></div></>;
}
