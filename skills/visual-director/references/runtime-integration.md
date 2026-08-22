# Runtime Integration Contract

The agent skill and a production image pipeline solve related but different problems. Keep one conceptual contract, but do not make a production request path parse agent Markdown at runtime.

## Canonical responsibilities

The shared Visual Director skill owns:

- routing semantics and vocabulary
- generic Arabic/RTL guidance
- model-adapter principles
- project profile intent
- prompt composition order
- visual QA expectations

A production application should consume these ideas through a typed local runtime implementation or a generated artifact derived from a structured source.

## Recommended runtime shape

```text
content facts
  -> VisualIntent
  -> deterministic router
  -> project profile
  -> VisualSpec
  -> prompt compiler
  -> model adapter
  -> image provider
  -> visual QA
  -> deterministic branding/text overlay
```

Do not put network calls, storage, billing, or publishing decisions inside the router or prompt compiler. Keep those functions pure and testable.

## Versioning

Record enough metadata to reproduce and compare generations:

- `visualSpecVersion`
- `profileVersion`
- `promptVersion`
- image provider/model
- aspect ratio
- selected scene/style/composition
- generation timestamp
- QA result when available

When a project already has a prompt or asset ledger, reuse it rather than creating a second disconnected history.

## Safe rollout

For an existing production pipeline:

1. keep the old prompt builder as a factual-input layer or fallback;
2. introduce the router and compiler behind the existing generation boundary;
3. preserve budget guards, retries, storage, branding, and approval behavior;
4. add unit tests for routing and prompt compilation;
5. compare old vs new prompts/images on a bounded sample before widening the rollout;
6. keep rollback simple: the generation boundary should be able to return to the legacy prompt path without schema destruction.

## Project profiles

Project-specific profiles belong at the boundary between shared visual semantics and the product runtime. A profile may tighten rules but must not silently weaken safety, factuality, licensing, accessibility, or curriculum constraints.

Examples:

- Rafad fixes editorial/news invariants while allowing scene and composition to vary by story.
- TopGoal fixes age, pedagogy, licensing, and cognitive-load constraints while allowing educational asset types to vary by activity.

## Observability

Log the selected VisualSpec separately from the final provider prompt when practical. This distinguishes three classes of failure:

1. routing failure — wrong artifact/scene/composition selected;
2. prompt compilation failure — correct spec translated poorly;
3. provider rendering failure — prompt/spec were correct but image output was poor.

That separation is required for useful A/B tests and future model swaps.

## Bounded self-healing

Visual QA may trigger regeneration only for fixable issues and only under a strict attempt cap. Cost limits and human-review rules belong to the host application. Never let the skill create an unbounded image-generation loop.
