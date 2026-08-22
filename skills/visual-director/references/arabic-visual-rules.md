# Arabic and RTL Visual Rules

Apply these rules whenever Arabic text, an Arabic shell, or mixed Arabic/English content appears.

## Default strategy

Prefer separating image generation from critical typography:

1. generate the visual with `textPolicy: none` when possible;
2. add exact Arabic headline, handle, labels, or branding in deterministic post-processing;
3. keep a text-safe region in the composition when an overlay will be added later.

## If the image model must render Arabic

- Supply the exact Arabic string verbatim.
- Keep text short; one headline or a few labels are safer than paragraphs.
- State `right-to-left Arabic typography` explicitly.
- Do not ask the model to translate, rewrite, decorate, or improvise the supplied Arabic.
- Avoid pseudo-Arabic glyphs, mirrored letters, disconnected letters, reversed punctuation, and mixed-direction corruption.
- Use a clean Arabic sans or editorial Arabic typography direction unless a brand profile specifies otherwise.
- Keep enough contrast and whitespace around Arabic copy.

## Mixed Arabic / English

- Treat Arabic UI/shell text as RTL.
- Treat English learning content, code, URLs, model names, and technical tokens as LTR islands.
- Do not mirror Latin product names.
- Do not mirror numbers by default.
- Mirror directional icons only when their semantic direction changes in RTL.
- Keep mixed strings visually isolated when possible instead of forcing complex bidi text into one generated label.

## Saudi/Gulf context

- Use regional cues only when relevant to the source material or project profile.
- Do not add flags, landmarks, traditional clothing, desert imagery, or national symbols merely because the output language is Arabic.
- Avoid stereotypes and decorative cultural cues with no semantic purpose.

## Social/editorial images

- For Arabic technology/news images, prefer no generated headline when the publishing pipeline can overlay exact text later.
- Design for small mobile previews: one focal idea, strong silhouette, low clutter.
- Leave safe margins for platform cropping and post-generation branding.

## Educational images

- The picture should communicate the target concept without requiring Arabic text inside the asset.
- If Arabic support text is needed, keep it outside the generated image when the host application can render HTML text accessibly.
- Do not bake answer keys, hints, or accidental labels into activity images.

## QA checklist

- Arabic text reads in the correct direction.
- Letter joining is intact.
- Punctuation and numbers are in the intended order.
- English/code/product-name islands remain LTR.
- No invented or malformed Arabic copy appears elsewhere in the image.
- Critical information is not encoded only inside generated text.
