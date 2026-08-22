# Model Adapter Guidance

The VisualSpec is the source of truth. Model adapters only translate it into provider-friendly wording and parameters.

## GPT Image family

- Be explicit about composition, exact subject, aspect ratio, and text policy.
- Put factual content before aesthetic modifiers.
- Prefer short, concrete negative constraints over long prose.
- For exact Arabic/brand text, prefer deterministic overlays when possible.

## Gemini image models

- Use concise natural-language scene instructions plus clear output constraints.
- State what must remain unchanged when editing or transforming a supplied image.
- Keep critical factual cues enumerated and distinct from decorative style.
- Use bounded retries for transient API failures; do not treat model refusal/invalid input as retryable forever.

## Qwen Image

- Prefer explicit object relations, composition, typography policy, and visual hierarchy.
- For local workflows, keep prompt templates independent of runtime-specific flags or quantization settings.
- Validate Arabic text empirically before relying on model-rendered copy.

## Flux family

- Use strong visual nouns, camera/composition descriptors, material/lighting terms, and a concise negative list.
- Keep semantic facts in the prompt even when style is driven by a LoRA or preset.
- Do not assume text rendering quality; use external typography when exactness matters.

## Ideogram / text-oriented generators

- Use only when generated text is materially useful and the specific model/version has been validated for the target language.
- Supply exact copy and prohibit alternative wording.
- QA every letter and number before publishing.

## Adapter contract

Every adapter should preserve:

- subject facts
- artifact/purpose
- composition
- aspect ratio
- project profile invariants
- text policy
- negative constraints
- QA requirements

Adapters must not silently add logos, claims, UI, product features, people, metrics, or cultural symbols.