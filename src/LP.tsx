import { useState, useEffect, useRef } from "react";

/* ─── CONFIG — edite aqui ─────────────────────────────── */
const TARGET_DATE = new Date("2025-07-07T14:00:00-03:00");
const WA_GROUP    = "https://chat.whatsapp.com/LINK_DO_GRUPO_AQUI";
const HERO_DESKTOP = "/publichero-desktop.png";
const HERO_TABLET  = "/publichero-tablet.png";
const HERO_MOBILE  = "/publichero-mobile.png";
/* ────────────────────────────────────────────────────── */

const LOGOS = [
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/ab2d1716f2f007090ea392015c98cbc5f27c7ffc?width=150", bg: "#FFA725" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/324bda9d18b94b97979db2fd74b1fa2c84fa1822?width=150", bg: "rgba(255,0,0,.10)" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/d62faaa7b81c52948f1e4c74e14d0d8c45216069?width=132", bg: "#242424" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/2e3d4d2d95593c20ffcaf929eb030c6c1d80a47d?width=150", bg: "rgba(255,0,0,.10)" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/e90adb0a84671dcf7365a1b4e6358623d3c0773f?width=166", bg: "rgba(255,0,0,.10)" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/77be5e6436eaa5e3cdaf140d40dd6cca4b25747f?width=166", bg: "rgba(255,0,0,.10)" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/f30339ee770c61544057f192b1b01f93f86651c2?width=166", bg: "#F87025" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/ca068a7a0ccc28b9fe9bb7410a0926017fe01b5c?width=166", bg: "#000" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/7e819e2e959e35d4f24b2a9ecebf06f5dff41c94?width=166", bg: "#000" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/155fbfc165bfa2687f5dff2b6ace597f1539158a?width=166", bg: "#000" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/58f8e5f90635486d580fb6e8130b216ca9063b89?width=166", bg: "#000" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/e3c594ec7b819633930ebca6d799c1a25e4f6ca3?width=148", bg: "rgba(255,0,0,.10)" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/b8058ea2a3613eeb5fbc8153c6bb59273d677935?width=148", bg: "rgba(255,0,0,.10)" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/a079a9d3926bde51d394d0b90bb80674cc5e9fbc?width=148", bg: "rgba(255,0,0,.10)" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=148", bg: "rgba(255,0,0,.10)" },
];

const CARDS = [
  { n: "01", t: "ESTRATÉGIA DE AQUISIÇÃO",  d: "Como estruturamos campanhas que trouxeram centenas de novos clientes todos os meses para a Monalisa." },
  { n: "02", t: "FUNIL DE VENDAS",           d: "O funil completo que converte visitantes em clientes fiéis e aumenta o ticket médio de forma previsível." },
  { n: "03", t: "ESCALA OPERACIONAL",        d: "Como a Monalisa se preparou operacionalmente para atender 5× mais clientes sem perder qualidade." },
  { n: "04", t: "RETENÇÃO & RECORRÊNCIA",    d: "Estratégias que fizeram clientes voltarem toda semana, criando uma máquina de receita previsível." },
];

const OPTIONS = [
  { id: "delivery",      icon: "🛵", label: "Somente delivery" },
  { id: "del_salao",     icon: "🍕", label: "Delivery & Salão" },
  { id: "ifood_99",      icon: "📱", label: "iFood e 99Food" },
  { id: "ifood",         icon: "🔴", label: "iFood" },
  { id: "cardapio",      icon: "📋", label: "Uso cardápio digital" },
  { id: "todas",         icon: "✅", label: "Todas as opções acima" },
];

/* ── helpers ── */
function pad(n: number) { return String(n).padStart(2, "0"); }

