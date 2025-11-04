import { useState } from "react";
import "./index.css";

export default function App() {
  const [platform, setPlatform] = useState("Mzplay");
  const [period, setPeriod] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const generate = () => {
    if (period === "") return alert("Masukkan nombor period dahulu!");
    const num = Math.floor(Math.random() * 10); // 0–9 only
    const size = num >= 5 ? "BIG" : "SMALL";
    const color = platform === "Mzplay" ? "#ff3b3b" : "#00c853";
    const newResult = { num, size, color, period };
    setResult(newResult);
    setHistory((prev) => [newResult, ...prev.slice(0, 9)]);
  };

  const hotCold = () => {
    const freq = {};
    history.forEach((r) => (freq[r.num] = (freq[r.num] || 0) + 1));
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const hot = sorted.slice(0, 3).map((x) => x[0]);
    const cold = sorted.slice(-3).map((x) => x[0]);
    return { hot, cold };
  };

  const { hot, cold } = hotCold();

  return (
    <div className="page-root">
      <div className="container">
        <div className="top">
          <h1>🔥 SMART AI VIP PREDIKTOR V15.5</h1>
          <div className="sub">Ultra Stable | Live Trend | Platform Mode</div>
        </div>

        {/* Platform selection */}
        <div className="card control">
          <div className="row">
            <div>
              <label className="lbl">Pilih Platform</label>
              <div className="mode-switch">
                <button
                  className={`m-btn ${platform === "Mzplay" ? "active" : ""}`}
                  onClick={() => setPlatform("Mzplay")}
                  style={{
                    borderColor: platform === "Mzplay" ? "#ff3b3b" : "",
                    color: platform === "Mzplay" ? "#ff3b3b" : "",
                  }}
                >
                  🔴 Mzplay
                </button>
                <button
                  className={`m-btn ${platform === "Mysgame" ? "active" : ""}`}
                  onClick={() => setPlatform("Mysgame")}
                  style={{
                    borderColor: platform === "Mysgame" ? "#00c853" : "",
                    color: platform === "Mysgame" ? "#00c853" : "",
                  }}
                >
                  🟢 Mysgame
                </button>
              </div>
            </div>

            <div>
              <label className="lbl">Masukkan Period</label>
              <div className="input-row">
                <input
                  type="number"
                  placeholder="cth: 79"
                  className="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
                <button
                  className="generate"
                  onClick={generate}
                  style={{
                    background:
                      platform === "Mzplay"
                        ? "linear-gradient(90deg,#ff3b3b,#ff6b6b)"
                        : "linear-gradient(90deg,#00c853,#5efc82)",
                  }}
                >
                  Predict 🎯
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result display */}
        <div className="card">
          <div className="result-area">
            <div className="result-left">
              <div className="result-title">Current Result</div>
              <div
                className="big-num"
                style={{
                  borderColor: result?.color || "#666",
                  color: result?.color || "#666",
                }}
              >
                {result ? result.num : "--"}
              </div>
            </div>

            <div className="result-meta">
              <div className="meta">
                <div className="meta-label">Size</div>
                <div
                  className="meta-value"
                  style={{ color: result?.color || "#aaa" }}
                >
                  {result ? result.size : "-"}
                </div>
              </div>
              <div className="meta">
                <div className="meta-label">Period</div>
                <div className="meta-value">
                  {result ? result.period : "-"}
                </div>
              </div>
              <div className="meta">
                <div className="meta-label">Platform</div>
                <div
                  className="meta-value"
                  style={{ color: result?.color || "#aaa" }}
                >
                  {platform}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Results */}
        <div className="card">
          <div className="result-title">Latest Results</div>
          <div className="latest">
            {history.length === 0 ? (
              <div className="muted">No data yet</div>
            ) : (
              history.map((r, i) => (
                <div
                  key={i}
                  className="bubble"
                  style={{
                    borderColor: r.color,
                    color: r.color,
                  }}
                >
                  {r.num}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Analysis */}
        <div className="card">
          <div className="analysis">
            <div className="a-col">
              <div className="a-title">🔥 Hot Numbers</div>
              <div className="chips">
                {hot.map((n, i) => (
                  <div className="chip hot" key={i}>
                    {n}
                  </div>
                ))}
                {hot.length === 0 && <div className="muted">-</div>}
              </div>
            </div>
            <div className="a-col">
              <div className="a-title">❄️ Cold Numbers</div>
              <div className="chips">
                {cold.map((n, i) => (
                  <div className="chip cold" key={i}>
                    {n}
                  </div>
                ))}
                {cold.length === 0 && <div className="muted">-</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="foot">SMART AI VIP PREDIKTOR v15.5 © {new Date().getFullYear()}</div>
      </div>
    </div>
  );
        }
