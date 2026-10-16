import fs from 'node:fs';
const base={authorId:'muhammad-huzaifa',status:'published',demo:true,publishedAt:'2026-10-17',subjects:['calculus/differentiation'],levels:['XII','undergraduate'],depths:['foundation'],tags:['rate-of-change'],whyItMatters:'Understanding change connects slopes, motion and mathematical models.'};
const entries=[
 [{id:'limits',slug:'approaching-a-limit',kind:'concept',title:'Getting closer is a mathematical idea',summary:'Build intuition for a limit before asking what instantaneous change means.',subjects:['calculus/limits'],tags:['limits'],depths:['intuition','foundation']},String.raw`## Why approach a value?

A limit describes the value a function approaches as its input approaches a point. The function need not be defined at that point.

<Example>
For nonzero $h$, the expression $((1+h)^2-1)/h$ equals $2+h$. As $h$ approaches zero, $2+h$ approaches $2$.
</Example>

## A precise distinction

Approaching zero is different from dividing by zero. We simplify only while $h\ne0$, then take the limit. This distinction is the foundation of the derivative.

## Learn next

Use this idea to [define a derivative](/concepts/what-is-a-derivative).
`],
 [{id:'derivative',slug:'what-is-a-derivative',kind:'concept',title:'What is a derivative, really?',summary:'A slope between two points becomes a question about one point. Follow the limit that makes it possible.',prerequisites:['limits'],labIds:['secant-lab'],videoIds:['derivative-lecture'],connections:[{type:'related_to',target:'square-proof'}],depths:['intuition','foundation','rigorous'],aliases:['/concepts/derivative-intuition']},String.raw`## From average to instantaneous change

An average rate compares two values. For a function $f$, the average rate from $x$ to $x+h$ is the slope of a secant line.

$$
\frac{f(x+h)-f(x)}{h},\qquad h\ne0.
$$

<Definition>
The derivative $f'(x)$ is the two-sided limit of this quotient as $h$ approaches zero, when that finite limit exists.
</Definition>

## A square function

For $f(x)=x^2$, expanding the numerator gives $2xh+h^2$. For nonzero $h$, the quotient is $2x+h$, whose limit is $2x$.

<Equation id="derivative-equation">
$$f'(x)=\lim_{h\to0}\frac{(x+h)^2-x^2}{h}=2x.$$
</Equation>

## Where intuition needs care

<Misconception>
A curve does not always have a derivative. At zero, $|x|$ has left-hand slope $-1$ and right-hand slope $1$. Since these differ, there is no two-sided derivative.
</Misconception>

## Try the experiment

Open the [secant-to-tangent lab](/lab/secant-to-tangent), compare both signs of $h$, and then read the [algebraic proof](/derivations/derivative-of-a-square).

The [definition above](#derivative-equation) is a limit, not an instruction to divide by zero.
`],
 [{id:'square-proof',slug:'derivative-of-a-square',kind:'derivation',title:'Why the derivative of x² is 2x',summary:'An algebraic derivation from the definition, with the nonzero-step assumption made explicit.',prerequisites:['derivative'],tags:['proof'],depths:['rigorous']},String.raw`## Claim

<Theorem>
For every real number $x$, the function $f(x)=x^2$ has derivative $f'(x)=2x$.
</Theorem>

## Derivation

<Proof>
For $h\ne0$,

$$\frac{(x+h)^2-x^2}{h}=\frac{2xh+h^2}{h}=2x+h.$$

Taking the limit as $h\to0$ yields $2x$. The cancellation is valid before taking the limit. This proves the claim for each real $x$.
</Proof>

## Check a particular point

At $x=1$, the secant slopes are $2+h$. Positive steps approach 2 from above and negative steps approach 2 from below.
`],
 [{id:'secant-lab',slug:'secant-to-tangent',kind:'lab',title:'A secant becomes a tangent',summary:'Move two points closer. Compare a square, a constant, and a cusp using the same experiment.',componentId:'secant-tangent',learningGoals:['Compare secant and derivative slopes','Distinguish one-sided slopes at a cusp'],accessibilitySummary:'Labeled numeric controls, a textual result and a data table provide the same values as the SVG plot.',parameterRanges:{x:[-2,2],h:[-2,2]},tags:['visualization']},String.raw`## What to look for

Keep $x$ fixed and reduce the magnitude of $h$. The secant uses two points; the tangent uses the derivative at the first point, if that derivative exists.

## Numerical limits

The display uses vetted functions and stable algebraic slope formulas. A changing plot illustrates a limit but is not a proof. At the cusp of $|x|$, compare a positive and a negative step.
`],
 [{id:'calculus-path',slug:'second-year-calculus',kind:'learning_path',title:'Second-year calculus foundations',summary:'A short demonstration pathway from approaching a limit to deriving and exploring a derivative.',audience:'Class XII learners and curious beginners',entryRequirements:['Algebraic expansion','Coordinates and slope'],learningOutcomes:['Explain a limit','Derive the derivative of a square','Recognize a non-differentiable cusp'],orderedContentIds:['limits','derivative','square-proof','secant-lab'],optionalBranches:['square-investigation'],tags:['foundations']},'## A route through the ideas\n\nThis sample sequence demonstrates the platform. It is not a complete syllabus or a claim of board-specific alignment.\n'],
 [{id:'derivative-lecture',slug:'derivative-companion',kind:'lecture',title:'Derivative lecture companion',summary:'A companion page ready for an author-approved lecture, captions and topic timestamps.',videoApproved:false,prerequisites:['derivative']},'## Lecture availability\n\nNo approved video has been supplied. The written explanation and visual experiment remain available while the author selects a lecture.\n'],
 [{id:'square-investigation',slug:'secant-error-study',kind:'investigation',title:'How quickly does a secant slope converge?',summary:'A reproducible demonstration investigating the secant error for a square function.',inquiryKind:'Reproducible Investigation',researchStatus:'demonstration',abstract:'For a square function, the secant slope error equals the step h exactly in real arithmetic.',version:'0.1',methods:'Expand the difference quotient and compare it with the analytic derivative.',limitations:'Only the square function is analyzed. Floating-point arithmetic is not real arithmetic. This is not original research or peer-reviewed work.',peerReviewed:false,disclosures:'AI-assisted engineering demonstration; author editorial review pending.',prerequisites:['square-proof'],tags:['proof','visualization'],revisions:[{date:'2026-10-17',description:'Initial engineering demonstration; not a research publication.'}]},String.raw`## Question

For $f(x)=x^2$, how does the secant slope error depend on $h$?

## Exact result

The secant slope is $2x+h$, so subtracting the derivative $2x$ leaves $h$. Thus the absolute error is $|h|$ for every nonzero real step.

## Reproduce

This Python fragment computes the stable algebraic quotient at $x=1$.

~~~python
x = 1.0
for h in [1.0, 0.1, 0.01, -0.01]:
    secant = 2 * x + h
    print(h, secant, abs(secant - 2 * x))
~~~

## Interpretation

Halving the step halves the exact absolute error. This calculation concerns one function; it does not establish a universal convergence rate.
`.replaceAll('\\`','`')],
 [{id:'draft-gradient',slug:'gradient-notes',kind:'concept',status:'draft',title:'Gradient notes draft',summary:'Unpublished fixture that must never enter public routes or search.',tags:['optimization']},'## Unpublished\n\nPrivate-draft-sentinel-93b7.\n']
];
fs.mkdirSync('content',{recursive:true});
for(const [meta,body] of entries){const file=`content/${meta.id}.mdx`;if(fs.existsSync(file))continue;fs.writeFileSync(file,`---\n${JSON.stringify({...base,...meta},null,2)}\n---\n\n${body}`);}

