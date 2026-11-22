# English Made Easy — Web-native lesson experience

## Product and implementation approach

Convert all 12 supplied PDF pages into one vertically scrollable, responsive React experience. Build the lessons as editable semantic HTML, React data, and CSS—not screenshots, page renders, or embedded slide images. Keep the single existing home route and established black/charcoal glass shell. The sequence follows the source: title, Present Simple lesson and quiz, Past Simple lesson and quiz, Future Simple lesson and quiz, sentence types (simple/compound, then complex/compound-complex), sentence-types quiz, final summary, and presenter credits.

The content is organized in `client/src/data/englishMadeEasy.ts` as typed lesson, example, and quiz records; `client/src/components/QuizPanel.tsx` renders reusable keyboard-accessible answer choices and feedback; `client/src/pages/Home.tsx` composes the twelve chapter sections and sticky navigation/progress; `client/src/index.css` owns the dark-glass visual system, responsive layout, bilingual typography, and scroll choreography. Browser title, description, icon reference, route title, README, and TODO are updated to the real presentation identity.

Arabic text stays paired with the English lesson and marked `lang="ar"` / `dir="rtl"`. Tense quizzes preserve the five source questions each; sentence-type quiz preserves all five questions. Answer feedback is added as an interactive learning enhancement. When a source example contains a grammatical misclassification (the compound-complex quiz sentence has one independent clause with a compound predicate), explain the technical distinction and classify it accurately rather than teaching the error as a rule.

## Design

- **Design Movement:** Cinematic dark-glass editorial, retaining the existing pink/violet light and the source deck’s luminous frame language.
- **Core Principles:** Every slide becomes live content; bilingual copy remains easy to scan; a lesson should read calmly at rest; movement is layered, controlled by scroll, and never required to understand.
- **Color Philosophy:** Charcoal and near-black ground the learning space. Pink marks present and key emphasis; violet marks transitions and future-facing ideas; soft silver carries supporting text. A cool periwinkle edge light nods to the PDF frame without abandoning the established site palette.
- **Layout Paradigm:** Tall editorial chapters connected by a slim vertical learning rail. Lesson content uses asymmetrical glass modules—rule/formula, keywords, examples, tip—while quizzes form generous interactive answer panels. On small screens the composition becomes a single-column reading flow.
- **Signature Elements:** A luminous inset chapter frame; floating index chips and hairline connectors that travel between chapters; independent glass cards that reveal on slightly different spatial planes.
- **Interaction Philosophy:** Navigation offers direct jumps and progress. Quiz selections immediately disclose correctness and a short explanation; answers can be changed. Focus states, semantic controls, and touch-sized targets remain clear.
- **Animation:** Use CSS scroll-driven view timelines when supported. Chapter shells peel open with clip-path and a small 3D tilt; inner text and independent cards arrive on staggered depth offsets; outgoing chapters gently translate and contract, while the next chapter’s frame resolves from a different axis. No blanket fade-only reveal. The default state remains fully readable in unsupported browsers, and reduced-motion disables the choreography.
- **Typography System:** Existing Quicksand/Nunito display/body families plus IBM Plex Mono for labels; Arabic remains system Arabic/Noto-compatible sans with direction and alignment explicitly set. Display titles are spacious, body copy is high contrast, labels are restrained.
- **Brand Essence:** A friendly bilingual field guide to everyday English grammar, taught with clarity and motion; approachable, lucid, composed.
- **Brand Voice:** Plain-English rules paired with concise Arabic translation; examples sound practical, not academic. Example lines: “One small rule changes the whole sentence.” “Look for the time word; then choose your verb.”
- **Wordmark & Logo:** Keep the abstract folded-page mark, now detached from its former placeholder identity, beside the English Made Easy wordmark.
- **Signature Brand Color:** Electric rose, softened by violet light.

## Project structure

- `client/src/data/englishMadeEasy.ts` — typed bilingual lesson content, example sets, quiz questions/answer keys, recap, and contributor data.
- `client/src/components/QuizPanel.tsx` — reusable interactive quiz with answer feedback.
- `client/src/pages/Home.tsx` — all chapter composition, scroll progress, active section, header navigation, and footer.
- `client/src/index.css` — palette, glass surfaces, layered view-timeline animation, responsive and reduced-motion rules.
- `client/index.html` and `client/public/manus-routes.json` — browser-facing identity and route title.
- `README.md`, `TODO.md` — project purpose and explicit outcomes.
