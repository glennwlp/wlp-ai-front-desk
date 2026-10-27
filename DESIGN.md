---
name: AI Front Desk
description: A calm white counter where the conversation is the hero; ink, soft grey stages, one bright teal.
colors:
  accent: "#1fc8b0"
  accent-hover: "#17b39d"
  accent-ink: "#0f766e"
  accent-wash: "#dcf6f1"
  ink: "#0f0f10"
  ink-raised: "#26262b"
  ink-line: "#34343b"
  paper: "#ffffff"
  stage: "#f4f5f6"
  stage-deep: "#e9ebed"
  rule: "#e4e5e8"
  border-strong: "#c6c8ce"
  graphite: "#4f5059"
  faint: "#686973"
  on-dark-muted: "#b9bac2"
  warning: "#b54708"
  warning-wash: "#fef0c7"
  danger: "#b42318"
typography:
  display:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px, 5.6vw, 80px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(36px, 4.2vw, 56px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.4vw, 34px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title-sm:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "ss01"
  body:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "ss01"
  label:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
  button:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 650
    lineHeight: 1.2
  caption:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  control: "14px"
  ui: "18px"
  card: "20px"
  panel: "24px"
  stage: "32px"
  chip: "999px"
spacing:
  bubble-gap: "10px"
  gutter-mobile: "16px"
  stage-pad-sm: "20px"
  stage-pad-lg: "40px"
  section-sm: "64px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.chip}"
    padding: "14px 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.chip}"
    padding: "14px 28px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.stage}"
    textColor: "{colors.ink}"
  bubble-customer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.ui}"
    padding: "11px 16px"
  bubble-assistant:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ui}"
    padding: "11px 16px"
  stage:
    backgroundColor: "{colors.stage}"
    rounded: "{rounded.stage}"
    padding: "40px"
  card-float:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "48px"
  chip-status:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.chip}"
    padding: "4px 10px"
  chip-neutral:
    backgroundColor: "{colors.stage}"
    textColor: "{colors.graphite}"
    typography: "{typography.caption}"
    rounded: "{rounded.chip}"
    padding: "3px 10px"
  time-slot:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "6px 16px"
    height: "40px"
  time-slot-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  panel-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.stage}"
    padding: "64px"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "8px 16px"
  nav-link-hover:
    backgroundColor: "{colors.stage}"
---

# Design System: AI Front Desk

## Overview

**Creative North Star: "The Open Counter"**

(The name was derived from the direction thesis, "the desk is open: a calm white counter where the conversation itself is the hero". The user did not choose a name.)

The system is a white counter with a conversation laid out on it. The page ground is white paper, type is near-black ink, and product moments sit on soft grey stages with big rounded corners. White chat cards float on those stages under quiet ambient shadows. One bright teal is the only colour, and it marks the actions and confirmations a visitor should notice: the primary pill, a booked date, a "replies instantly" dot. The inspiration, chosen by the user, is chatbot.com's approach: a friendly geometric sans, rounded shapes everywhere, and a mostly black, white and grey palette with one bright accent.

The feel is warm and approachable without being cute. Figtree carries everything. Display type is set heavy (800) and tight, so headlines feel confident while the round letterforms keep them friendly. Density is relaxed: generous section padding, short line lengths, and a lot of white around each stage so the chat stays the subject. Ink is used in two ways. It is the colour of text, and it fills full panels at the moments of commitment: the contact close and the featured plan.

Depth is gentle. Flat grey stages hold white cards that lift slightly off them. Nothing is glossy, gradient-filled or loud; the teal and the conversation do the work.

**Key Characteristics:**
- White paper ground, near-black ink text, soft grey stages: mono plus one accent.
- One bright teal accent; teal fills always carry ink text.
- Figtree only; 800-weight display with negative tracking; sentence case throughout.
- Pills for every action and chip; containers rounded from 14px up to 32px by size.
- White cards float on grey stages under soft, ink-tinted ambient shadows.
- Chat bubbles are the signature: ink for the customer, white for the assistant, each with a tight tail corner.

