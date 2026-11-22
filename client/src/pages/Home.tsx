import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, Compass, Menu, MoveDownRight, Sparkles, X } from "lucide-react";
import QuizPanel from "@/components/QuizPanel";
import {
  presenters,
  recap,
  sentenceQuiz,
  sentenceTip,
  sentenceTypes,
  tenseLessons,
  tenseQuizzes,
  topics,
  type Bilingual,
} from "@/data/englishMadeEasy";

const navigation = [
  { label: "Present", href: "#present", id: "present" },
  { label: "Past", href: "#past", id: "past" },
  { label: "Future", href: "#future", id: "future" },
  { label: "Sentences", href: "#sentences", id: "sentences" },
  { label: "Recap", href: "#recap", id: "recap" },
];

function BilingualText({ value, className = "", stacked = false }: { value: Bilingual; className?: string; stacked?: boolean }) {
  return <span className={`bilingual${stacked ? " bilingual--stacked" : ""} ${className}`}>
    <span>{value.en}</span>
    <span className="arabic" lang="ar" dir="rtl">{value.ar}</span>
  </span>;
}

function ChapterHeading({ number, kicker, title, arabic, id }: { number: string; kicker: string; title: string; arabic: string; id: string }) {
  return <div className="chapter-heading">
    <p className="eyebrow"><span>{number}</span>{kicker}</p>
    <h2 id={id}>{title}<span className="arabic heading-arabic" lang="ar" dir="rtl">{arabic}</span></h2>
  </div>;
}

function ChapterFrame({ children, page, label }: { children: React.ReactNode; page: string; label: string }) {
  return <div className="chapter-frame">
    <div className="frame-topline"><span>ENGLISH MADE EASY</span><span>{label} · {page} / 12</span></div>
    {children}
    <span className="frame-corner frame-corner--one" aria-hidden="true" /><span className="frame-corner frame-corner--two" aria-hidden="true" />
  </div>;
}

function TenseChapter({ lesson, page }: { lesson: (typeof tenseLessons)[number]; page: string }) {
  const quiz = tenseQuizzes.find((item) => item.id === `${lesson.id}-quiz`)!;
  return <section className={`chapter-section lesson-section accent-${lesson.accent}`} id={lesson.id} data-chapter={lesson.id} aria-labelledby={`${lesson.id}-title`}>
    <ChapterFrame page={page} label={`${lesson.title.toUpperCase()} LESSON`}>
      <div className="lesson-header">
        <ChapterHeading number={lesson.number} kicker="A TENSE, MADE CLEAR" title={lesson.title} arabic={lesson.arabicTitle} id={`${lesson.id}-title`} />
        <p className="lesson-mantra">{lesson.rule}</p>
      </div>

      <div className="lesson-grid">
        <article className="glass-panel concept-card layer-in" style={{ "--stagger": "0ms" } as React.CSSProperties}>
          <div className="card-label"><BookOpen size={14} aria-hidden="true" /><span>MEANING · المعنى</span></div>
          {lesson.meaning.map((item) => <BilingualText value={item} stacked key={item.en} className="meaning-line" />)}
        </article>

        <div className="formula-cards">
          {lesson.forms.map((form, index) => <article className={`glass-panel formula-card layer-in formula-card--${index + 1}`} style={{ "--stagger": `${90 + index * 110}ms` } as React.CSSProperties} key={form.label}>
            <div className="card-label"><span>{form.label}</span><span className="arabic" lang="ar" dir="rtl">{form.arLabel}</span></div>
            <strong className="formula">{form.formula}</strong>
            <span className="formula-example"><span>{form.example.en}</span><span className="arabic" lang="ar" dir="rtl">{form.example.ar}</span></span>
            <span className="formula-note"><span>{form.note.en}</span><span className="arabic" lang="ar" dir="rtl">{form.note.ar}</span></span>
          </article>)}
        </div>

        <article className="glass-panel keyword-card layer-in" style={{ "--stagger": "180ms" } as React.CSSProperties}>
          <div className="card-label"><span>KEYWORDS · الكلمات المفتاحية</span></div>
          <div className="keyword-list">{lesson.keywords.map((word) => <span className="keyword-chip" key={word.en}><b>{word.en}</b><span className="arabic" lang="ar" dir="rtl">{word.ar}</span></span>)}</div>
          {"irregulars" in lesson && <div className="irregular-list"><p className="card-label">IRREGULAR VERBS · الأفعال الشاذة</p>{lesson.irregulars.map((verb) => <span className="irregular-verb" key={verb.en}><b>{verb.en}</b><small className="arabic" lang="ar" dir="rtl">{verb.ar}</small></span>)}</div>}
        </article>

        <article className="glass-panel example-card layer-in" style={{ "--stagger": "240ms" } as React.CSSProperties}>
          <div className="card-label"><span>EXAMPLES · أمثلة</span><span className="card-label-sub">LECTURE &amp; DAILY LIFE · المحاضرة والحياة اليومية</span></div>
          <div className="example-list">{lesson.examples.map((example, index) => <div className="example-line" key={example.en}><span className="example-index">{String(index + 1).padStart(2, "0")}</span><BilingualText value={example} stacked /></div>)}</div>
        </article>

        <aside className="tip-card glass-panel layer-in" style={{ "--stagger": "320ms" } as React.CSSProperties}>
          <div className="tip-orbit" aria-hidden="true" /><div><div className="card-label"><Sparkles size={13} aria-hidden="true" /> TIP · نصيحة</div><BilingualText value={lesson.tip} stacked /></div>
        </aside>
      </div>
      <a className="chapter-next" href={`#${lesson.id}-quiz`}>Try the quick quiz <ArrowDown size={14} aria-hidden="true" /></a>
    </ChapterFrame>
  </section>;
}

