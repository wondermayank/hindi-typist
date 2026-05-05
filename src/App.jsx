import React, { useState, useEffect, useRef, useCallback } from "react";
import { hindiUnicodes, englishUnicode } from "./engine/charmap";
import { engToHindi } from "./engine/utilities/eng_to_hindi_mapping";

const keyMap = engToHindi(englishUnicode, hindiUnicodes);

const WORDS = [
  "गूगल", "भारत", "हिंदी", "नमस्ते", "विद्यालय",
  "सरकार", "राज्य", "जनता", "समाज", "शिक्षा",
  "परिवार", "दिल्ली", "मुंबई", "कलाकार", "संस्कृति",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [words] = useState(() => shuffle(WORDS).slice(0, 10));
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [feedback, setFeedback] = useState("idle");
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [lastHindiKey, setLastHindiKey] = useState("");
  const [lastEngKey, setLastEngKey] = useState("");
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const sentence = words[wordIdx] || "";
  const progress = Math.round(((wordIdx + charIdx / (sentence.length || 1)) / words.length) * 100);

  useEffect(() => {
    if (started && !completed) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started, completed]);

  const handleKey = useCallback((e) => {
    if (completed) return;
    const key = e.key;
    if (!started) setStarted(true);
    const hindi = keyMap.get(key);
    setLastEngKey(key);
    setLastHindiKey(hindi || "");
    if (!hindi) return;
    const expected = sentence[charIdx];
    if (hindi === expected) {
      setFeedback("correct");
      const nextChar = charIdx + 1;
      if (nextChar >= sentence.length) {
        setScore(s => s + 1);
        const nextWord = wordIdx + 1;
        if (nextWord >= words.length) {
          setCompleted(true);
          clearInterval(timerRef.current);
        } else {
          setWordIdx(nextWord);
          setCharIdx(0);
        }
      } else {
        setCharIdx(nextChar);
      }
    } else {
      setFeedback("wrong");
      setErrors(er => er + 1);
    }
  }, [charIdx, completed, sentence, started, wordIdx, words.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const fmt = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  const accuracy = score + errors > 0 ? Math.round((score / (score + errors)) * 100) : 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f172a; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.5} }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", background: "#1e293b", borderBottom: "1px solid #334155" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: 28, background: "linear-gradient(135deg,#f97316,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ट</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>TypeHindi</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[["⏱", fmt(elapsed)], ["✓", `${score}/${words.length}`], ["✗", errors], ["%", accuracy]].map(([label, val]) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#94a3b8", background: "#0f172a", padding: "6px 14px", borderRadius: 20 }}>
              <span style={{ color: "#64748b" }}>{label}</span>{val}
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px", gap: 24, maxWidth: 800, margin: "0 auto", width: "100%" }}>

        {completed ? (
          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 20, padding: 48, textAlign: "center", width: "100%", maxWidth: 480, marginTop: 40 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: 28, color: "#f1f5f9", marginBottom: 32 }}>शाबाश! Excellent!</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[["⏱ " + fmt(elapsed), "समय / Time"], [accuracy + "%", "शुद्धता / Accuracy"], [errors, "गलतियाँ / Errors"], [Math.round(score / ((elapsed / 60) || 1)), "WPM शब्द/मि."]].map(([val, key]) => (
                <div key={key} style={{ background: "#0f172a", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#f97316" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{key}</div>
                </div>
              ))}
            </div>
            <button onClick={() => window.location.reload()} style={{ background: "linear-gradient(135deg,#f97316,#fb923c)", color: "white", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'Tiro Devanagari Hindi', serif" }}>
              फिर से खेलें / Play Again
            </button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div style={{ width: "100%", height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#f97316,#fb923c)", borderRadius: 3, transition: "width .3s ease" }} />
            </div>

            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>शब्द {wordIdx + 1} / {words.length}</div>

            {/* Typing Area */}
            <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 16, padding: "40px 40px", width: "100%", textAlign: "center", minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: 52, lineHeight: 1.4, letterSpacing: 6 }}>
                <span style={{ color: "#22c55e" }}>{sentence.substring(0, charIdx)}</span>
                <span style={{ color: feedback === "wrong" ? "#ef4444" : "#f97316", borderBottom: `3px solid ${feedback === "wrong" ? "#ef4444" : "#f97316"}`, paddingBottom: 2 }}>{sentence[charIdx]}</span>
                <span style={{ color: "#475569" }}>{sentence.substring(charIdx + 1)}</span>
              </div>

              {!started && (
                <div style={{ fontSize: 14, color: "#64748b", animation: "pulse 2s infinite" }}>कोई भी कुंजी दबाएं / Press any key to start</div>
              )}

              {started && lastEngKey && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, fontWeight: 600 }}>
                  <span style={{ background: "#334155", padding: "4px 12px", borderRadius: 6, fontFamily: "monospace", fontSize: 20, color: "#e2e8f0" }}>{lastEngKey}</span>
                  <span style={{ color: "#64748b" }}>→</span>
                  <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: 28, color: feedback === "correct" ? "#22c55e" : feedback === "wrong" ? "#ef4444" : "#94a3b8" }}>{lastHindiKey || "?"}</span>
                </div>
              )}
            </div>

            {/* Hint */}
            <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: 16, width: "100%", textAlign: "center" }}>
              <p style={{ fontSize: 15, color: "#94a3b8", fontWeight: 500 }}>
                अगला अक्षर / Next: <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: 22, color: "#f97316" }}>{sentence[charIdx]}</span>
              </p>
              <p style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>Remington keyboard layout — find the key that maps to this Hindi character</p>
            </div>
          </>
        )}
      </div>

      <div style={{ textAlign: "center", padding: 20, fontSize: 13, color: "#475569", background: "#1e293b", borderTop: "1px solid #334155" }}>
        TypeHindi · Remington Keyboard Layout · हिंदी टाइपिंग सीखें
      </div>
    </div>
  );
}
