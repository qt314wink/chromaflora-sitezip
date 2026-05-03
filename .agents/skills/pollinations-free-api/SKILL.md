---
name: pollinations-free-api
description: Use Pollinations.ai for completely free AI image generation and text/chat completion with no API key required. Use whenever building image generation features, AI chat, or prompt engineering tools without budget for paid APIs. Covers image URL construction, all model names, text completion endpoint, and JS integration patterns.
---

# Pollinations.ai — Free AI API (No Key Required)

Pollinations.ai provides genuinely free, unlimited image generation and text completion. No registration, no API key, no rate limit (within reasonable use). Works entirely via URL construction — fetch or `<img src>`.

## When to Use

- Building image generation UI without a paid API key
- Prototyping AI-powered creative tools
- Any project where the user has no API budget
- Adding LLM chat/text completion without a key

---

## Image Generation

### URL Pattern

```
https://image.pollinations.ai/prompt/{encoded_prompt}?width=W&height=H&seed=S&model=MODEL&nologo=true
```

All parameters except the prompt are optional.

```javascript
function pollinationsUrl(prompt, { width=1024, height=1024, seed, model='flux', nologo=true } = {}) {
  const base = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt);
  const params = new URLSearchParams({ width, height, nologo });
  if (seed !== undefined) params.set('seed', seed);
  if (model) params.set('model', model);
  return `${base}?${params}`;
}
```

### Available Models

| Model ID | Style | Notes |
|---|---|---|
| `flux` | General purpose, high quality | Default, best starting point |
| `flux-realism` | Photorealistic | Best for portraits, product shots |
| `flux-anime` | Anime/illustrated | Stylized illustration |
| `flux-3d` | 3D rendered look | Objects, environments |
| `any-dark` | Dark, moody aesthetic | Perfect for ChromaFlora |
| `turbo` | Fast generation | Lower quality, instant preview |

### Display in HTML

```javascript
const img = document.createElement('img');
img.src = pollinationsUrl(prompt, { model: 'flux-realism', width: 768, height: 768, seed: 42 });
img.onload = () => container.appendChild(img);
img.onerror = () => showError('Generation failed, try again');
```

Images are generated on first request and cached by the CDN. Same prompt + seed = same image every time.

### Seed Strategy

- `seed: Math.floor(Math.random() * 99999)` — different image each time
- `seed: 42` (fixed) — deterministic/reproducible output
- Expose seed to user so they can re-generate or lock a favorite

---

## Text / Chat Completion

Pollinations also provides a **free OpenAI-compatible chat endpoint**:

```
POST https://text.pollinations.ai/openai
```

```javascript
async function pollinationsChat(messages, { model = 'openai', temperature = 0.7 } = {}) {
  const res = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, temperature })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}
```

Available text models: `openai` (GPT-4o), `mistral`, `llama` — subject to change, `openai` most reliable.

### Simple GET text endpoint

For single-turn prompts:
```
GET https://text.pollinations.ai/{encoded_prompt}
```
Returns plain text. Useful for quick lookups, no JSON parsing needed.

---

## ChromaFlora Integration Notes

- All generated images are saved to `cf_gen_images` in localStorage
- Always expose model selector, seed field, and dimensions to the user
- Include a "Copy Prompt" button so users can take prompts elsewhere
- The `any-dark` model naturally fits the ChromaFlora `--void` aesthetic
- For Reverse Image Engineering, use text completion to analyze/describe visual styles

---

## Error Handling

Pollinations can return a loading placeholder image during generation. Handle with:

```javascript
img.src = pollinationsUrl(prompt, options);
container.innerHTML = '<div class="loading-pulse">Generating…</div>';
img.onload = () => {
  container.innerHTML = '';
  container.appendChild(img);
};
```

Generation typically takes 3–15 seconds depending on model and server load.

---

## Limitations

- No private/hidden images — all generated images are technically public via the CDN URL
- No image editing, inpainting, or img2img (image-to-image) — prompt-to-image only
- Text models may hallucinate or change behavior without notice (free service)
- For production apps with SLA requirements, use a paid API