function QuizChapter({ quiz, page, id, label, number }: { quiz: (typeof tenseQuizzes)[number] | typeof sentenceQuiz; page: string; id: string; label: string; number: string }) {
  return <section className="chapter-section quiz-section" id={id} data-chapter={id} aria-labelledby={`${id}-title`}>
    <ChapterFrame page={page} label={`QUESTIONS · ${label}`}>
      <div className="quiz-header">
        <ChapterHeading number={number} kicker="PAUSE · THINK · CHOOSE" title="Quick Quiz" arabic={`أسئلة ${quiz.title.ar}`} id={`${id}-title`} />
        <div className="quiz-score-stamp"><span>5</span><small>questions<br />أسئلة</small></div>
      </div>
      <QuizPanel quiz={quiz} number={number} />
    </ChapterFrame>
  </section>;
}

function SentenceCard({ item, index }: { item: (typeof sentenceTypes)[number]; index: number }) {
  return <article className={`sentence-card glass-panel sentence-card--${index + 1} layer-in`} style={{ "--stagger": `${index * 120}ms` } as React.CSSProperties} id={item.id}>
    <div className="sentence-card-top"><span className="sentence-number">{item.number}</span><span className="sentence-kind">{item.kind}</span></div>
    <h3>{item.title}<span className="arabic" lang="ar" dir="rtl">{item.arabicTitle}</span></h3>
    <BilingualText value={item.definition} stacked className="sentence-definition" />
    <div className="connector-row"><span>CONNECTOR</span><b>{item.connectors}</b></div>
    <div className="sentence-examples">{item.examples.map((example) => <BilingualText value={example} stacked key={example.en} />)}</div>
  </article>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState("top");
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0);
      });
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
    const sections = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveChapter(entry.target.id); });
    }, { rootMargin: "-43% 0px -43% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const sectionNumber = (id: string) => {
    const ids = ["top", "present", "present-quiz", "past", "past-quiz", "future", "future-quiz", "sentences", "sentence-forms", "sentence-quiz", "recap", "presenters"];
    const index = ids.indexOf(id);
    return index < 0 ? "12" : String(index + 1).padStart(2, "0");
  };

  return <div className="site-shell">
    <div className="scroll-progress" role="progressbar" aria-label="Presentation progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{ width: `${progress}%` }} /></div>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="English Made Easy — return to the beginning" onClick={closeMenu}>
        <span className="brand-mark brand-mark--ag" aria-hidden="true">AG</span><span className="brand-name">English <b>Made</b> Easy</span><span className="brand-dot" aria-hidden="true" />
      </a>
      <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Lesson chapters">
        {navigation.map((item) => <a key={item.id} href={item.href} aria-current={activeChapter === item.id ? "location" : undefined} onClick={closeMenu}>{item.label}</a>)}
      </nav>
      <div className="nav-actions"><span className="chapter-counter" aria-live="polite">LESSON {sectionNumber(activeChapter)} <i /> 12</span><a className="button button--nav" href="#present" onClick={closeMenu}>Begin <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      <button className="mobile-menu" type="button" aria-label={menuOpen ? "Close lesson menu" : "Open lesson menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </header>

    <main>
      <section className="hero-section" id="top" data-chapter="top" aria-labelledby="hero-title">
        <div className="hero-light hero-light--one" aria-hidden="true" /><div className="hero-light hero-light--two" aria-hidden="true" />
        <div className="hero-grid page-width">
          <div className="hero-copy">
            <p className="hero-kicker"><span className="live-pip" /> A BEGINNER-FRIENDLY FIELD GUIDE</p>
            <h1 id="hero-title">English<br /><em>Made Easy.</em></h1>
            <p className="hero-arabic arabic" lang="ar" dir="rtl">الإنجليزي بسهولة</p>
            <p className="hero-lede">Four clear ideas. Real examples. A little practice. Learn the building blocks of English, one smooth step at a time.</p>
            <div className="topic-chips">{topics.map((topic) => <a href={topic.en === "Sentence Types" ? "#sentences" : `#${topic.en.toLowerCase()}`} key={topic.en}><span>{topic.en}</span><span className="arabic" lang="ar" dir="rtl">{topic.ar}</span></a>)}</div>
            <p className="hero-tagline">Simple · Clear · Fun · Learn Step by Step</p>
            <p className="hero-footnote">Beginner Friendly · Easy Lessons · Practice Examples</p>
            <a className="button button--primary button--large" href="#present">Start with the present <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="hero-visual" aria-label="A layered guide to English tenses and sentence forms">
            <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" /><div className="hero-halo" />
            <div className="hero-floating-card hero-floating-card--back glass-panel"><span>THEN</span><b>Past</b><small>finished actions</small><i>send → sent</i></div>
            <div className="hero-floating-card hero-floating-card--front glass-panel"><span>NEXT</span><b>Future</b><small>will + verb</small><i>will open</i></div>
            <article className="hero-pane glass-panel">
              <div className="pane-topline"><span>YOUR QUICK GUIDE</span><span>01 — 12</span></div>
              <div className="pane-threads"><i /><i /><i /></div>
              <p className="pane-caption">START HERE</p><h2>One small rule<br /><em>changes the sentence.</em></h2>
              <div className="pane-bottom"><span>SCROLL TO LEARN</span><MoveDownRight size={15} aria-hidden="true" /></div>
            </article>
            <span className="hero-axis-note"><Compass size={13} aria-hidden="true" /> FOLLOW THE CLUES</span>
          </div>
        </div>
        <a className="scroll-cue" href="#present"><span>LESSON 01</span><i><ArrowDown size={14} aria-hidden="true" /></i></a>
      </section>

      <TenseChapter lesson={tenseLessons[0]} page="02" />
      <QuizChapter quiz={tenseQuizzes[0]} page="03" id="present-quiz" label="PRESENT SIMPLE" number="02" />
      <TenseChapter lesson={tenseLessons[1]} page="04" />
      <QuizChapter quiz={tenseQuizzes[1]} page="05" id="past-quiz" label="PAST SIMPLE" number="04" />
      <TenseChapter lesson={tenseLessons[2]} page="06" />
      <QuizChapter quiz={tenseQuizzes[2]} page="07" id="future-quiz" label="FUTURE SIMPLE" number="06" />

      <section className="chapter-section structures-section" id="sentences" data-chapter="sentences" aria-labelledby="sentences-title">
        <ChapterFrame page="08" label="SENTENCE TYPES · PART ONE">
          <div className="lesson-header"><ChapterHeading number="07" kicker="FOUR WAYS TO BUILD A THOUGHT" title="Types of Sentences" arabic="أنواع الجمل" id="sentences-title" /><p className="lesson-mantra">One thought, joined thoughts, or a little more.</p></div>
          <div className="sentence-grid sentence-grid--first"><SentenceCard item={sentenceTypes[0]} index={0} /><SentenceCard item={sentenceTypes[1]} index={1} /></div>
          <div className="structure-signal"><span className="signal-line" /><span>ONE IDEA → TWO IDEAS</span><ArrowDown size={14} aria-hidden="true" /></div>
          <a className="chapter-next" href="#sentence-forms">Continue to the next two <ArrowDown size={14} aria-hidden="true" /></a>
        </ChapterFrame>
      </section>

      <section className="chapter-section structures-section" id="sentence-forms" data-chapter="sentence-forms" aria-labelledby="sentence-forms-title">
        <ChapterFrame page="09" label="SENTENCE TYPES · PART TWO">
          <div className="lesson-header"><ChapterHeading number="08" kicker="ADD A REASON · ADD A LAYER" title="Now, connect the ideas." arabic="والآن، نربط الأفكار" id="sentence-forms-title" /><p className="lesson-mantra">Find the connector. Then count the clauses.</p></div>
          <div className="sentence-grid sentence-grid--second"><SentenceCard item={sentenceTypes[2]} index={2} /><SentenceCard item={sentenceTypes[3]} index={3} /></div>
          <aside className="tip-card sentence-tip glass-panel"><div className="tip-orbit" aria-hidden="true" /><div><div className="card-label"><Sparkles size={13} aria-hidden="true" /> THE SHORT VERSION · الخلاصة</div><BilingualText value={sentenceTip} stacked /></div></aside>
          <a className="chapter-next" href="#sentence-quiz">Try the sentence quiz <ArrowDown size={14} aria-hidden="true" /></a>
        </ChapterFrame>
      </section>

      <QuizChapter quiz={sentenceQuiz} page="10" id="sentence-quiz" label="TYPES OF SENTENCES" number="09" />

      <section className="chapter-section recap-section" id="recap" data-chapter="recap" aria-labelledby="recap-title">
        <ChapterFrame page="11" label="FINAL SUMMARY">
          <div className="lesson-header"><ChapterHeading number="10" kicker="KEEP THESE CLOSE" title="The final recap" arabic="الملخص النهائي" id="recap-title" /><p className="lesson-mantra">Three tenses. Four sentence shapes. One useful clue.</p></div>
          <div className="recap-grid">
            <article className="recap-card glass-panel"><div className="card-label">ENGLISH TENSES · الأزمنة</div>{recap.tenses.map((item) => <div className="recap-tense" key={item.title}><h3>{item.title}<span className="arabic" lang="ar" dir="rtl">{item.arabic}</span></h3><p>{item.en}<span className="arabic" lang="ar" dir="rtl">{item.ar}</span></p><small>{item.rule}</small></div>)}</article>
            <article className="recap-card glass-panel"><div className="card-label">SENTENCE TYPES · أنواع الجمل</div>{recap.structures.map((item) => <div className="recap-structure" key={item.title}><div><b>{item.title}</b><span>{item.connector}</span></div><p>{item.example}<span className="arabic" lang="ar" dir="rtl">{item.ar}</span></p></div>)}</article>
            <article className="recap-card recap-truth-card glass-panel"><div className="card-label">TRUE / FALSE · صح / خطأ</div>{recap.truths.map((item) => <div className="truth-line" key={item.en}><BilingualText value={item} stacked /><span className={item.answer ? "truth-mark" : "truth-mark truth-mark--false"}>{item.answer ? "TRUE · صح" : "FALSE · خطأ"}</span></div>)}<div className="final-rule"><Check size={15} aria-hidden="true" /><BilingualText value={recap.finalRule} stacked /></div></article>
          </div>
          <a className="chapter-next" href="#presenters">Meet the presenters <ArrowDown size={14} aria-hidden="true" /></a>
        </ChapterFrame>
      </section>

      <section className="chapter-section presenters-section" id="presenters" data-chapter="presenters" aria-labelledby="presenters-title">
        <ChapterFrame page="12" label="PRESENTED BY">
          <div className="presenter-header"><div><ChapterHeading number="11" kicker="MADE TOGETHER" title="Presented by" arabic="قدّمها" id="presenters-title" /><p className="lesson-mantra">Six contributors. One shared guide.</p></div><div className="presenter-orbit" aria-hidden="true"><span /><span /><span /></div></div>
          <div className="presenter-grid">{presenters.map((person, index) => <article className="presenter-card glass-panel layer-in" style={{ "--stagger": `${index * 75}ms` } as React.CSSProperties} key={person.number}><span className="presenter-number">{person.number}</span><div className="presenter-avatar" aria-hidden="true">{person.name.split(" ").map((part) => part[0]).join("")}</div><h3>{person.name}</h3><p>{person.role}</p><span className="presenter-line" /></article>)}</div>
          <div className="closing-note"><span className="closing-star"><Sparkles size={16} aria-hidden="true" /></span><p>Simple · Clear · Fun<span className="arabic" lang="ar" dir="rtl">الإنجليزي بسهولة</span></p><a className="button button--primary" href="#top">Back to the beginning <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </ChapterFrame>
      </section>
    </main>

    <footer className="site-footer"><div className="footer-inner page-width"><a className="brand brand--footer" href="#top"><span className="brand-mark" aria-hidden="true"><i /></span><span className="brand-name">English <b>Made</b> Easy</span></a><p>A little practice makes a big difference. · القليل من التدريب يصنع فرقاً كبيراً.</p><a className="footer-back" href="#top">Back to the beginning <ArrowUpRight size={14} aria-hidden="true" /></a><span className="footer-index">PRESENT · PAST · FUTURE · SENTENCE TYPES</span></div></footer>
  </div>;
}
