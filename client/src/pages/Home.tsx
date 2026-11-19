import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Check,
  ChevronDown,
  CircleHelp,
  Gamepad2,
  LockKeyhole,
  Menu,
  MessageCircle,
  Music2,
  ShieldCheck,
  Sparkles,
  Trophy,
  WandSparkles,
  X,
} from "lucide-react";

type DialogKind = "invite" | "dashboard" | "legal" | null;
type GroupName = "People" | "Safety" | "Community" | "Play" | "Routines";

const groups: GroupName[] = ["People", "Safety", "Community", "Play", "Routines"];
const moduleData: Record<GroupName, { name: string; detail: string; icon: string; active: boolean }[]> = {
  People: [
    { name: "Welcome flow", detail: "First hello, goodbye & milestones", icon: "✳", active: true },
    { name: "Role menus", detail: "Let members pick their own tags", icon: "☷", active: true },
    { name: "Return roles", detail: "Restore roles after a break", icon: "↺", active: false },
    { name: "Temporary roles", detail: "Set a role to expire on time", icon: "◷", active: false },
  ],
  Safety: [
    { name: "Message filter", detail: "Catch risky words and links", icon: "⌁", active: true },
    { name: "Join protection", detail: "Slow down sudden waves of joins", icon: "⛨", active: true },
    { name: "Staff inbox", detail: "Keep private member reports tidy", icon: "▤", active: false },
  ],
  Community: [
    { name: "Chat levels", detail: "Reward activity with experience", icon: "↗", active: true },
    { name: "Birthdays", detail: "Celebrate a member's big day", icon: "✿", active: false },
    { name: "Starboard", detail: "Save the posts people loved", icon: "☆", active: true },
  ],
  Play: [
    { name: "Chat games", detail: "Quick rounds for the whole server", icon: "⌗", active: true },
    { name: "Giveaways", detail: "Run a simple member draw", icon: "✧", active: false },
    { name: "Daily streaks", detail: "Give regulars a reason to return", icon: "↗", active: false },
  ],
  Routines: [
    { name: "Scheduled notes", detail: "Send a message when it matters", icon: "◷", active: true },
    { name: "Auto-clean", detail: "Keep bot channels neat", icon: "⌁", active: false },
    { name: "Custom replies", detail: "Answer shortcuts your way", icon: "⌘", active: false },
  ],
};

const gameNames = [
  "Tic-tac-toe", "Connect Four", "Rock paper scissors", "Battleship",
  "Trivia", "Hangman", "Would you rather", "Word scramble",
  "Quick maths", "Counting", "Word chain", "Memory match",
  "Minesweeper", "Blackjack", "Higher or lower", "2048",
];

const routines = [
  { time: "09:00", label: "Post the morning notice", channel: "#announcements", icon: "☼" },
  { time: "12:30", label: "Clear yesterday's bot chatter", channel: "#bot-corner", icon: "⌁" },
  { time: "18:00", label: "Refresh the community count", channel: "#server-info", icon: "↗" },
  { time: "23:00", label: "Quiet the lounge for the night", channel: "#general", icon: "☾" },
];

function Face({ small = false }: { small?: boolean }) {
  return <span className={`bot-face${small ? " bot-face--small" : ""}`} aria-hidden="true"><i /><i /></span>;
}

function Modal({ kind, onClose }: { kind: DialogKind; onClose: () => void }) {
  if (!kind) return null;
  const info = kind === "invite"
    ? { title: "The invite door isn't wired up yet.", copy: "This is an original front-end demonstration. There isn't a live bot or server connection behind the button, so nothing will be added to your account." }
    : kind === "dashboard"
      ? { title: "Dashboard preview", copy: "The controls on this page are illustrative. A real server dashboard, account login and saved settings have not been connected." }
      : { title: "A small prototype note", copy: "This independent visual demo doesn't collect or retain personal information. Its newsletter form stays in your browser and never sends your email. Product terms, privacy details and support contacts would belong here in a live service." };
  return (
    <div className="modal-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close"><X size={19} /></button>
        <span className="modal-spark"><Sparkles size={19} /></span>
        <p className="eyebrow">PROTOTYPE NOTICE</p>
        <h2 id="modal-title">{info.title}</h2>
        <p>{info.copy}</p>
        <button className="button button--primary" type="button" onClick={onClose}>Got it <ArrowRight size={16} /></button>
      </section>
    </div>
  );
}