## Colors

A monochrome counter (paper, ink, cool greys) with a single bright teal that marks action and confirmation.

### Primary
- **Counter Teal** (provisional name; `accent`): the one accent. It fills primary pill buttons, the selected time slot, the booked date chip, the featured-plan badge, numbered step markers that mark completion, status dots and text selection. Its fills always carry ink text, never white.
- **Counter Teal, pressed** (`accent-hover`): the hover state of teal fills. It is not used anywhere else.
- **Deep Counter Teal** (`accent-ink`): teal used as text or as an icon stroke on light surfaces (status lines, "New booking", file icons, checkmarks on white cards, the confirmation message). It is also the light-surface focus ring and the input caret.
- **Teal Wash** (`accent-wash`): the tinted ground for success states. It sits behind the booking confirmation, the "Booked" status chip, the form's success message and the time-slot hover.

### Neutral
- **Counter Ink** (`ink`): all primary text, customer chat bubbles, avatar discs, the secondary button's border and the full-bleed dark panels (contact close, featured plan).
- **Raised Ink** (`ink-raised`): hover on ink surfaces and chips set on ink.
- **Ink Line** (`ink-line`): dividers inside ink panels.
- **Paper** (`paper`): page ground, floating cards, assistant bubbles and field backgrounds.
- **Stage Grey** (`stage`): the soft grey stage behind product scenes, full-width alternating section grounds (sample-quotes section, pricing), resting FAQ items, neutral chips and nav-link hover.
- **Deep Stage Grey** (`stage-deep`): dividers drawn on a stage and the timestamp pill inside a chat.
- **Hairline** (`rule`): borders between rows, the footer top rule, card header separators and the nav's on-scroll underline.
- **Field Edge** (`border-strong`): the resting border of form fields.
- **Graphite** (`graphite`): secondary text such as leads, descriptions and supporting lines. It is also the field hover border.
- **Faint** (`faint`): tertiary text such as captions, placeholders, attributions, "optional" and the copyright line.
- **Muted on Ink** (`on-dark-muted`): secondary text on ink panels.

### Status
- **Amber** (`warning`) on **Amber Wash** (`warning-wash`): the "needs a person" status chip.
- **Alarm Red** (`danger`): form errors and the "No reply" marker in the after-hours scene.

### Named Rules
**The One Teal Rule.** Teal is the only chromatic accent. Bright teal works as a fill, dot, stroke, underline or focus halo on any surface, and its fills always carry ink text. As readable text on a light surface it is always Deep Counter Teal.

**The Quiet Counter Rule.** Paper, ink and greys carry the page. Teal never floods a section ground; it stays on pills, chips, dots and markers so it keeps its signal.

## Typography

