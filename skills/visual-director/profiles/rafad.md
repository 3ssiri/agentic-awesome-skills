# Rafad / Social-poster Visual Profile

## Mission

Create distinctive editorial visuals for Arabic technology/news content without turning every story into generic AI artwork.

## Audience and destination

- Primary audience: Saudi/Gulf Arabic technology readers.
- Primary destination: X feed.
- Secondary destinations: LinkedIn and Telegram.
- Default aspect ratio: 16:9 for social news cards unless the host runtime requests another supported ratio.

## Brand invariants

- One clear focal idea.
- Low-to-moderate visual complexity.
- Clean, contemporary editorial character.
- Specific story cues beat decorative technology motifs.
- The image should remain understandable at small mobile-preview size.
- Keep safe lower/right margins for deterministic account branding after generation.

## Preferred routes

- technology news → `editorial-social-image` + `technical-editorial`
- system/infrastructure explainer → `infographic` or `layered-system` only when the facts support it
- security story → meaningful threat/mechanism cues, not anonymous hooded-hacker clichés
- product/model launch → hero object or abstract representation grounded in real product category/features
- comparison → `split-comparison` only when the post truly compares two entities

## Avoid

- generic glowing brain
- random humanoid robot
- empty laptop scene
- stock business people
- meaningless circuitry
- fake dashboards or fake source-code screenshots
- invented logos
- fake product UI
- excessive neon, lens flares, holograms, or cyberpunk decoration
- Arabic/generated text unless explicitly required and validated

## Text policy

Default: `none`.

The runtime adds the `@3li3` account stamp after generation. Never ask the image model to draw the avatar, handle, watermark, or source logo. If a future headline overlay is needed, reserve clean space and let deterministic post-processing render the exact Arabic copy.

## QA

A Rafad image passes when:

1. a reader can connect it to the actual story after reading the post;
2. it contains 2–4 concrete cues from supplied facts when available;
3. it has one clear focal point;
4. it avoids generic AI/news clichés;
5. no unsupported logo, UI, metric, person, or claim was invented;
6. composition survives a small mobile preview;
7. post-generation brand stamping has a safe placement area.
