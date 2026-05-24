# Design system — yourname.dev

**Aesthetic:** Papery warmth + terminal precision.
Lora serif for all prose and headings. JetBrains Mono for all UI chrome, chips, labels, dates. The two typefaces do characterisation work — they signal which mode (human/intellectual vs technical/precise) any given piece of content lives in.

---

## Colour palette

### Paper tones — backgrounds

| Token | Hex | Use |
|---|---|---|
| `paper.DEFAULT` | `#f5f0e8` | Main page background |
| `paper.dark` | `#ece6d8` | Nav bar, secondary surfaces |
| `paper.darker` | `#e0d9cd` | Hover states on paper surfaces |
| `rule` | `#d4cec4` | All borders, horizontal rules, dividers |

### Ink tones — text

| Token | Hex | Use |
|---|---|---|
| `ink.DEFAULT` | `#1a1814` | Primary text, headings |
| `ink.2` | `#4a4640` | Body copy, secondary text |
| `ink.3` | `#8a847a` | Muted labels, dates, metadata |
| `ink.4` | `#c4beb4` | Placeholder text, very muted elements |

### Accent — teal (infra / k8s)

| Token | Hex | Use |
|---|---|---|
| `teal.DEFAULT` | `#2a7a5e` | Labels, links, hover states |
| `teal.light` | `#d4ede5` | Pill / chip backgrounds |
| `teal.dark` | `#1d5a45` | Dark mode primary |
| `teal.dark-light` | `#0d2e24` | Dark mode pill backgrounds |

### Accent — purple (philosophy / academic)

| Token | Hex | Use |
|---|---|---|
| `purple.DEFAULT` | `#5a4a8a` | Labels, thesis pill |
| `purple.light` | `#e8e4f4` | Pill backgrounds |
| `purple.dark` | `#7a6ab0` | Dark mode primary |
| `purple.dark-light` | `#1e1830` | Dark mode pill backgrounds |

### Dark mode surfaces

| Token | Hex | Use |
|---|---|---|
| `dark.bg` | `#181612` | Page background |
| `dark.surface` | `#221f1a` | Nav, code blocks, secondary surfaces |
| `dark.border` | `#38342e` | All borders in dark mode |
| `dark.ink` | `#e8e2d8` | Primary text |
| `dark.ink-2` | `#b0a898` | Secondary text |
| `dark.ink-3` | `#706860` | Muted text |

---

## Typography

### Typefaces

| Role | Family | Weights | Used for |
|---|---|---|---|
| Serif | Lora | 400, 400 italic, 600 | Hero name, body copy, post titles, project descriptions, about prose, blockquotes |
| Mono | JetBrains Mono | 400, 500 | Nav, section labels, chips, pills, dates, skill tags, project names, `code` inline |
| Sans | Inter / system-ui | 400 | Fallback only; exp-role text on about page |

Install via npm:
```
npm install @fontsource/lora @fontsource/jetbrains-mono
```

### Type scale

| Token | Size | Line height | Letter spacing | Use |
|---|---|---|---|---|
| `text-hero` | 38px | 1.15 | -0.02em | Homepage H1 |
| `text-hero-sm` | 28px | 1.2 | -0.02em | Mobile hero / section heads |
| `text-lede` | 18px | 1.7 | 0 | About lede (italic) |
| `text-body` | 15px | 1.8 | 0 | About body, prose content |
| `text-body-sm` | 14px | 1.75 | 0 | Post titles, project descriptions |
| `text-ui` | 13px | 1.5 | 0 | Nav links, exp roles |
| `text-label` | 11px | 1 | 0.08em | Dates, section label text, mono UI |
| `text-chip` | 10px | 1 | 0.06em | Stack chips, rule-label text |

### Type rules

- **Never mix serif and mono in the same sentence.** Post titles → serif. Project names → mono. They operate in different registers.
- Hero name uses `font-semibold` (600). Everything else uses 400.
- Italic is used intentionally: hero sub-line, about lede, blockquotes, thesis title inline. Don't add italic elsewhere.
- Headings inside blog prose: serif, semibold, sized per scale (h1→2xl, h2→xl, h3→lg).

---

## Spacing

Base unit: 4px. Column content max-width: 640px (`max-w-content`).

| Context | Value |
|---|---|
| Column horizontal padding | `px-9` (36px) |
| Column vertical padding | `py-11` (44px) |
| Nav height | 52px fixed |
| Section gap | `mt-10` (40px) |
| Post item vertical padding | `py-[11px]` |
| Project item vertical padding | `py-[18px]` |
| Rule-label bottom margin | `mb-4` |
| Hero → first section | `mb-11` (44px) |

---

## Components

### Nav bar

```html
<nav class="site-nav">
  <a href="/" class="site-name">
    <span class="nav-prompt">›</span>
    yourname.dev
    <span class="nav-cursor" aria-hidden="true"></span>
  </a>
  <div class="nav-links">
    <a href="/" class="nav-link" aria-current="page">home</a>
    <a href="/writing" class="nav-link">writing</a>
    <a href="/projects" class="nav-link">projects</a>
    <a href="/about" class="nav-link">about</a>
  </div>
</nav>
```

