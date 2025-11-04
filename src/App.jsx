// src/App.jsx
import React, { useState } from "react";
import "./index.css";

function sizeLabel(digit) {
  return digit >= 5 ? "BIG" : "SMALL";
}

function updateLatest(latest, value) {
  return [value, ...latest].slice(0, 12);
}

function computeHotCold(latest) {
  // frequency for digits 0..9
  const freq = Array(10).fill(0);
  latest.forEach(n => { freq[n] = (freq[n] || 0) + 1; });
  const indexed = freq.map((count, digit) => ({ digit, count }));
  const hot = indexed.slice().sort((a,b) => b.count - a.count).slice(0,2).map(x => x.digit);
  const cold = indexed.slice().sort((a,b) => a.count - b.count).slice(0,2).map(x => x.digit);
  return { hot, cold };
}

export default function App() {
  const [mode, setMode] = useState("mz"); // mz or mys
  const [period, setPeriod] = useState("");
  const [latest, setLatest] = useState([]); // numbers 0..9 newest first
  const [last, setLast] = useState(null);

  const accent = mode === "mz" ? "#ff3b3b" : "#22c55e";
  const platformName = mode === "mz" ? "Mzplay" : "Mysgame";

  const handleGenerate = () => {
    if (!/^\d{1,2}$/.test(period.trim())) {
      alert("Masukkan period 1–2 digit (contoh: 40 atau 7)");
      return;
    }
    const base = Number(period);
    // produce deterministic-ish number then convert to single digit (0..9)
    const raw = mode === "mz" ? ((base * 7 + 13) % 90) + 1 : ((base * 5 + 21) % 90) + 1;
    const digit = raw % 10; // single digit 0..9
    setLast(digit);
    setLatest(prev => updateLatest(prev, digit));
    setPeriod("");
  };

  const stats = computeHotCold(latest);

  return (
    <div className="page-root">
      <div className="container">
        <header className="top">
          <h1>WINGO — SMART AI VIP PREDICTOR</h1>
          <p className="sub">Single-digit mode (0–9) — V15.5</p>
        </header>

        <div className="card control">
          <div className="row">
            <div>
              <label className="lbl">Platform</label>
              <div className="mode-switch">
                <button
                  className={`m-btn ${mode === "mz" ? "active" : ""}`}
                  onClick={() => setMode("mz")}
                  style={{ borderColor: mode === "mz" ? accent : undefined }}
                >
                  Mzplay
                </button>
                <button
                  className={`m-btn ${mode === "mys" ? "active" : ""}`}
                  onClick={() => setMode("mys")}
                  style={{ borderColor: mode === "mys" ? accent : undefined }}
                >
                  Mysgame
                </button>
              </div>
            </div>

            <div>
              <label className="lbl">Enter Period (1–2 digits)</label>
              <div className="input-row">
                <input
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="e.g. 40"
                  className="period"
                  inputMode="numeric"
                />
                <button className="generate" onClick={handleGenerate} style={{ background: accent }}>
                  Generate
                </button>
              </div>
            </div>
          </div>

          <div className="result-area">
            <div className="result-left">
              <div className="result-title">Result (single digit)</div>
              <div className="big-num" style={{ borderColor: accent }}>{last !== null ? last : "—"}</div>
            </div>
            <div className="result-meta">
              <div className="meta">
                <div className="meta-label">Number</div>
                <div className="meta-value">{last !== null ? last : "—"}</div>
              </div>
              <div className="meta">
                <div className="meta-label">Color</div>
                <div className="meta-value" style={{ color: accent }}>{mode === "mz" ? "MERAH" : "HIJAU"}</div>
              </div>
              <div className="meta">
                <div className="meta-label">Size</div>
                <div className="meta-value">{last !== null ? sizeLabel(last) : "—"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Latest Results</h3>
          <div className="latest">
            {latest.length === 0 ? (
              <div className="muted">No results yet — generate one.</div>
            ) : (
              latest.map((n, i) => (
                <div
                  key={i}
                  className="bubble"
                  style={{
                    borderColor: n >= 5 ? "#ff7b7b" : "#7ee7a8",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {n}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Smart Analysis</h3>
          <div className="analysis">
            <div className="a-col">
              <div className="a-title">Hot Numbers</div>
              <div className="chips">
                {stats.hot.length ? stats.hot.map(h => <div key={h} className="chip hot">{h}</div>) : <div className="muted">—</div>}
              </div>
            </div>
            <div className="a-col">
              <div className="a-title">Cold Numbers</div>
              <div className="chips">
                {stats.cold.length ? stats.cold.map(c => <div key={c} className="chip cold">{c}</div>) : <div className="muted">—</div>}
              </div>
            </div>
          </div>
        </div>

        <footer className="foot">Mode active: <strong style={{ color: accent }}>{platformName}</strong></footer>
      </div>
    </div>
  );
                    }
