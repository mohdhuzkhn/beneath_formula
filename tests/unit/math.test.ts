import {expect,test} from 'vitest';
import {secant,derivative} from '../../lib/math';
test.each([-2,-1,0,1,2])('square analytic baseline at %s',x=>{for(const h of [-2,-.1,-.001,.001,.1,2])expect(secant('square',x,h)).toBeCloseTo(2*x+h,12)});
test('constant has zero slopes',()=>{expect(secant('constant',1,.01)).toBe(0);expect(derivative('constant',1)).toBe(0)});
test('cusp has differing one-sided slopes and no derivative',()=>{expect(secant('absolute',0,.001)).toBe(1);expect(secant('absolute',0,-.001)).toBe(-1);expect(derivative('absolute',0)).toBeNull()});
test('absolute value crossing cusp',()=>expect(secant('absolute',-.5,1)).toBe(0));
test.each([0,NaN,Infinity,.00001,3])('rejects unsafe step %s',h=>expect(()=>secant('square',0,h)).toThrow());