Notes:
- `›` prompt glyph in teal — the only decorative terminal element
- Blinking cursor via `animate-cursor` keyframe (step-end, 1.1s)
- Nav links separated by `border-l border-rule`
- Active link detected via Astro's `aria-current="page"` pattern

### Rule label

```html
<div class="rule-label"><span>section name</span></div>
```

Renders as: `——————— section name ———————————————`

The left side has `flex-[0_0_0px]` so text sits at the left margin; rule only extends right. Used before every major section. Text is mono, uppercase, tracked.

### Post list item

```html
<li class="post-item">
  <a href="/writing/slug" class="post-title">Post title in serif</a>
  <div class="post-meta">
    <span class="pill pill-k">k8s</span>   <!-- or pill-p for philosophy -->
    <span class="post-date">May 2026</span>
  </div>
</li>
```

Pill variants:
- `pill-k` — teal, for infra/k8s/backend posts
- `pill-p` — purple, for philosophy posts
- `pill-t` — purple + medium weight, for thesis entry

### Project list item

```html
<li class="proj-item">
  <div class="flex justify-between items-baseline mb-1.5">
    <a href="https://yourproject.github.io" class="proj-name">project-name</a>
    <a href="https://yourproject.github.io" class="proj-ext">↗ site</a>
  </div>
  <p class="proj-desc">Two sentences. What it does and why you built it.</p>
  <div class="flex gap-1.5 flex-wrap">
    <span class="chip">go</span>
    <span class="chip">kubernetes</span>
  </div>
</li>
```

Project names are mono — immediate visual signal vs serif post titles.

### Chips and pills at a glance

| Class | Font | Shape | Use |
|---|---|---|---|
| `.chip` | mono 10px | rounded-sm, paper-dark bg | Stack tags on projects |
| `.hchip` | mono 10px | rounded-sm, paper-dark bg | Hero tags (neutral) |
| `.hchip-hi` | mono 10px | rounded-sm, teal-light bg | Hero tags (highlighted) |
| `.pill-k` | mono 10px | rounded-sm, teal border | Post category: infra |
| `.pill-p` | mono 10px | rounded-sm, purple border | Post category: philosophy |
| `.pill-t` | mono 10px | rounded-sm, purple border + medium | Thesis entry |
| `.skill-tag` | mono 11px | rounded-sm, paper-dark bg | About page skills |

---

## Content architecture (Astro collections)

Recommended `src/content/config.ts` shape:

```ts
import { z, defineCollection } from 'astro:content'

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    date:        z.coerce.date(),
    category:    z.enum(['k8s', 'philosophy', 'misc']),
    academic:    z.boolean().default(false),  // true = thesis/paper, renders in academic group
    description: z.string().optional(),
    draft:       z.boolean().default(false),
  }),
})

const projects = defineCollection({
  type: 'data',   // YAML/JSON, no markdown body needed
  schema: z.object({
    name:        z.string(),
    description: z.string(),
    url:         z.string().url(),   // GH Pages site
    stack:       z.array(z.string()),
    featured:    z.boolean().default(false),  // show on home page
    order:       z.number().default(99),
  }),
})

export const collections = { writing, projects }
```

Post frontmatter example:
```yaml
---
title: "On Heidegger's tool-being and why it keeps coming up at work"
date: 2026-03-10
category: philosophy
description: "A short note on ready-to-hand, present-at-hand, and what happens when your etcd cluster goes down."
---
```

Project YAML example (`src/content/projects/project-alpha.yaml`):
```yaml
name: project-alpha
description: Two sentences. What it does and why you built it.
url: https://yourname.github.io/project-alpha
stack: [go, kubernetes, ebpf]
featured: true
order: 1
```

---

## Dark mode

Dark mode is toggled via `class="dark"` on `<html>`. A `localStorage` snippet in `BaseLayout.astro` reads preference before first paint to avoid flash.

To add a toggle button:

```astro
<!-- ThemeToggle.astro -->
<button id="theme-toggle" aria-label="Toggle dark mode"
  class="font-mono text-chip text-ink-3 hover:text-teal transition-colors">
  theme
</button>

<script>
  const btn = document.getElementById('theme-toggle')
  btn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  })
</script>
```

Add to nav-links row: `<ThemeToggle />` before closing `</div>`.

---

## Page structure summary

| Page | Route | Layout notes |
|---|---|---|
| Home | `/` | Hero → rule-label + post list (3 items) → rule-label + project list (2 items) |
| Writing | `/writing` | Intro sentence → year groups → academic group |
| Projects | `/projects` | Rule-label → proj-item list (all projects, sorted by `order`) |
| About | `/about` | Lede (italic serif) → body → socials → experience → education → skills |
| Post | `/writing/[slug]` | BaseLayout + prose-content class on article body |

---

## What not to do

- Don't add more than two accent colours. Teal = technical. Purple = intellectual. That's the whole system.
- Don't use card grids with shadows. Lists and dividers only — this site earns its whitespace.
- Don't put any decorative elements beyond the nav prompt glyph and blinking cursor. The warmth comes from the type and colour, not from ornamentation.
- Don't use italic outside of: hero sub-line, about lede, blockquotes, thesis title. Italic is precious here.
- Don't paginate until you have 20+ posts. A long flat list is fine and honest.
- Don't add a sidebar. Max-width column, centred, full stop.
