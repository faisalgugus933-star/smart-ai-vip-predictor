import React, { useState } from "react";
import "./index.css";

function sizeLabel(num) {
  const last = Number(String(num).slice(-1));
  return last >= 5 ? "BIG" : "SMALL";
}

function updateLatest(latest, value) {
  const arr = [value, ...latest];
  return arr.slice(0, 8); // keep last 8
}

function computeHotCold(latest) {
  // frequency map for last numbers (1..9)
  const freq = {};
  latest.forEach((n) => {
    const key = String(n);
    freq[key] = (freq[key] || 0) + 1;
  });
  // sort by freq desc
  const items = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const hot = items.slice(0, 2).map((i) => i[0]);
  // cold = least frequent among 0-9
  const all = Array.from({ length: 10 }, (_, i) => String(i));
  const coldSorted = all
    .map((k) => [k, freq[k] || 0])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map((i) => i[0]);
  return {
    hot,
    cold: coldSorted,
  };
}

export default function App() {
  const [mode, setMode] = useState("mz"); // mz or mys
  const [period, setPeriod] = useState("");
  const [latest, setLatest] = useState([]); // numbers
  const [lastResult, setLastResult] = useState(null);

  const platformColor = mode === "mz" ? "#ff3b3b" : "#22c55e"; // red / green
  const platformName = mode === "mz" ? "Mzplay" : "Mysgame";

  const handleGenerate = () => {
    const p = period.trim();
    if (!/^\d{1,2}$/.test(p)) {
      alert("Masukkan period (1–2 digits). Contoh: 40 atau 7");
      return;
    }
    // generate prediction number 1..99 (use deterministic-ish formula for demo)
    const base = parseInt(p, 10);
    // make formula slightly different per platform for variety
    const prediction =
      mode === "mz"
        ? ((base * 7 + 13) % 90) + 1
        : ((base * 5 + 21) % 90) + 1;

    setLastResult(prediction);
    setLatest((prev) => updateLatest(prev, prediction));
    setPeriod("");
  };

  const stats = computeHotCold(latest);

  return (
    <div className="app-root">
      <div className="container">
        <header className="header">
          <h1>SMART AI VIP PREDICTOR</h1>
          <p className="subtitle">V15.5 — Auto prediction demo</p>
        </header>

        <div className="card control-card">
          <div className="control-row">
            <div className="mode-box">
              <label className="label">Pilih Mode</label>
              <div className="mode-buttons">
                <button
                  className={`mode-btn ${mode === "mz" ? "active" : ""}`}
                  onClick={() => setMode("mz")}
                  style={{
                    borderColor: mode === "mz" ? platformColor : "rgba(255,255,255,0.08)",
                    color: mode === "mz" ? platformColor : "#fff",
                  }}
                >
                  Mzplay
                </button>
                <button
                  className={`mode-btn ${mode === "mys" ? "active" : ""}`}
                  onClick={() => setMode("mys")}
                  style={{
                    borderColor: mode === "mys" ? platformColor : "rgba(255,255,255,0.08)",
                    color: mode === "mys" ? platformColor : "#fff",
                  }}
                >
                  Mysgame
                </button>
              </div>
            </div>

            <div className="input-box">
              <label className="label">Enter Period (1-2 digits)</label>
              <div className="input-row">
                <input
                  className="period-input"
                  type="number"
                  placeholder="e.g. 40"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
                <button
                  className="generate-btn"
                  onClick={handleGenerate}
                  style={{ background: platformColor }}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>

          <div className="result-summary">
            <div className="result-card">
              <div className="result-left">
                <div className="result-title">Result for Period</div>
                <div className="result-period">{/* placeholder */}</div>
              </div>
              <div className="result-right">
                <div className="big-number" style={{ borderColor: platformColor }}>
                  {lastResult ?? "—"}
                </div>
                <div className="meta-row">
                  <div className="meta-item">
                    <div className="meta-label">Number</div>
                    <div className="meta-value">{lastResult ?? "—"}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Color</div>
                    <div className="meta-value" style={{ color: platformColor }}>
                      {mode === "mz" ? "MERAH" : "HIJAU"}
                    </div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Size</div>
                    <div className="meta-value">{lastResult ? sizeLabel(lastResult) : "—"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Results */}
        <div className="card">
          <h3 className="card-title">Latest Results</h3>
          <div className="latest-row">
            {latest.length === 0 && <div className="muted">No results yet — generate a prediction.</div>}
            {latest.map((n, i) => (
              <div
                key={i}
                className="bubble"
                style={{
                  borderColor: n >= 50 ? "#ff7b7b" : "#7ee7a8",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Smart Analysis */}
        <div className="card">
          <h3 className="card-title">Smart Analysis</h3>
          <div className="analysis-row">
            <div className="analysis-col">
              <div className="analysis-title">Hot Numbers</div>
              <div className="chips">
                {stats.hot.length ? stats.hot.map((h) => (
                  <div key={h} className="chip hot">{h}</div>
                )) : <div className="muted">—</div>}
              </div>
            </div>
            <div className="analysis-col">
              <div className="analysis-title">Cold Numbers</div>
              <div className="chips">
                {stats.cold.length ? stats.cold.map((c) => (
                  <div key={c} className="chip cold">{c}</div>
                )) : <div className="muted">—</div>}
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div>Mode active: <strong style={{ color: platformColor }}>{platformName}</strong></div>
        </footer>
      </div>
    </div>
  );
        }                  className="generate-btn"
                  onClick={handleGenerate}
                  style={{ background: platformColor }}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>

          <div className="result-summary">
            <div className="result-card">
              <div className="result-left">
                <div className="result-title">Result for Period</div>
                <div className="result-period">{/* placeholder */}</div>
              </div>
              <div className="result-right">
                <div className="big-number" style={{ borderColor: platformColor }}>
                  {lastResult ?? "—"}
                </div>
                <div className="meta-row">
                  <div className="meta-item">
                    <div className="meta-label">Number</div>
                    <div className="meta-value">{lastResult ?? "—"}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Color</div>
                    <div className="meta-value" style={{ color: platformColor }}>
                      {mode === "mz" ? "MERAH" : "HIJAU"}
                    </div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Size</div>
                    <div className="meta-value">{lastResult ? sizeLabel(lastResult) : "—"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Results */}
        <div className="card">
          <h3 className="card-title">Latest Results</h3>
          <div className="latest-row">
            {latest.length === 0 && <div className="muted">No results yet — generate a prediction.</div>}
            {latest.map((n, i) => (
              <div
                key={i}
                className="bubble"
                style={{
                  borderColor: n >= 50 ? "#ff7b7b" : "#7ee7a8",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Smart Analysis */}
        <div className="card">
          <h3 className="card-title">Smart Analysis</h3>
          <div className="analysis-row">
            <div className="analysis-col">
              <div className="analysis-title">Hot Numbers</div>
              <div className="chips">
                {stats.hot.length ? stats.hot.map((h) => (
                  <div key={h} className="chip hot">{h}</div>
                )) : <div className="muted">—</div>}
              </div>
            </div>
            <div className="analysis-col">
              <div className="analysis-title">Cold Numbers</div>
              <div className="chips">
                {stats.cold.length ? stats.cold.map((c) => (
                  <div key={c} className="chip cold">{c}</div>
                )) : <div className="muted">—</div>}
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div>Mode active: <strong style={{ color: platformColor }}>{platformName}</strong></div>
        </footer>
      </div>
    </div>
  );
    }          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        🔮 Predict Sekarang
      </button>

      {result && (
        <div style={{ marginTop: '30px', fontSize: '22px', color: '#00ff99' }}>
          🎯 Prediction: <b>{result}</b>
        </div>
      )}
    </div>
  );
}

export default App;