function useCountdown(target: Date) {
  const calc = () => {
    const d = target.getTime() - Date.now();
    if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(d / 86400000),
      hours:   Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000)  / 60000),
      seconds: Math.floor((d % 60000)    / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

/* ── sub-components ── */
function CdBlock({ v, label }: { v: string; label: string }) {
  return (
    <div className="cd-block">
      <span className="cd-digit">{v}</span>
      <span className="cd-label">{label}</span>
    </div>
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);
  return (
    <div>
      <p style={{ color: "#555", fontSize: 10, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4 }}>
        A live começa em
      </p>
      <p style={{ color: "#FE7B02", fontSize: 11, fontWeight: 700, letterSpacing: "1px", marginBottom: 10 }}>
        07/07 às 14h
      </p>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
        <CdBlock v={pad(days)}    label="dias" />
        <span className="cd-sep">:</span>
        <CdBlock v={pad(hours)}   label="horas" />
        <span className="cd-sep">:</span>
        <CdBlock v={pad(minutes)} label="min" />
        <span className="cd-sep">:</span>
        <CdBlock v={pad(seconds)} label="seg" />
      </div>
    </div>
  );
}

function HeroContent({ onCTA }: { onCTA: () => void }) {
  return (
    <div>
      <div className="r1" style={{ marginBottom: 16 }}>
        <span className="pill">LIVE GRATUITA • VAGAS LIMITADAS</span>
      </div>

      <h1 className="r2" style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: "clamp(34px, 6.5vw, 58px)",
        lineHeight: 1.0,
        textTransform: "uppercase",
        letterSpacing: "-.5px",
        marginBottom: 16,
      }}>
        <span style={{ color: "#FF4D00" }} className="glow">DESCUBRA </span>
        <span style={{ color: "#fff" }}>COMO A</span><br />
        <span style={{ color: "#fff" }}>MONALISA SAIU DE</span><br />
        <span style={{ color: "#fff" }}>R$ 100 MIL PARA</span><br />
        <span style={{ color: "#FF4D00" }} className="glow">R$ 500 MIL/MÊS</span>
      </h1>

      <p className="r3" style={{ color: "#888", fontSize: 14, lineHeight: "24px", marginBottom: 24 }}>
        Vou revelar em uma <strong style={{ color: "#F5F5F5" }}>live exclusiva</strong> a estratégia
        que multiplicou o faturamento da <strong style={{ color: "#F5F5F5" }}>Monalisa Pizzaria</strong> em menos de 12 meses.
      </p>

      <div className="r4" style={{ marginBottom: 24 }}><Countdown /></div>

      <div className="r5">
        <button onClick={onCTA} className="btn-cta" style={{ width: "100%", maxWidth: 420, padding: "17px 32px", fontSize: 15 }}>
          QUERO GARANTIR MINHA VAGA →
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function LP() {
  const [selected, setSelected]   = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => quizRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const handleSend = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => window.open(WA_GROUP, "_blank"), 700);
  };

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>

      {/* ══ HERO ════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>

        {/* — MOBILE (< 768px) — */}
        <div className="hero-mobile">
          <div style={{ position: "relative", paddingBottom: "140%" }}>
            <img src={HERO_MOBILE} alt="" style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 15%",
            }} />
            {/* gradient — starts at ~55% to keep person visible */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
              background: "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,.6) 35%, rgba(10,10,10,.95) 65%, #0A0A0A 85%)",
            }} />

            {/* badges */}
            <div className="badge badge-float badge-float-1" style={{ position: "absolute", top: "42%", right: "3%", minWidth: 68, padding: "6px 10px" }}>
              <p style={{ color: "#FE7B02", fontSize: 13, fontWeight: 700 }}>+200</p>
              <p style={{ color: "#777", fontSize: 7, fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase" }}>Clientes/dia</p>
            </div>
            <div className="badge badge-float badge-float-2" style={{ position: "absolute", top: "35%", left: "3%", minWidth: 68, padding: "6px 10px" }}>
              <p style={{ color: "#FE7B02", fontSize: 13, fontWeight: 700 }}>5×</p>
              <p style={{ color: "#777", fontSize: 7, fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase" }}>Crescimento</p>
            </div>
            <div className="badge badge-float badge-float-3" style={{ position: "absolute", top: "12%", right: "3%", minWidth: 68, padding: "6px 10px" }}>
              <p style={{ color: "#FE7B02", fontSize: 13, fontWeight: 700 }}>+R$500k</p>
              <p style={{ color: "#777", fontSize: 7, fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase" }}>Faturamento/mês</p>
            </div>

            {/* text overlaid on gradient area */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "0 20px 24px", zIndex: 10, textAlign: "center",
            }}>
              <HeroContent onCTA={scrollToQuiz} />
            </div>
          </div>
        </div>

        {/* — TABLET (768px – 1023px) — */}
        <div className="hero-tablet">
          <div style={{ position: "relative", paddingBottom: "90%" }}>
            <img src={HERO_TABLET} alt="" style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center top",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(to bottom, transparent, #0A0A0A)",
            }} />

            {/* badges — corners */}
            <div className="badge badge-float badge-float-1" style={{ position: "absolute", top: "5%", right: "6%", minWidth: 80, padding: "8px 12px" }}>
              <p style={{ color: "#FE7B02", fontSize: 16, fontWeight: 700 }}>+200</p>
              <p style={{ color: "#777", fontSize: 9, fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase" }}>Clientes/dia</p>
            </div>
            <div className="badge badge-float badge-float-2" style={{ position: "absolute", top: "5%", left: "6%", minWidth: 80, padding: "8px 12px" }}>
              <p style={{ color: "#FE7B02", fontSize: 16, fontWeight: 700 }}>5×</p>
              <p style={{ color: "#777", fontSize: 9, fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase" }}>Crescimento</p>
            </div>
            <div className="badge badge-float badge-float-3" style={{ position: "absolute", bottom: "38%", right: "5%", minWidth: 80, padding: "8px 12px" }}>
              <p style={{ color: "#FE7B02", fontSize: 16, fontWeight: 700 }}>+R$500k</p>
              <p style={{ color: "#777", fontSize: 9, fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase" }}>Faturamento/mês</p>
            </div>
          </div>

          {/* text below image */}
          <div style={{ padding: "0 40px 48px", marginTop: -24, position: "relative", zIndex: 10, textAlign: "center" }}>
            <HeroContent onCTA={scrollToQuiz} />
          </div>
        </div>

        {/* — DESKTOP (≥ 1024px) — */}
        <div className="hero-desktop" style={{ position: "relative", minHeight: "clamp(560px, 75vh, 700px)" }}>
          <img src={HERO_DESKTOP} alt="" style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "left center",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(10,10,10,0) 10%, rgba(10,10,10,.55) 44%, rgba(10,10,10,.97) 74%, #0A0A0A 100%)",
          }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, #0A0A0A)" }} />

          {[
            { v: "5×",       l: "Crescimento",     top: "52%", left: "8%",  rot: -5, cls: "badge-float-1" },
            { v: "+R$500k",  l: "Faturamento/mês",  top: "73%", left: "26%", rot: 0,  cls: "badge-float-2" },
            { v: "+200",     l: "Clientes/dia",     top: "61%", left: "36%", rot: 4,  cls: "badge-float-3" },
          ].map((b) => (
            <div key={b.v} className={`badge badge-float ${b.cls}`} style={{ position: "absolute", top: b.top, left: b.left, minWidth: 88, transform: `rotate(${b.rot}deg)`, zIndex: 5 }}>
              <p style={{ color: "#FE7B02", fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{b.v}</p>
              <p style={{ color: "#777", fontSize: 9, fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase", marginTop: 3 }}>{b.l}</p>
            </div>
          ))}

          <div style={{
            position: "relative", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            minHeight: "clamp(560px, 75vh, 700px)",
          }}>
            <div style={{ width: "clamp(320px, 48%, 540px)", padding: "48px clamp(24px, 5vw, 72px) 48px 0" }}>
              <HeroContent onCTA={scrollToQuiz} />
            </div>
          </div>
        </div>

        {/* ── LOGO STRIP ── */}
        <div style={{ borderTop: ".8px solid #161616", borderBottom: ".8px solid #161616", padding: "14px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <div key={i} style={{
                width: 66, height: 66, flexShrink: 0,
                background: l.bg, borderRadius: 4, margin: "0 5px",
                display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
              }}>
                <img src={l.src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEARNING ════════════════════════════ */}
      <section className="section-learn">
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>

          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: "#FE7B02", fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 14 }}>
              ── O QUE VOCÊ VAI APRENDER ──
            </p>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(26px, 5vw, 44px)",
              lineHeight: 1.1,
              textTransform: "uppercase",
              margin: 0,
            }}>
              <span style={{ color: "#F5F5F5" }}>O MÉTODO QUE GEROU </span>
              <span style={{ color: "#FF4D00" }} className="glow">+R$ 500 MIL/MÊS</span>
            </h2>
          </div>

          {/* cards */}
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
            {CARDS.map((c, i) => (
              <div key={c.n} className={`card stack-card stack-card-${i}`} style={{ padding: 28 }}>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  color: "rgba(255,77,0,.2)",
                  fontSize: "clamp(38px, 5vw, 54px)",
                  lineHeight: 1, marginBottom: 12, letterSpacing: -1,
                }}>{c.n}</p>
                <p style={{ color: "#F5F5F5", fontSize: 12, fontWeight: 700, letterSpacing: "1.3px", textTransform: "uppercase", marginBottom: 10, lineHeight: 1.4 }}>{c.t}</p>
                <p style={{ color: "#7a7a7a", fontSize: 14, lineHeight: "22px", margin: 0 }}>{c.d}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={scrollToQuiz} className="btn-cta" style={{ padding: "18px 48px", fontSize: 15, width: "100%", maxWidth: "min(520px, 100%)" }}>
              QUERO GARANTIR MINHA VAGA →
            </button>
          </div>
        </div>
      </section>

      {/* ══ QUIZ ════════════════════════════════ */}
      <section className="section-quiz">
        <div ref={quizRef} style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className="quiz-box">

            {submitted ? (
              <div className="pop-in" style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(255,77,0,.12)", border: "1.5px solid rgba(255,77,0,.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", fontSize: 28,
                }}>✅</div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: 26,
                  color: "#F5F5F5", textTransform: "uppercase",
                  margin: "0 0 10px",
                }}>Perfeito!</h3>
                <p style={{ color: "#777", fontSize: 14, lineHeight: "22px", margin: 0 }}>
                  Te redirecionando para o grupo do WhatsApp...
                </p>
              </div>
            ) : (
              <>
                {/* vaga badge */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <div className="vaga-badge">
                    <span className="dot-live" />
                    <span style={{ color: "#FE7B02", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                      Vagas Limitadas
                    </span>
                  </div>
                </div>

                {/* pergunta */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(20px, 5vw, 26px)",
                    textTransform: "uppercase",
                    lineHeight: 1.2, margin: "0 0 8px",
                  }}>
                    ATUALMENTE VOCÊ JÁ<br />VENDE POR ONDE?
                  </h3>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                    Selecione a opção que melhor descreve seu negócio
                  </p>
                </div>

                {/* hand pointer */}
                <div className="hand-hint" style={{ textAlign: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>👇</span>
                </div>

                {/* opções */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {OPTIONS.map((o, i) => (
                    <button
                      key={o.id}
                      onClick={() => setSelected(o.id)}
                      className={`quiz-opt quiz-opt-anim${selected === o.id ? " sel" : ""}`}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <span className="radio" />
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{o.icon}</span>
                      <span style={{ fontWeight: selected === o.id ? 600 : 400 }}>{o.label}</span>
                      {selected === o.id && <span className="check-mark">✓</span>}
                    </button>
                  ))}
                </div>

                {/* enviar */}
                <button
                  onClick={handleSend}
                  className={`btn-cta btn-cta-quiz${selected ? " btn-cta-ready" : ""}`}
                  disabled={!selected}
                  style={{ width: "100%", height: 54, fontSize: 14 }}
                >
                  GARANTIR MINHA VAGA NO GRUPO →
                </button>

                <p style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 12, lineHeight: 1.5 }}>
                  🔒 100% gratuito. Você será direcionado ao grupo do WhatsApp.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
