import {expect,test} from 'vitest';
import {allContent} from '../../lib/content';
import {contentSchema} from '../../lib/schema';
const investigation=()=>allContent().find(i=>i.id==='square-investigation')!;
test('demonstration is explicitly not peer reviewed',()=>{expect(investigation()).toMatchObject({peerReviewed:false,researchStatus:'demonstration'});expect(()=>contentSchema.parse({...investigation(),peerReviewed:true})).toThrow()});
test('preprint cannot carry a peer-reviewed label',()=>expect(()=>contentSchema.parse({...investigation(),demo:false,inquiryKind:'Peer-Reviewed Publication',researchStatus:'preprint'})).toThrow());
test('publication requires consistent evidence',()=>{expect(()=>contentSchema.parse({...investigation(),demo:false,kind:'publication',peerReviewed:true,inquiryKind:'Peer-Reviewed Publication',researchStatus:'peer_reviewed',evidenceUrl:'https://example.org/verified-record'})).not.toThrow()});
