# Design specification and wireframes

Warm paper (#f7f6f0), pine ink (#172e29), muted green (#46635a), copper accent (#9c461b), hairline rules. System Georgia headings and system sans UI avoid font network requests. Reading measure 72ch; shell 1200px. Buttons and form controls minimum 44px high. Motion only where useful and disabled under reduced-motion. Mathematical overflow scrolls within its own block.

Home: masthead → two-column question/coordinate illustration → calculus collection → learning paths → inquiry and author footer.
Explore/search: heading → labeled GET filter form → result count/live region → editorial cards → empty state.
Article/inquiry: breadcrumb → taxonomy/title/summary/byline/demo disclosure → TOC sidebar + reading column → citations, corrections, relationships and next steps.
Path: audience/prerequisites/outcomes → numbered sequence → optional branches.
Lab: explanatory introduction → controls → SVG plot → numeric table → limitations → reset.
Lecture: topic header → consent placeholder → player/fallback → timestamps/transcript if supplied → related material.
Teaching/about/contact: honest editorial prose → selected examples → configured contact or unavailable notice.
Mobile: wrapping masthead with disclosure menu; one-column content; horizontally scrollable formulas. 404/error use same shell and recovery links. Theme follows system preference and can be changed locally.

Verification: mobile/tablet/desktop screenshots, keyboard Tab/Enter, focus, no page horizontal overflow, automated axe; manual screen-reader checks remain a distinct release requirement.