export default function Home() {
  const [activeGroup, setActiveGroup] = useState<GroupName>("People");
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>({});
  const [memberName, setMemberName] = useState("Mira");
  const [dmEnabled, setDmEnabled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterOk, setNewsletterOk] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);

  const isOn = (name: string, defaultValue: boolean) => enabledModules[name] ?? defaultValue;
  const toggleModule = (name: string, defaultValue: boolean) => {
    setEnabledModules((current) => ({ ...current, [name]: !isOn(name, defaultValue) }));
  };
  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterOk || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter.trim())) return;
    setNewsletterSent(true);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="MEE7 home"><Face /><span>MEE<span className="brand-seven">7</span></span><span className="brand-dot" /></a>
        <nav className={`main-nav${mobileOpen ? " main-nav--open" : ""}`} aria-label="Main navigation">
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#games" onClick={() => setMobileOpen(false)}>Games</a>
          <a href="#routines" onClick={() => setMobileOpen(false)}>What it does</a>
          <button type="button" className="nav-help" onClick={() => { setDialog("legal"); setMobileOpen(false); }}>Help <ChevronDown size={13} /></button>
        </nav>
        <div className="nav-actions">
          <a className="support-link" href="#faq"><CircleHelp size={15} /> <span>Get help</span></a>
          <button className="button button--nav" type="button" onClick={() => setDialog("invite")}>Add MEE7 <ArrowUpRight size={15} /></button>
        </div>
        <button className="mobile-menu" type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-pip" /> A little more life in your server</div>
            <h1>One bot.<br /><span>More room</span><br />for people.</h1>
            <p className="hero-lede">Make the busywork disappear and leave more room for the good stuff. Welcomes, moderation, games and those everyday server routines—tuned in one friendly place.</p>
            <div className="hero-actions">
              <button className="button button--primary button--large" type="button" onClick={() => setDialog("invite")}>Bring MEE7 along <ArrowRight size={18} /></button>
              <a className="text-link" href="#features">Take a look around <ArrowDown size={15} /></a>
            </div>
            <div className="hero-footnote"><span className="tiny-check"><Check size={12} /></span> A toolkit you configure. Turn on only what fits.</div>
          </div>
          <div className="hero-art" aria-label="Illustration of a welcome message in a chat server">
            <div className="art-orbit art-orbit--one" /><div className="art-orbit art-orbit--two" />
            <div className="sticker sticker--sun">✦</div><div className="sticker sticker--smile">☺</div>
            <div className="server-card">
              <div className="server-sidebar"><div className="server-avatar">cc</div><div className="server-name">Cozy Corner <ChevronDown size={12} /></div><div className="side-caption">YOUR CHANNELS</div><div className="side-item">⌂ &nbsp; welcome</div><div className="side-item side-item--active"># &nbsp; say-hello</div><div className="side-item"># &nbsp; role-picks</div><div className="side-item"># &nbsp; general</div><div className="side-user"><span className="avatar avatar--mint">M</span><div><b>{memberName || "Mira"}</b><small>ready to chat</small></div><span className="online-dot" /></div></div>
              <div className="server-chat"><div className="chat-head"><span># &nbsp;say-hello</span><span className="chat-head-dot">•••</span></div><div className="date-pill">TODAY</div><div className="chat-message"><Face small /><div><div className="message-meta"><b>MEE7</b><span>BOT</span><time>just now</time></div><p>Hey {memberName || "Mira"}! Happy you found your way here. Pick a role and make yourself at home.</p></div></div><div className="welcome-embed"><div className="embed-spark">✧</div><div><b>Make yourself at home</b><p>Start with the rules, then jump into the chat.</p><div className="embed-pills"><span>Read the rules ↗</span><span>Pick a role ✳</span></div></div></div><div className="chat-compose"><span>Message #say-hello</span><span>＋ &nbsp;☺</span></div></div>
            </div>
            <div className="floating-note note--top"><span className="note-icon note-icon--purple"><BellRing size={15} /></span><div><b>New member!</b><small>Warm welcome sent</small></div><span className="note-check"><Check size={13} /></span></div>
            <div className="floating-note note--bottom"><span className="note-icon note-icon--yellow"><Sparkles size={15} /></span><div><b>Roles picked</b><small>Now they belong</small></div></div>
          </div>
        </section>

        <div className="proof-strip section-wrap" aria-label="Bot features"><span className="proof-lead">A calmer way to run a community</span><span className="proof-divider" /><span><b>27</b> handy modules</span><span><b>16</b> chat games</span><span><b>47</b> commands to shape</span><span className="proof-note">Pick what you need. Leave the rest off.</span></div>

        <section className="section section--dashboard" id="features">
          <div className="section-wrap">
            <div className="section-heading section-heading--split"><div><p className="eyebrow"><span>01</span> YOUR CONTROL ROOM</p><h2>One home for<br /><em>all the little things.</em></h2></div><p className="section-intro">Every tool has its own switch and settings. Start with a preset that feels right, then make it yours—your changes stay yours when you try another setup.</p></div>
            <div className="dashboard-layout">
              <div className="dash-window">
                <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>mee7.app / cozy-corner</span><div className="window-user"><span className="avatar avatar--lavender">M</span><ChevronDown size={12} /></div></div>
                <div className="dash-body"><aside className="dash-rail"><div className="dash-server-icon"><Face small /></div><div className="rail-active">⌂</div><div>♧</div><div>⌁</div><div>⚙</div></aside><div className="dash-main"><div className="dash-title"><div><small>SERVER SETTINGS</small><h3>Cozy Corner</h3></div><div className="status-chip"><span /> All systems cozy</div></div><div className="profile-row"><span>Start with a profile</span><div className="profile-pills">{["Default", "Chill", "Creator"].map((item, i) => <button key={item} className={`profile-pill${i === 0 ? " profile-pill--active" : ""}`} type="button" onClick={() => setActiveGroup(groups[i === 0 ? 0 : i === 1 ? 2 : 4])}>{item}</button>)}</div></div><div className="category-tabs" role="tablist" aria-label="Module groups">{groups.map((group) => <button type="button" role="tab" aria-selected={activeGroup === group} className={activeGroup === group ? "category-tab category-tab--active" : "category-tab"} key={group} onClick={() => setActiveGroup(group)}>{group}</button>)}</div><div className="module-list">{moduleData[activeGroup].map((item) => { const on = isOn(item.name, item.active); return <div className="module-row" key={item.name}><span className="module-icon">{item.icon}</span><div className="module-text"><b>{item.name}</b><span>{item.detail}</span></div><button type="button" className={`switch${on ? " switch--on" : ""}`} role="switch" aria-checked={on} aria-label={`Toggle ${item.name}`} onClick={() => toggleModule(item.name, item.active)}><i /></button></div>; })}</div><div className="dash-foot"><span><LockKeyhole size={12} /> Only you can change this setup</span><button type="button" onClick={() => setDialog("dashboard")}>Open dashboard <ArrowUpRight size={13} /></button></div></div></div>
              </div>
              <div className="dash-aside"><div className="aside-number">27<span> / 47</span></div><p>Little building blocks, ready when you are.</p><div className="aside-line" /><div className="aside-tags"><span>People</span><span>Safety</span><span>Community</span><span>Games</span><span>Routines</span></div><div className="handwritten">Flip on a switch<br />when you're ready <span>↙</span></div></div>
            </div>
          </div>
        </section>

        <section className="section section--welcome">
          <div className="section-wrap feature-grid feature-grid--welcome"><div className="feature-copy"><p className="eyebrow"><span>02</span> FIRST IMPRESSIONS</p><h2>Say hello<br />in <em>your voice.</em></h2><p>Give new arrivals a warm first stop. Write a short note, shape it into a colorful card, point to the rules or let them choose their own roles. The message can appear in a channel or arrive quietly in their inbox.</p><ul className="check-list"><li><span><Check size={13} /></span> Welcome, goodbye and member milestones</li><li><span><Check size={13} /></span> Fill in names and server details automatically</li><li><span><Check size={13} /></span> Add a role menu or a link to get started</li></ul><button className="subtle-button" type="button" onClick={() => setDialog("dashboard")}>Explore the welcome setup <ArrowRight size={15} /></button></div><div className="welcome-builder"><div className="builder-top"><div><span className="builder-overline">MESSAGE STUDIO</span><b>Welcome note</b></div><span className="saved-badge"><span /> Saved</span></div><div className="builder-controls"><label htmlFor="name-preview">Preview member</label><div className="name-input"><span>@</span><input id="name-preview" value={memberName} onChange={(event) => setMemberName(event.target.value)} aria-label="Change preview member name" /></div><label className="builder-switch-label" htmlFor="dm-option"><span>Also send a private note</span><button id="dm-option" type="button" className={`switch switch--compact${dmEnabled ? " switch--on" : ""}`} role="switch" aria-checked={dmEnabled} aria-label="Toggle private welcome message" onClick={() => setDmEnabled(!dmEnabled)}><i /></button></label><div className="message-editor"><div className="editor-toolbar"><span>B</span><i /><span>↗</span><i /><span>✳</span><i /><span>＋ Add button</span></div><div className="editor-text">Hey <b>{memberName || "new friend"}</b>! Glad you're here. Take a peek at <span>#rules</span> and choose what you're into.</div><div className="editor-cursor" /></div><div className="builder-bottom"><span>Message destination</span><b># &nbsp;welcome-room <ChevronDown size={13} /></b></div></div><div className="welcome-preview"><div className="preview-label">LIVE PREVIEW <span /></div><div className="preview-message"><Face small /><div><div className="message-meta"><b>MEE7</b><span>BOT</span><time>now</time></div><p>Hey {memberName || "new friend"}! Glad you're here. Take a peek at <b>#rules</b> and choose what you're into.</p><button type="button" onClick={() => setDialog("dashboard")}>Choose your roles <ArrowRight size={12} /></button></div></div></div><div className="builder-confetti confetti-a">✳</div><div className="builder-confetti confetti-b">✦</div></div></div>
        </section>

        <section className="section section--safety">
          <div className="section-wrap safety-grid"><div className="safety-demo"><div className="chat-demo-head"><div className="channel-label"># &nbsp;general <span>•••</span></div><div className="chat-line"><span className="avatar avatar--coral">A</span><p><b>Ayla</b><small>anyone up for trivia later?</small></p><time>18:02</time></div><div className="chat-line chat-line--scam"><span className="avatar avatar--gray">gd</span><p><b>free_gift</b><small>claim a free gift at yapln.example/join</small></p><time>18:03</time><span className="blocked-stamp"><ShieldCheck size={13} /> HELD</span></div><div className="removed-note"><span><ShieldCheck size={15} /></span><div><b>That link was stopped.</b><small>It resembles a known bait pattern.</small></div><button type="button" onClick={() => setDialog("dashboard")}>Review</button></div></div><div className="case-card"><div className="case-heading"><span>STAFF ACTIVITY</span><b>Case 042 <span className="case-tag">TIMEOUT</span></b></div><div className="case-detail"><span>Member</span><b>@free_gift</b></div><div className="case-detail"><span>Checked by</span><b>Message guard</b></div><div className="case-detail"><span>Why it paused</span><b>Suspicious link pattern</b></div><div className="case-timeline"><span /><span /><span /></div></div><div className="shield-blob"><ShieldCheck size={21} /></div></div><div className="feature-copy safety-copy"><p className="eyebrow"><span>03</span> KEEP THE SPACE KIND</p><h2>Catch the bad<br />stuff <em>early.</em></h2><p>A quiet set of guardrails helps your moderators focus on people, not spam. Start with common trouble patterns, add your own words and decide what should happen after a message is flagged.</p><ul className="check-list"><li><span><Check size={13} /></span> Notice obfuscated words and lookalike links</li><li><span><Check size={13} /></span> Choose when to warn, timeout or remove</li><li><span><Check size={13} /></span> Leave staff a readable case trail</li></ul><button className="subtle-button" type="button" onClick={() => setDialog("dashboard")}>See the safety controls <ArrowRight size={15} /></button></div></div>
        </section>

        <section className="section section--community" id="activity">
          <div className="section-wrap"><div className="section-heading section-heading--center"><p className="eyebrow"><span>04</span> GOOD REASONS TO COME BACK</p><h2>Make every visit<br />a little more <em>fun.</em></h2><p>Give regulars little moments to look forward to, whether they like to chat, collect rewards or challenge a friend.</p></div><div className="community-cards"><article className="community-card levels-card"><div className="card-heading"><span className="round-icon round-icon--lav"><Trophy size={17} /></span><span className="card-label">MEMBER LEVELS</span><span className="card-more">•••</span></div><div className="level-title">Chat grows into <b>something.</b></div><div className="rank-row"><span className="rank-number">01</span><span className="avatar avatar--mint">M</span><b>{memberName || "Mira"}</b><span className="level-meter"><i style={{ width: "72%" }} /></span><b>24</b></div><div className="rank-row"><span className="rank-number">02</span><span className="avatar avatar--peach">J</span><b>Jonas</b><span className="level-meter"><i style={{ width: "55%" }} /></span><b>19</b></div><div className="rank-row"><span className="rank-number">03</span><span className="avatar avatar--lavender">A</span><b>Ayla</b><span className="level-meter"><i style={{ width: "43%" }} /></span><b>17</b></div><div className="reward-line"><span>UP NEXT</span><b>Level 25 · Old Guard</b><span>✧</span></div></article><article className="community-card giveaway-card"><div className="card-heading"><span className="round-icon round-icon--yellow"><Sparkles size={17} /></span><span className="card-label">A LITTLE SURPRISE</span><span className="card-more">•••</span></div><div className="gift-illustration"><div className="gift-star star-one">✦</div><div className="gift-box"><span /><i /></div><div className="gift-star star-two">✧</div></div><h3>A custom role<br />picked by you</h3><p>One lucky name gets to choose a role color for the server.</p><button type="button" onClick={() => setDialog("dashboard")}>Count me in <ArrowRight size={14} /></button><small>Closes at 8:00 pm · 1 winner</small></article><article className="community-card social-card"><div className="card-heading"><span className="round-icon round-icon--mint"><MessageCircle size={17} /></span><span className="card-label">LITTLE COMMUNITY WINS</span></div><div className="social-post"><span className="avatar avatar--lavender">A</span><div><b>Ayla <small>in #pet-corner</small></b><p>she's figured out the treat cupboard</p></div><span className="heart-count">♡ 7</span></div><div className="social-divider" /><div className="daily-streak"><div><span className="streak-flame">✦</span><span><b>5 day streak</b><small>Coming back adds up</small></span></div><div className="streak-dots"><i /><i /><i /><i /><i className="is-today" /><i /></div></div><div className="social-footer"><span>Starboard</span><span>Reputation</span><span>Birthdays</span></div></article></div></div>
        </section>

        <section className="section section--games" id="games">
          <div className="section-wrap"><div className="games-heading"><div><p className="eyebrow"><span>05</span> PLAY A ROUND</p><h2>Good chat.<br /><em>Better games.</em></h2><p>Kick off a quick game without leaving the conversation. Play against a friend, invite the whole channel or take a solo break between messages.</p><div className="games-count"><Gamepad2 size={16} /><b>16</b> ways to play together</div></div><div className="game-preview"><div className="tic-card"><div className="tic-head"><span><Gamepad2 size={14} /> QUICK MATCH</span><span>• LIVE</span></div><div className="tic-title">Your move, Mira</div><div className="tic-subtitle">Mira <b>X</b> &nbsp; vs &nbsp; Jonas <b>O</b></div><div className="tic-board"><span className="mark-x">×</span><span /><span className="mark-o">○</span><span /><span className="mark-x">×</span><span /><span className="mark-o">○</span><span /><span className="mark-x">×</span></div><div className="tic-footer"><span>BEST OF THREE</span><span>ROUND 2 / 3</span></div></div><div className="trivia-card"><span className="trivia-dots">✦ &nbsp; ✧ &nbsp; ✦</span><span className="trivia-caption">CHANNEL TRIVIA · 03 / 05</span><b>Which city is Australia's capital?</b><div className="answer-grid"><span>Sydney</span><span className="answer-correct">Canberra <Check size={12} /></span><span>Melbourne</span><span>Perth</span></div></div><div className="game-float">+ 140 XP <Trophy size={13} /></div></div></div><div className="game-chips">{gameNames.map((game, index) => <span className={index === 0 || index === 4 || index === 12 ? "game-chip game-chip--highlight" : "game-chip"} key={game}>{game}</span>)}</div></div>
        </section>

        <section className="section section--routines" id="routines">
          <div className="section-wrap routines-layout"><div className="feature-copy"><p className="eyebrow"><span>06</span> THE EVERYDAY STUFF</p><h2>Set a few things<br />in <em>motion.</em></h2><p>Let your server keep its own rhythm. Schedule reminders, tidy up a busy bot channel or set a slow hour at night. Little jobs can run quietly in the background.</p><div className="routine-quick"><span className="quick-symbol"><WandSparkles size={17} /></span><div><b>Shortcuts, your style</b><small>Make a custom command answer with a note, link or reaction.</small></div></div><button className="subtle-button" type="button" onClick={() => setDialog("dashboard")}>Shape a routine <ArrowRight size={15} /></button></div><div className="routine-board"><div className="routine-board-head"><div><span className="builder-overline">A TUESDAY IN YOUR SERVER</span><b>On the quiet schedule</b></div><span className="routine-calendar">↗ &nbsp;This week</span></div><div className="routine-track">{routines.map((item) => <div className="routine-item" key={item.time}><span className="routine-time">{item.time}</span><span className="timeline-dot">{item.icon}</span><div className="routine-info"><b>{item.label}</b><small>{item.channel}</small></div><span className="routine-check"><Check size={12} /></span></div>)}</div><div className="routine-board-foot"><span><span className="online-dot" /> 4 routines queued</span><button type="button" onClick={() => setDialog("dashboard")}>Manage <ArrowRight size={13} /></button></div></div></div>
        </section>

        <section className="section section--permissions" id="security">
          <div className="section-wrap permissions-layout"><div className="permission-visual"><div className="access-card"><div className="access-top"><span className="round-icon round-icon--mint"><LockKeyhole size={16} /></span><div><small>ACCESS SETTINGS</small><b>Who can change what?</b></div><span className="access-more">•••</span></div><div className="owner-line"><span className="avatar avatar--navy">O</span><div><b>Server owner</b><small>Everything · always</small></div><span className="owner-shield"><ShieldCheck size={14} /></span></div><div className="access-rule"><span className="rule-avatar avatar--coral">M</span><div><b>Moderator team</b><small>Welcomer settings</small></div><span className="rule-control">Assigned <ChevronDown size={12} /></span></div><div className="access-rule"><span className="rule-avatar avatar--lavender">J</span><div><b>Jonas</b><small>All tools and settings</small></div><span className="rule-control">Assigned <ChevronDown size={12} /></span></div><button className="add-access" type="button" onClick={() => setDialog("dashboard")}>＋ &nbsp;Give someone access</button><div className="access-foot"><LockKeyhole size={12} /> Access is removed when a member leaves.</div></div><div className="permission-note"><span>◈</span> Small keys, only where you want them.</div></div><div className="feature-copy"><p className="eyebrow"><span>07</span> THE KEYS STAY WITH YOU</p><h2>Help your team<br />help <em>their way.</em></h2><p>Keep control close, then share just the pieces your team needs. Give a role permission to manage welcomes, or let a trusted person look after everything.</p><div className="permission-list"><div><span className="permission-check"><Check size={12} /></span><span><b>Choose a role or a person</b><small>Give access by tool or across the whole setup.</small></span></div><div><span className="permission-check"><Check size={12} /></span><span><b>Shape every command</b><small>Set who can use it, where it works and its cooldown.</small></span></div><div><span className="permission-check"><Check size={12} /></span><span><b>Keep chat tidy</b><small>Choose when bot replies should disappear.</small></span></div></div></div></div>
        </section>

        <section className="section section--commands"><div className="section-wrap commands-layout"><div className="commands-copy"><p className="eyebrow"><span>08</span> LITTLE DETAILS, YOUR RULES</p><h2>Every command<br />has <em>its place.</em></h2><p>Give each shortcut its own audience and home. Add a pause between uses, or clear away the bot's reply after it's done its job.</p></div><div className="command-list"><div className="command-head"><span>COMMAND</span><span>WHO CAN USE IT</span><span>EXTRA</span></div><div className="command-row"><code>/rank</code><span className="everyone-pill">Everyone</span><span className="command-note">Any channel</span></div><div className="command-row"><code>/leaderboard</code><span className="role-pill"><span /> 2 roles</span><span className="command-note">30 sec cooldown</span></div><div className="command-row"><code>/welcome</code><span className="role-pill"><span /> Welcome managers</span><span className="command-note">Private reply</span></div><div className="command-row"><code>/ping</code><span className="everyone-pill">Everyone</span><span className="command-note">Reply clears in 10s</span></div><div className="command-footer"><span><LockKeyhole size={13} /> Set the boundaries once.</span><span>Then get back to chatting. <ArrowRight size={13} /></span></div></div></div></section>

        <section className="section section--faq" id="faq"><div className="section-wrap faq-layout"><div><p className="eyebrow"><span>09</span> A FEW QUICK ANSWERS</p><h2>Before you<br /><em>jump in.</em></h2><p className="faq-intro">A couple of details to make the first step easier.</p><a href="#newsletter" className="text-link">Still curious? Write us a note <ArrowRight size={14} /></a></div><div className="faq-list"><details><summary>What does this demo connect to?<span>+</span></summary><p>Nothing external. It is a front-end concept that demonstrates how a community bot site could feel; it does not connect to a chat platform or operate a bot.</p></details><details><summary>Can I switch off things I don't need?<span>+</span></summary><p>That is the idea shown in the dashboard mockup: choose the modules that fit your community and leave the rest switched off.</p></details><details><summary>Does the newsletter form send my email?<span>+</span></summary><p>No. Submitting it only shows an on-page demo message. This version has no newsletter service or mailing list connected.</p></details><details><summary>Where can I try the games?<span>+</span></summary><p>The game cards are illustrative. A live bot and a connected chat server would be needed to play.</p></details></div></div></section>

        <section className="closing-cta"><div className="cta-spark cta-spark--left">✧</div><div className="cta-spark cta-spark--right">✦</div><div className="cta-inner"><span className="cta-face"><Face /></span><p className="eyebrow">LESS BUSYWORK. MORE COMMUNITY.</p><h2>Make room for<br /><em>the good bits.</em></h2><p>See what a little help can do for your server.</p><button className="button button--dark button--large" type="button" onClick={() => setDialog("invite")}>Meet MEE7 <ArrowRight size={17} /></button><span className="cta-small">This is a visual demo, not a live bot invite.</span></div></section>
      </main>

      <footer className="footer" id="newsletter"><div className="section-wrap"><div className="footer-top"><div className="footer-brand"><a className="brand brand--footer" href="#top"><Face /><span>MEE<span className="brand-seven">7</span></span><span className="brand-dot" /></a><p>A little helper for happier<br />chat communities.</p><span className="footer-footnote"><span className="footer-spark">✳</span> Independently imagined for this demo.</span></div><div className="footer-links"><div><b>EXPLORE</b><a href="#features">Features</a><a href="#games">Games</a><a href="#routines">Routines</a><button type="button" onClick={() => setDialog("dashboard")}>Dashboard preview</button></div><div><b>HERE TO HELP</b><a href="#faq">Quick answers</a><a href="#security">Permissions</a><a href="#newsletter">Contact</a></div><div><b>THE FINE PRINT</b><button type="button" onClick={() => setDialog("legal")}>Privacy note</button><button type="button" onClick={() => setDialog("legal")}>Terms note</button><button type="button" onClick={() => setDialog("legal")}>About this demo</button></div></div></div><div className="newsletter-box"><div className="newsletter-copy"><span className="newsletter-icon"><Music2 size={17} /></span><div><p className="eyebrow">NOTES FROM MEE7</p><h3>A good update, now and then.</h3><p>Occasional ideas, new features and community news. No noisy inbox.</p></div></div><form className="newsletter-form" onSubmit={submitNewsletter} noValidate><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-input-row"><input id="newsletter-email" type="email" value={newsletter} onChange={(event) => { setNewsletter(event.target.value); setNewsletterSent(false); }} placeholder="you@example.com" autoComplete="email" required /><button className="button button--primary" type="submit">Sign me up <ArrowRight size={14} /></button></div><label className="consent-row"><input type="checkbox" checked={newsletterOk} onChange={(event) => setNewsletterOk(event.target.checked)} required /><span>Yes, send me occasional updates. I can opt out any time.</span></label><p className={`newsletter-response${newsletterSent ? " newsletter-response--visible" : ""}`} aria-live="polite">{newsletterSent ? "Thanks for trying the demo. Your email stays here; no message was sent." : newsletter && !newsletter.includes("@") ? "Add a valid email address to continue." : "This preview doesn't store or send email addresses."}</p></form></div><div className="footer-bottom"><span>© 2026 MEE7 concept · Made with care for chat communities</span><a href="#top">Back to the beginning ↑</a><span className="footer-version">PAGE CONCEPT / 01</span></div></div></footer>
      <Modal kind={dialog} onClose={() => setDialog(null)} />
    </div>
  );
}
