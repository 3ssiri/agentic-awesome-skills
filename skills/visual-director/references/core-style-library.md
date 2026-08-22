# Core Visual Taxonomy

This is a compact, model-neutral routing taxonomy adapted from the category/style/scene idea in `freestylefly/awesome-gpt-image-2`.

## Artifact categories

- `editorial-social-image`: news, announcements, explainers for feeds.
- `infographic`: structured facts, comparisons, systems, timelines.
- `educational-illustration`: vocabulary, concepts, stories, activity support.
- `ui-concept`: product/interface exploration only; never imply shipped features.
- `product-visual`: isolated product, launch visual, packaging, studio scene.
- `brand-visual`: campaign/key visual within an explicit brand profile.
- `photo-scene`: realistic or editorial photography direction.
- `character`: consistent person/mascot/creature design.
- `scene-illustration`: environment-led illustration or narrative scene.
- `document-visual`: covers, diagrams, report illustrations.

## Style families

- `technical-editorial`: clean, specific, restrained technology editorial art.
- `flat-editorial`: simple shapes, quiet surfaces, minimal depth.
- `cinematic-realism`: photographic lighting, realistic materials, deliberate depth.
- `soft-3d`: rounded forms, studio lighting, controlled reflections.
- `isometric-technical`: precise geometry, layered systems, diagram-like depth.
- `clear-friendly-illustration`: readable educational illustration with low clutter.
- `editorial-collage`: controlled cut-paper/photo/graphic composition.
- `diagrammatic`: information-first visual hierarchy, labels only when allowed.
- `premium-minimal`: sparse composition, material detail, strong whitespace.
- `narrative-illustration`: story-led scene with clear characters/actions.

## Scene/domain tags

- `developer-tools`
- `ai-systems`
- `cybersecurity`
- `cloud-infrastructure`
- `data-analytics`
- `education`
- `classroom`
- `everyday-life`
- `commerce`
- `productivity`
- `social-media`
- `travel`
- `food`
- `history`
- `science`
- `story`

## Routing rules

1. Pick artifact first. Do not let a style name substitute for the output type.
2. Pick purpose/use case second.
3. Apply the project profile before aesthetic preferences.
4. Pick style only after the semantic job of the image is clear.
5. Pick scene/domain tags to make the prompt concrete.
6. Prefer one dominant composition idea and 2–4 factual visual cues.

## Composition patterns

- `single-focal-subject`: one dominant subject, supporting cues secondary.
- `split-comparison`: two balanced sides for explicit comparisons.
- `layered-system`: system/components arranged in depth or tiers.
- `journey-path`: ordered progression or learning path.
- `card-grid`: repeated visual units; use carefully to avoid fake UI.
- `hero-plus-context`: primary object/person plus meaningful environment.
- `timeline`: chronological sequence; labels should be deterministic when exactness matters.
- `map-network`: nodes/relationships; avoid illegible tiny labels.

## Text policies

- `none`: safest default for social/editorial and educational image assets.
- `exact-short`: only exact supplied text, preferably under 8 words.
- `labels`: few short labels with explicit direction and placement.
- `document-heavy`: only with models/workflows proven for text rendering; otherwise render text separately.

## Global anti-patterns

Avoid unless directly required by the subject:

- generic glowing AI brain
- random humanoid robot
- meaningless circuitry
- empty laptop-on-desk stock scene
- fake dashboards or fake product UI
- invented logos
- tiny unreadable labels
- excessive neon/glow
- decorative clutter that competes with the message
- stock-photo business teams with no story relevance
