import { useState, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import tulip from "../assets/tulip.png";
import { PageBackdrop, FloatingNotes } from "../components/romance.tsx";

/* ---------- Edit your content here ---------- */

const letters = [
  { title: "Thank You", poem: ["Thank you for choosing me", "even I was hard to love,", "for the patience you gave me", "before I ever asked."] },
  { title: "I'm Sorry", poem: ["I'm sorry for the words that landed heavy,", "for the moments I wasn't listening right.", "You deserve softness, and I'm learning", "to be the one who gives it."] },
  { title: "I Understand", poem: ["I'm learning to hear what sits under your silence,", "the tired, the hurt, the things unsaid.", "You never have to walk away to be understood here.", "I'll listen till the whole story is said."] },
  { title: "I'll Stay", poem: ["Storms will come, and so will I.", "Not to win, not to prove,", "only to sit beside you", "until the sky remembers blue."] },
  { title: "For Our Future", poem: ["One day, a small kitchen,", "your laugh in every room,", "tulips on the windowsill,", "and me, still choosing you."] },
];

const littleThings = [
  { icon: "😄", title: "The way you laugh", text: "It starts small, then takes over your whole face, and my whole day gets better." },
  { icon: "🗣️", title: "Your random stories", text: "The ones that begin in the middle and somehow always end up perfect." },
  { icon: "🌙", title: "Staying up talking", text: "Those late nights when the world went quiet and it was just your voice and mine." },
  { icon: "👀", title: "What you don't realize I notice", text: "How you go quiet when something's wrong, and how you light up when you're excited." },
];

const heartLines = [
  { who: "her", text: "What if the worries return?" },

  { who: "me", text: "Then I'll face them with courage instead of letting them speak for me." },

  { who: "her", text: "What if you need me?" },

  { who: "me", text: "I'll appreciate your support, but I'll never ask you to carry my storms alone." },

  { who: "her", text: "And if you stumble?" },

  { who: "me", text: "I'll get back up, learn from it, and keep moving forward." },

  { who: "her", text: "Why try so hard?" },

  { who: "me", text: "Because you deserve a love that brings peace, not guilt." },

  { who: "her", text: "And your promise?" },

  { who: "me", text: "To keep growing, keep understanding, and keep choosing us." },
];

// x / y are percentages inside the sky. Replace with your real memories.
const stars = [
  { x: 12, y: 22, title: "The day you smiled", text: "This star reminds me of the day you smiled at me when I needed it most." },
  { x: 30, y: 62, title: "Your laugh", text: "Somewhere out there is a sound like your laugh. I'd know it anywhere." },
  { x: 47, y: 25, title: "A compliment", text: "You make ordinary days feel like they were planned just for us." },
  { x: 63, y: 70, title: "Late night talks", text: "Every hour we stayed up talking is a star I never want to lose." },
  { x: 78, y: 32, title: "A tiny poem", text: "You are my quiet place, my loudest joy, and the best part of every day." },
  { x: 88, y: 66, title: "What I promise", text: "I'll keep showing up, keep listening, and keep learning you." },
];

/* ---------- Pieces ---------- */

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">{subtitle}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Letter({ index, title, poem }: { index: number; title: string; poem: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border border-glass-border bg-glass p-5 shadow-panel-pink backdrop-blur-2xl">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="relative block h-28 w-full overflow-hidden rounded-xl bg-[#f3d9d2] text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        style={{ perspective: 600 }}
      >
        {/* envelope flap */}
        <span
          className="absolute inset-x-0 top-0 block h-16 bg-[#e8bdb3]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformOrigin: "top",
            transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
            transition: "transform 700ms cubic-bezier(.4,0,.2,1)",
          }}
        />
        <span className="absolute inset-x-0 bottom-3 font-hand text-2xl text-[#7a4a4a]">
          Letter #{index + 1}: {title}
        </span>
      </button>

      {/* paper slides open */}
      <div
        className="grid transition-[grid-template-rows] duration-700 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="mt-4 rounded-lg p-6 font-hand text-2xl leading-9 text-[#5a3b3b] shadow-inner"
            style={{
              background: "repeating-linear-gradient(#fffaf3, #fffaf3 35px, #f1e3d6 36px)",
              opacity: open ? 1 : 0,
              transition: "opacity 900ms ease 200ms",
            }}
          >
            {poem.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartTalk() {
  const [shown, setShown] = useState(1);
  const done = shown >= heartLines.length;
  return (
    <div className="rounded-3xl border border-glass-border bg-glass p-8 shadow-panel-pink backdrop-blur-2xl">
      <div className="space-y-5">
        {heartLines.slice(0, shown).map((line, i) => {
          const mine = line.who === "me";
          return (
            <div key={i} className={`hl-fade flex flex-col ${mine ? "items-end" : "items-start"}`}>
              <span className="mb-1 font-hand text-xl text-accent">{mine ? "My heart" : "Her heart"}</span>
              <p
                className={`max-w-[85%] rounded-2xl px-5 py-3 text-lg text-foreground ${
                  mine ? "bg-accent/20" : "border border-glass-border"
                }`}
              >
                {line.text}
              </p>
            </div>
          );
        })}
      </div>
      {!done && (
        <button
          onClick={() => setShown(shown + 1)}
          className="mx-auto mt-8 block rounded-full border border-glass-border px-6 py-2 font-hand text-2xl text-accent transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          Keep listening
        </button>
      )}
      <style>{`
        @keyframes hlFade { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        .hl-fade { animation: hlFade 600ms ease both }
        @media (prefers-reduced-motion: reduce) { .hl-fade { animation: none } }
      `}</style>
    </div>
  );
}

function Constellation() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div>
      <div
        className="relative h-80 overflow-hidden rounded-3xl border border-glass-border shadow-panel-pink sm:h-96"
        style={{ background: "linear-gradient(to bottom, #1a1030, #3b1d4d)" }}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            points={stars.map((s) => `${s.x},${s.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,.25)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {stars.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(active === i ? null : i)}
            aria-label={`Open star: ${s.title}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-2 text-3xl transition-transform hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              color: active === i ? "#ffd6e7" : "#fff3b0",
              textShadow: "0 0 12px currentColor",
            }}
          >
            ★
          </button>
        ))}
      </div>
      <div className="mt-6 min-h-[8rem] rounded-3xl border border-glass-border bg-glass p-6 text-center backdrop-blur-2xl">
        {active === null ? (
          <p className="font-hand text-2xl text-muted-foreground">Tap a star to open it.</p>
        ) : (
          <>
            <h3 className="font-display text-xl text-foreground">{stars[active].title}</h3>
            <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{stars[active].text}</p>
          </>
        )}
      </div>
    </div>
  );
}

