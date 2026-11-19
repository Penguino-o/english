import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, Sparkles, X } from "lucide-react";

const navigation = [
  { label: "The idea", href: "#idea", id: "idea" },
  { label: "The rhythm", href: "#chapters", id: "chapters" },
  { label: "Your canvas", href: "#canvas", id: "canvas" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState("top");

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div
        className="scroll-progress"
        role="progressbar"
        aria-label="Presentation progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="UNFOLD — return to the beginning" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span className="brand-name">UNFOLD</span>
          <span className="brand-dot" aria-hidden="true" />
        </a>

        <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Presentation chapters">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={activeChapter === item.id ? "location" : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <span className="chapter-counter" aria-live="polite">
            {activeChapter === "top" ? "OPENING" : `CHAPTER ${String(navigation.findIndex((item) => item.id === activeChapter) + 1).padStart(2, "0")}`}
          </span>
          <a className="button button--nav" href="#idea" onClick={closeMenu}>
            Begin <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <button
          className="mobile-menu"
          type="button"
          aria-label={menuOpen ? "Close chapter menu" : "Open chapter menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section className="hero-section" id="top" data-chapter="top" aria-labelledby="hero-title">
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <p className="hero-kicker"><span className="live-pip" /> A PRESENTATION, IN MOTION</p>
              <h1 id="hero-title">Let the story<br /><em>unfold.</em></h1>
              <p className="hero-lede">
                Not a deck of pictures. A living page where every idea is built into the code—and the next chapter arrives as you scroll.
              </p>
              <div className="hero-actions">
                <a className="button button--primary button--large" href="#idea">
                  Enter the story <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="text-link" href="#chapters">
                  See how it moves <ArrowDown size={14} aria-hidden="true" />
                </a>
              </div>
              <p className="hero-footnote"><Sparkles size={14} aria-hidden="true" /> Built as a website, not a stack of slide images.</p>
            </div>

            <div className="hero-visual" aria-label="Abstract preview of a presentation chapter, composed from web elements">
              <div className="hero-halo hero-halo--one" />
              <div className="hero-halo hero-halo--two" />
              <div className="hero-orbit hero-orbit--one" />
              <div className="hero-orbit hero-orbit--two" />
              <div className="hero-fragment hero-fragment--back" aria-hidden="true">
                <span>02 / THE TURN</span><i /><i /><i />
              </div>
              <div className="hero-fragment hero-fragment--side" aria-hidden="true">
                <span>WORDS</span><b>have room<br />to breathe.</b>
              </div>
              <article className="hero-pane glass-panel">
                <div className="pane-topline"><span>CHAPTER 01</span><span>ARRIVAL</span></div>
                <div className="pane-mark" aria-hidden="true"><i /><i /><i /></div>
                <p className="pane-caption">A THOUGHT, GIVEN SPACE</p>
                <h2>Ideas need<br /><em>room to move.</em></h2>
                <div className="pane-bottom"><span>SCROLL TO CONTINUE</span><ArrowDown size={15} aria-hidden="true" /></div>
              </article>
              <div className="hero-orbit-dot" aria-hidden="true" />
            </div>
          </div>
          <a className="scroll-cue" href="#idea"><span>KEEP MOVING</span><i><ArrowDown size={14} aria-hidden="true" /></i></a>
        </section>

        <section className="chapter-section" id="idea" data-chapter="idea" aria-labelledby="idea-title">
          <div className="chapter-grid page-width">
            <div className="chapter-copy chapter-reveal">
              <p className="eyebrow"><span>01</span> THE FORMAT</p>
              <h2 id="idea-title">The page<br />becomes the <em>stage.</em></h2>
              <p>
                Every line of text, shape and transition belongs to this page. Chapters are composed from live elements—not exported slides—so the story can breathe, respond and change with you.
              </p>
              <div className="chapter-notes">
                <div><span>01</span><b>Words stay editable</b></div>
                <div><span>02</span><b>Layers move independently</b></div>
                <div><span>03</span><b>Scroll sets the pace</b></div>
              </div>
            </div>

            <div className="chapter-visual chapter-reveal">
              <div className="code-window glass-panel">
                <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>UNFOLD / A LIVING PAGE</span><span className="window-live"><i /> LIVE</span></div>
                <div className="code-layout">
                  <div className="code-gutter"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span></div>
                  <div className="code-lines" aria-label="Illustrative HTML structure">
                    <p><span className="code-purple">&lt;section</span> <span className="code-pink">class</span>=<span className="code-gold">"chapter"</span><span className="code-purple">&gt;</span></p>
                    <p className="code-indent"><span className="code-purple">&lt;h1&gt;</span>One idea at a time<span className="code-purple">&lt;/h1&gt;</span></p>
                    <p className="code-indent"><span className="code-purple">&lt;div</span> <span className="code-pink">class</span>=<span className="code-gold">"motion"</span><span className="code-purple">&gt;</span></p>
                    <p className="code-indent code-indent--deep"><span className="code-muted">/* scroll sets the rhythm */</span></p>
                    <p className="code-indent"><span className="code-purple">&lt;/div&gt;</span></p>
                    <p><span className="code-purple">&lt;/section&gt;</span></p>
                    <div className="code-cursor" aria-hidden="true" />
                  </div>
                </div>
                <div className="window-foot"><span>TYPE · DEPTH · LIGHT</span><span>01 / 03</span></div>
                <div className="window-glint" aria-hidden="true" />
              </div>
              <span className="visual-note visual-note--left">Everything is part of the page.</span>
              <span className="visual-note visual-note--right">No slide screenshots.</span>
            </div>
          </div>
        </section>

        <section className="chapter-section chapter-section--alt" id="chapters" data-chapter="chapters" aria-labelledby="chapters-title">
          <div className="chapter-grid chapter-grid--reverse page-width">
            <div className="chapter-copy chapter-reveal">
              <p className="eyebrow"><span>02</span> THE RHYTHM</p>
              <h2 id="chapters-title">Each thought<br />gets its <em>entrance.</em></h2>
              <p>
                The page keeps moving. A quiet reveal brings the next idea into focus, then lets it drift away as the next part takes its place. No hard cuts—just a steady unfolding.
              </p>
              <a className="text-link text-link--accent" href="#canvas">Continue to the canvas <ArrowRight size={14} aria-hidden="true" /></a>
            </div>

            <div className="chapter-visual chapter-reveal">
              <div className="chapter-route">
                <div className="route-glow" />
                <div className="route-line" />
                <article className="route-stop route-stop--one glass-panel"><span className="route-number">01</span><div><b>The opening</b><small>Set the scene</small></div><i /></article>
                <article className="route-stop route-stop--two glass-panel"><span className="route-number">02</span><div><b>The shift</b><small>Change the angle</small></div><i /></article>
                <article className="route-stop route-stop--three glass-panel"><span className="route-number">03</span><div><b>The landing</b><small>Leave one idea behind</small></div><i /></article>
                <div className="route-label route-label--top">A NATURAL PACE</div>
                <div className="route-label route-label--bottom">SCROLL IS THE TRANSITION</div>
              </div>
              <span className="route-orbit route-orbit--one" />
              <span className="route-orbit route-orbit--two" />
            </div>
          </div>
        </section>

        <section className="chapter-section chapter-section--final" id="canvas" data-chapter="canvas" aria-labelledby="canvas-title">
          <div className="chapter-grid page-width">
            <div className="chapter-copy chapter-reveal">
              <p className="eyebrow"><span>03</span> YOUR CANVAS</p>
              <h2 id="canvas-title">Your story<br />goes <em>here.</em></h2>
              <p>
                The visual system is ready; your presentation content is still a placeholder. Share the title, topic, slides, notes or outline, and this shell can become a sequence of chapters made for your story.
              </p>
              <a className="button button--primary button--large" href="#top">
                Return to the opening <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <p className="placeholder-note">UNFOLD is a temporary name until you choose the presentation title.</p>
            </div>

            <div className="chapter-visual chapter-reveal">
              <div className="canvas-stack">
                <div className="canvas-glow" />
                <div className="canvas-sheet canvas-sheet--back" aria-hidden="true"><span>YOUR NEXT CHAPTER</span><i /><i /></div>
                <div className="canvas-sheet canvas-sheet--middle" aria-hidden="true"><span>YOUR CENTRAL IDEA</span><i /><i /><i /></div>
                <article className="canvas-sheet canvas-sheet--front glass-panel">
                  <div className="canvas-sheet-top"><span>CONTENT PLACEHOLDER</span><Sparkles size={15} aria-hidden="true" /></div>
                  <div className="canvas-crosshair" aria-hidden="true"><i /><i /></div>
                  <p className="canvas-overline">TITLE · TOPIC · KEY MOMENTS</p>
                  <h3>A place for<br /><em>what matters.</em></h3>
                  <div className="canvas-sheet-bottom"><span>WAITING FOR YOUR STORY</span><span>UNFOLD · 03</span></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-inner page-width">
            <a className="brand brand--footer" href="#top" aria-label="UNFOLD — return to beginning">
              <span className="brand-mark" aria-hidden="true"><i /></span><span className="brand-name">UNFOLD</span>
            </a>
            <p>A presentation canvas built to move with its story.</p>
            <a className="footer-back" href="#top">Back to the opening <ArrowUpRight size={14} aria-hidden="true" /></a>
            <span className="footer-index">SCROLL · NOTICE · REMEMBER</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
