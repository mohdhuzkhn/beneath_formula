import Link from 'next/link';
import type {Article} from '../lib/schema';
import {route} from '../lib/content';
import {labels} from '../lib/taxonomy';
export function Card({item}:{item:Article}){return <article className="card"><p className="eyebrow">{labels[item.kind]}{item.demo?' · Demonstration':''}</p><h2><Link href={route(item)}>{item.title}</Link></h2><p>{item.summary}</p><div>{item.levels.map(l=><span className="chip" key={l}>{l}</span>)}</div><Link className="card-link" href={route(item)}>Explore the idea <span aria-hidden="true">↗</span></Link></article>}