async function notifyMe(answer: string) {
  try {
    await emailjs.send(
      "service_ttea34w",
      "template_3h9u5yo",
      { answer },
      { publicKey: "nZxWp7aKcDIkBnaCd" }
    );
  } catch {
    // stay silent so she never sees an error
  }
}

function AcceptQuestion() {
  const [said, setSaid] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const dodge = () => {
    const rx = Math.min(140, Math.max(40, window.innerWidth / 2 - 120));
    let x = pos.x;
    let y = pos.y;
    for (let i = 0; i < 20; i++) {
      x = (Math.random() * 2 - 1) * rx;
      y = (Math.random() * 2 - 1) * 90;
      if (Math.hypot(x - pos.x, y - pos.y) >= 90) break;
    }
    setPos({ x, y });
  };

  const sayYes = () => {
    setSaid(true);
    notifyMe("Yes 💗");
  };

  return (
    <section className="relative mx-auto max-w-xl px-6 pb-10 pt-10 text-center">
      <div className="relative rounded-3xl border border-glass-border bg-glass p-10 shadow-panel-pink backdrop-blur-2xl">
        <h2 className="font-display text-3xl text-foreground sm:text-4xl">
          Would you still accept me again?
        </h2>

        {!said ? (
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={sayYes}
              className="relative z-10 rounded-full bg-accent px-8 py-3 font-hand text-2xl text-white transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Yes 🌷
            </button>
            <button
              tabIndex={-1}
              aria-disabled="true"
              onPointerEnter={dodge}
              onPointerDown={dodge}
              onClick={(e) => {
                e.preventDefault();
                dodge();
              }}
              className="rounded-full border border-glass-border px-8 py-3 font-hand text-xl text-accent transition-transform duration-200"
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            >
              I need a little more time
            </button>
          </div>
        ) : (
          <div className="aq-fade mt-8">
            <p className="font-hand text-4xl text-accent">Thank you. I promise to earn it every day. 🌷</p>
            {["💗", "🌷", "💗", "🌸", "💗", "🌷"].map((h, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="aq-heart absolute bottom-0 text-3xl"
                style={{ left: `${10 + i * 15}%`, animationDelay: `${i * 250}ms` }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <style>{`
          @keyframes aqFade { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
          @keyframes aqFloat { from { opacity: 1; transform: translateY(0) } to { opacity: 0; transform: translateY(-260px) } }
          .aq-fade { animation: aqFade 600ms ease both }
          .aq-heart { animation: aqFloat 2600ms ease-out both }
          @media (prefers-reduced-motion: reduce) { .aq-fade, .aq-heart { animation: none } }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function home() {
  return (
    <PageBackdrop>
      <FloatingNotes />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 pb-40 pt-28 text-center">
        <div className="rounded-3xl border border-glass-border bg-glass p-12 shadow-panel-pink backdrop-blur-2xl">
          <img src={tulip} alt="" loading="lazy" className="mx-auto h-16 w-auto" />
          <h1 className="mt-6 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            A Place You Can Always Return To
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            I know you already push me away but focus on the little things, the moments that make us smile, and the love that keeps us together. I hope these letters remind you of how much you mean to me.
          </p>
          <p className="mt-8 font-hand text-4xl text-accent">— yours, Alex qt</p>
        </div>
      </section>

      <Section title="Letters I Never Want Left Unsaid 💌" subtitle="Five letters, sealed for you. Tap an envelope to open it.">
        <div className="space-y-6">
          {letters.map((l, i) => (
            <Letter key={l.title} index={i} title={l.title} poem={l.poem} />
          ))}
        </div>
      </Section>

      <Section title="The Little Things 🌸" subtitle="Not the grand gestures. The small moments I'd notice anywhere.">
        <div className="grid gap-5 sm:grid-cols-2">
          {littleThings.map((t) => (
            <div key={t.title} className="rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-2xl">
              <div className="text-3xl">{t.icon}</div>
              <h3 className="mt-3 font-display text-xl text-foreground">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center font-hand text-3xl leading-10 text-accent">
          I'm sorry for the moments I made you upset. I never want those moments to overshadow the
          countless little things that make me grateful for you.
        </p>
      </Section>

      <Section title="This is a conversation take some time to read ❤️" subtitle="Click the button to keep listening.">
        <HeartTalk />
      </Section>

      <Section title="Memory Constellation ✨" subtitle="Every star holds a memory, a compliment, or a small poem.">
        <Constellation />
      </Section>

      <AcceptQuestion />

      <footer className="relative pb-24 text-center font-hand text-3xl text-accent">
        I'm here. I'm listening. I'm yours.
      </footer>
    </PageBackdrop>
  );
}

export default home;