import { Link } from "react-router-dom";
import VoiceOrb from "../components/VoiceOrb";

const CONTACT = {
  phone: "9641591708",
  email: "sahilsarki724@gmail.com",
  portfolio: "https://sahilssarki676-arch.github.io/Sahil-portfolio-/#contact",
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-void">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-light shadow-glow" />
          <span className="font-display text-lg font-semibold">Light</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#booking" className="hidden text-sm text-ink-muted hover:text-ink sm:inline">
            Book a call
          </a>
          <Link to="/login" className="btn-primary !px-4 !py-2 text-xs">
            Open Light
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-24 pt-12 text-center sm:pt-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 blur-3xl"
          style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(255,184,107,0.25), transparent 70%)" }}
          aria-hidden
        />
        <VoiceOrb state="speaking" size={110} />
        <h1 className="mt-8 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Say less. <span className="text-light">Light</span> gets it done.
        </h1>
        <p className="mt-5 max-w-xl text-balance text-base text-ink-muted sm:text-lg">
          A bilingual voice assistant that talks like a person, remembers your conversations, and
          runs the busywork of a freelance web dev practice — outreach, leads, follow-ups — so you
          can spend your time building.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/login" className="btn-primary">
            Start talking to Light
          </Link>
          <a href="#features" className="btn-ghost">
            See what it does
          </a>
        </div>
        <p className="mt-4 font-mono text-xs text-ink-faint">"Hey Light" — hands-free, English or Nepali</p>
      </header>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Talks like a person", body: "Natural voice + text chat in English and Nepali, with real memory across conversations.", accent: "light" as const },
            { title: "Hands-free", body: "Say \"Hey Light\" to wake it up. It listens, replies, and gets out of the way when you interrupt.", accent: "cyan" as const },
            { title: "Client outreach", body: "Generate WhatsApp, Email, Instagram, Facebook, and LinkedIn messages tailored to 10 business types.", accent: "light" as const },
            { title: "Lead CRM", body: "Track business name, contact, status, notes, and follow-up dates in one place.", accent: "cyan" as const },
            { title: "Live dashboard", body: "Leads, clients, revenue, messages sent, and upcoming follow-ups at a glance.", accent: "light" as const },
            { title: "Installable app", body: "Full PWA — add Light to your home screen on Android or desktop, no app store needed.", accent: "cyan" as const },
          ].map((f) => (
            <div key={f.title} className="card">
              <div className={`mb-3 h-8 w-8 rounded-lg ${f.accent === "cyan" ? "bg-cyan/20" : "bg-light/20"}`} />
              <h3 className="font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="card flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Built by Sahil Sarki</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Freelance web developer — see recent projects and the work behind Light.
            </p>
          </div>
          <a href={CONTACT.portfolio} target="_blank" rel="noreferrer" className="btn-primary shrink-0">
            View portfolio →
          </a>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="mx-auto max-w-6xl px-5 pb-24">
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Let's work together</h2>
          <p className="mt-1 text-sm text-ink-muted">Reach out directly, or leave a message below.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <a href={`tel:${CONTACT.phone}`} className="btn-ghost justify-center">
              📞 Call
            </a>
            <a
              href={`https://wa.me/977${CONTACT.phone}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost justify-center"
            >
              💬 WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-ghost justify-center">
              ✉️ Email
            </a>
          </div>

          <form
            className="mt-6 grid gap-3 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
              window.location.href = `mailto:${CONTACT.email}?subject=Project inquiry from ${encodeURIComponent(
                name
              )}&body=${encodeURIComponent(message)}`;
            }}
          >
            <input name="name" required placeholder="Your name" className="input-field" />
            <input name="email" required type="email" placeholder="Your email" className="input-field" />
            <textarea
              name="message"
              required
              placeholder="Tell me about your project…"
              rows={4}
              className="input-field resize-none sm:col-span-2"
            />
            <button type="submit" className="btn-primary sm:col-span-2">
              Send message
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-8 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} Light — built by Sahil Sarki.
      </footer>
    </div>
  );
}
