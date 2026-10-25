import { HeroPlot } from "../components/HeroPlot";
import Link from "../components/Link";
import { published } from "../lib/content";
import { Card } from "../components/Card";
import { FollowButton } from "../components/Engagement";
export default function Home() {
  const items = published();
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">MATHEMATICS, FROM FIRST PRINCIPLES</p>
          <h1>
            There is a story
            <br />
            beneath every
            <br />
            <em>formula.</em>
          </h1>
          <p className="lede">
            Go beyond remembering the answer. Explore the ideas, proofs and
            connections that make mathematics make sense.
          </p>
          <div className="actions">
            <Link prefetch={false} className="button" href="/explore">
              Explore the ideas <span aria-hidden="true">↗</span>
            </Link>
            <Link prefetch={false} href="/paths/second-year-calculus">
              Start with calculus →
            </Link>
          </div>
        </div>
        <figure className="plot-art">
          <p className="eyebrow">THE QUESTION BEHIND THE EQUATION · 01</p>
          <HeroPlot />
          <figcaption>
            Two points. One limiting idea.{" "}
            <Link prefetch={false} href="/lab/secant-to-tangent">
              Move the points yourself ↗
            </Link>
          </figcaption>
        </figure>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BEGIN WITH A QUESTION</p>
            <h2>A first look at calculus</h2>
          </div>
          <Link prefetch={false} href="/explore">
            All ideas ↗
          </Link>
        </div>
        <div className="grid">
          {items
            .filter((i) =>
              ["limits", "derivative", "square-proof"].includes(i.id),
            )
            .map((i) => (
              <Card item={i} key={i.id} />
            ))}
        </div>
      </section>
      <section className="feature-band">
        <div>
          <p className="eyebrow">A PATH, NOT A PILE OF NOTES</p>
          <h2>
            Build one idea
            <br />
            on another.
          </h2>
          <p>
            Follow prerequisites, work through a proof, then put the idea to the
            test.
          </p>
          <Link prefetch={false} href="/paths">
            Find your learning path →
          </Link>
        </div>
        <div>
          <p className="eyebrow">FROM MATHEMATICS TO MODELS</p>
          <h2>
            Where calculus
            <br />
            meets computation.
          </h2>
          <p>
            Trace the foundations of change toward gradients and optimization,
            with clear boundaries around what is ready to explore.
          </p>
          <Link prefetch={false} href="/math-to-ai">
            Explore the bridge →
          </Link>
        </div>
      </section>
      <FollowButton />
      <section className="section">
        <div className="section-heading">
          <h2>Questions worth investigating</h2>
          <Link prefetch={false} href="/inquiry">
            Inquiry & writing ↗
          </Link>
        </div>
        <p className="lede">
          Proofs, experiments and reading notes, with methods and limitations in
          view. Start with a labeled reproducible demonstration.
        </p>
        <Link prefetch={false} href="/inquiry/secant-error-study">
          How quickly does a secant slope converge? →
        </Link>
      </section>
    </>
  );
}