**Display Font:** Figtree Variable (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Figtree Variable (with ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** One rounded geometric sans used at every level. Weight 800 with tight negative tracking gives the headlines punch, and the open, round forms keep them friendly. Stylistic set `ss01` is on across the page.

### Hierarchy
- **Display** (800, clamp(40px, 5.6vw, 80px), 1.02, -0.035em): the page's opening headline and the contact close headline (which uses a 42px floor and 1.0 line-height). One per view.
- **Headline** (800, clamp(36px, 4.2vw, 56px), 1.04, -0.03em): section titles, centred with a lead beneath by default.
- **Title** (800, clamp(26px, 2.4vw, 34px), 1.1, -0.025em): titles for feature rows that sit beside a stage.
- **Title Small** (800, 22–24px, 1.2, -0.02em): card, step and plan names.
- **Lead** (400, 19px, 1.55): the paragraph under a headline, in Graphite, about 600px wide.
- **Body** (400, 16–18px, 1.5–1.6): descriptions and answers, in Graphite, kept under about 460–640px.
- **Label** (700, 15px, 1.3): form labels and small bold headers in cards.
- **Button** (650, 17px, 1.2): pill button text.
- **Caption** (600, 12–13px, 1.3–1.4): chips, status lines, timestamps and hints.

### Named Rules
**The One Family Rule.** Figtree is the only typeface. Hierarchy comes from weight (800 against 400) and tracking, never from a second face.

**The Sentence Case Rule.** Every heading, label, chip and button is in sentence case at normal tracking. The system has no uppercase tracked labels.

## Layout

The content column is 1200px inside a 1440px frame. Side gutters scale fluidly as `clamp(20px, (100vw − 1200px) / 2, 120px)` and drop to 16px below 640px. Sections stack vertically on white or Stage Grey grounds, padded 64px on mobile and 112px from 1024px up. Section headers are centred above their content by default. Feature rows use a two-column grid from 1024px, with the stage alternating left and right and gaps of 48–64px. Stages pad 20px on small screens and 40px from 640px up. Bubbles within a thread are spaced 10px apart.

Responsive behaviour:
- Two-column rows collapse to one column below 1024px.
- Overlapping chips and cards that hang off a stage's edge on desktop tuck inside it on mobile, with extra bottom margin.
- The nav keeps to one line from 320px to 768px. Below 1024px the link list becomes a menu, and below 360px the compact Contact pill is hidden.
- The sticky header is 72px tall, and anchors scroll with a 76px offset.

## Elevation & Depth

Depth is a hybrid. Grounds and stages are flat, tonal layers (paper, then Stage Grey), and depth comes from white cards floating over them. Shadows are soft, ambient and tinted with ink. Each one pairs a tight contact shadow with a wide, negative-spread blur, so cards read as resting slightly above the counter rather than hovering.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 1px 2px rgb(15 15 16 / 0.06), 0 16px 40px -12px rgb(15 15 16 / 0.18)`): white cards resting inside a stage (knowledge list, inbox, quote cards).
- **Lift** (`box-shadow: 0 2px 4px rgb(15 15 16 / 0.06), 0 28px 60px -18px rgb(15 15 16 / 0.28)`): cards that overlap a stage edge or a photo (hero chat, booking card, handoff chip), plus the featured plan.
- **Bubble** (`box-shadow: 0 1px 2px rgb(15 15 16 / .06), 0 4px 14px -6px rgb(15 15 16 / .12)`): assistant bubbles, just enough to separate white from grey.

### Named Rules
**The Float-on-Stage Rule.** Shadows belong to white objects placed on a grey stage or overlapping it. Stages, sections and ink panels themselves stay flat.

## Shapes

Everything is rounded, and the radius grows with the size of the object. Fields use 14px, bubbles 18px, floating cards 20px, panels, photos and FAQ items 24px, and stages and the contact panel 32px. Every action and chip is a full pill (999px): buttons, nav links, time slots, status chips and avatar discs. Chat bubbles break the symmetry on purpose. The corner on the speaker's side tightens to 6px (bottom right for the customer, bottom left for the assistant), and quote cards reuse the same 6px tail at the top left. Outlines are 1.5px: ink on secondary pills, time slots and the menu button, and Field Edge on inputs. A dashed teal border marks a date that is not booked yet.

**The Pill Rule.** If it can be pressed, it is a pill.

**The Tail Corner Rule.** A single 6px corner on an otherwise rounded shape means "someone said this". Keep it for speech: bubbles and quotes.

## Components

Warm and approachable: soft, rounded and tactile, with clear states and no ornament.

### Buttons
- **Shape:** full pill (999px), 52px minimum height, 14px 28px padding, Figtree 650 at 17px.
- **Primary:** Counter Teal fill with ink text. Hover shifts to the pressed teal. The primary call to action on every surface.
- **Secondary:** paper fill, 1.5px ink border, ink text. Hover fills with Stage Grey. Sits beside or below the primary.
- **Active:** every button scales to 0.98 on press, eased with `cubic-bezier(.16,1,.3,1)` over 0.18s.
- **Focus:** a 2px Deep Counter Teal outline with a 3px offset (bright teal inside ink panels).
- **Compact (nav):** the same pill at 44px tall and 15–16px text.

### Chips
- **Status:** pill, 12px bold. Teal Wash with Deep Counter Teal for done/booked, Amber Wash with Amber for needs-a-person, Stage Grey with Graphite for neutral or answered.
- **Label chips:** a Stage Grey pill with Graphite caption text, for honest tags like "Sample" and the product name beside the wordmark.
- **Time slots:** a 40px pill with a 1.5px ink border. Hover shows Teal Wash. Selected is a teal fill with a teal border.

### Cards / Containers
- **Stage:** Stage Grey, 32px corners, flat. Holds every product scene.
- **Floating card:** paper, 20px corners, Float or Lift shadow, 14–20px padding, Hairline separators between rows.
- **Plan card:** paper on a Stage Grey section with 28px corners. The featured plan switches to an ink panel with Lift and a teal badge.
- **Ink panel:** Counter Ink, 32px corners, 64px padding on desktop. Text is white with Muted on Ink, numbered markers are teal discs, and a paper form card (24px) sits inside it.

### Inputs / Fields
- **Style:** paper, 1.5px Field Edge border, 14px corners, 48px tall, 16px text, Faint placeholder. Labels sit above in Label weight.
- **Hover:** border darkens to Graphite.
- **Focus:** border turns ink with a 4px soft teal halo (`0 0 0 4px rgb(31 200 176 / .35)`). No outline.
- **Error / Success:** error text in Alarm Red at 14px semibold. Success sits on a Teal Wash strip in Deep Counter Teal. Disabled submit is shown at 0.7 opacity with a wait cursor.

### Navigation
- **Style:** a sticky white bar at 95% opacity with a light backdrop blur. It gets a 1px Hairline underline once the page scrolls.
- **Links:** ink, 16px semibold pills that fill with Stage Grey on hover.
- **Mobile:** a 44px round menu button with a 1.5px ink border opens a full-width list with Hairline rows and a full-width primary pill.

### Chat Thread (signature)
The conversation is the hero component. Customer bubbles are ink with white text and right-aligned. Assistant bubbles are paper with the Bubble shadow and left-aligned. Both have 18px corners with the tail corner, 11px 16px padding, and 14px text inside cards or 16px standalone. A thread can include a centred Deep Stage Grey timestamp pill, time-slot pills, and a Teal Wash confirmation that fades in and un-blurs. The chat card has a header with an ink avatar disc, the business name and a teal "replies instantly" dot. In the interactive demo, the paired booking card's date chip goes from a dashed outline to a teal fill and plays a short pop. Under reduced motion the demo is static.

## Do's and Don'ts

### Do:
- **Do** put product moments on a Stage Grey stage with 32px corners, with white cards floating on it.
- **Do** keep bright teal for fills with ink text, and use Deep Counter Teal (#0f766e) whenever teal must be read as text on a light surface.
- **Do** make every action a pill, 52px tall at full size, with a primary teal pill and a secondary ink-outline pill as the standard pair.
- **Do** set headlines in Figtree 800 with negative tracking (-0.02em to -0.035em) and body in Figtree 400 with Graphite for secondary text.
- **Do** use the Float and Lift shadows only on white objects resting on or overlapping a stage.
- **Do** ease motion with `cubic-bezier(.16,1,.3,1)` over 0.15–0.45s, and give every animation a reduced-motion fallback.
- **Do** label sample content honestly with a neutral "Sample" chip or caption.

### Don't:
- **Don't** put white text on a teal fill, or use bright teal (#1fc8b0) as text on white.
- **Don't** add a second accent colour or flood a section ground with teal.
- **Don't** introduce a second typeface or uppercase tracked labels above headings.
- **Don't** give buttons, cards, fields or standalone containers square corners (a photo may sit flush on a stage edge), and don't use hard-edged offset shadows; shadows stay soft, ambient and ink-tinted.
- **Don't** use the 6px tail corner on anything that is not speech.
- **Don't** add gradients or glossy fills to grounds, stages or buttons.
