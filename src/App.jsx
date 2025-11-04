import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

export default function App() {
  // mz = Mzplay (red), mys = Mysgame (green)
  const [platform, setPlatform] = useState("mz");
  const [period, setPeriod] = useState("");
  const [current, setCurrent] = useState(null); // { digit, size, color }
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // optional: load history from localStorage
    const raw = localStorage.getItem("vip_history_v1");
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("vip_history_v1", JSON.stringify(history));
  }, [history]);

  const accentColor = platform === "mz" ? "#ff3b3b" : "#00c853";

  const generate = () => {
    if (!/^\d{1,2}$/.test(period.trim())) {
      alert("Masukkan period 1–2 digit (contoh: 7 atau 40)");
      return;
    }
    // produce single-digit 0..9 (deterministic-ish using period + platform)
    const base = Number(period);
    const raw = platform === "mz" ? ((base * 7 + 13) % 90) + 1 : ((base * 5 + 21) % 90) + 1;
    const digit = raw % 10; // 0-9
    const size = digit >= 5 ? "BIG" : "SMALL";
    const item = { digit, size, platform, period, ts: Date.now(), color: accentColor };

    setCurrent(item);
    setHistory(prev => [item, ...prev].slice(0, 12));
    setPeriod("");
  };

  const hotCold = (() => {
    const freq = Array(10).fill(0);
    history.forEach(h => (freq[h.digit] = (freq[h.digit] || 0) + 1));
    const pairs = freq.map((c, d) => ({ d, c }));
    const hot = pairs.slice().sort((a,b) => b.c - a.c).slice(0,2).map(x => x.d);
    const cold = pairs.slice().sort((a,b) => a.c - b.c).slice(0,2).map(x => x.d);
    return { hot, cold };
  })();

  return (
    <div className="app-shell">
      <div className="panel">

        {/* header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-white text-xl font-extrabold">SMART AI VIP PREDIKTOR</h2>
            <div className="text-sm text-[rgba(255,255,255,0.68)]">V15.5 — Single-digit mode • Modern UI</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-[rgba(255,255,255,0.68)] mr-2">Mode</div>
            <button
              className="platform-btn"
              onClick={() => setPlatform("mz")}
              style={{
                borderColor: platform === "mz" ? accentColor : "rgba(255,255,255,0.06)",
                color: platform === "mz" ? accentColor : "#fff"
              }}
            >
              Mzplay
            </button>
            <button
              className="platform-btn"
              onClick={() => setPlatform("mys")}
              style={{
                borderColor: platform === "mys" ? accentColor : "rgba(255,255,255,0.06)",
                color: platform === "mys" ? accentColor : "#fff"
              }}
            >
              Mysgame
            </button>
          </div>
        </div>

        {/* main controls */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="Masukkan period (cth: 40)"
              className="period"
              inputMode="numeric"
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              onClick={generate}
              className="generate"
              style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}aa)` }}
            >
              Predict 🎯
            </motion.button>
            <div className="ml-auto text-sm text-[rgba(255,255,255,0.68)]">
              <div>History: {history.length}</div>
            </div>
          </div>
        </div>

        {/* result area */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="flex-1 flex items-center gap-6">
            <div>
              <div className="text-sm text-[rgba(255,255,255,0.68)] mb-2">Current</div>

              <AnimatePresence>
                <motion.div
                  key={current ? current.ts : "empty"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                >
                  <div
                    className="big-number"
                    style={{
                      borderColor: current ? current.color : "rgba(255,255,255,0.06)",
                      color: current ? current.color : "#fff"
                    }}
                  >
                    {current ? current.digit : "--"}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="result-meta">
              <div className="meta">
                <div className="meta-label">Size</div>
                <div className="meta-value" style={{ color: current ? current.color : "#fff" }}>
                  {current ? current.size : "-"}
                </div>
              </div>
              <div className="meta">
                <div className="meta-label">Period</div>
                <div className="meta-value">{current ? current.period : "-"}</div>
              </div>
              <div className="meta">
                <div className="meta-label">Platform</div>
                <div className="meta-value" style={{ color: current ? current.color : "#fff" }}>
                  {current ? (current.platform === "mz" ? "Mzplay" : "Mysgame") : "-"}
                </div>
              </div>
            </div>
          </div>

          {/* latest results bubbles */}
          <div className="w-full md:w-1/3">
            <div className="text-sm text-[rgba(255,255,255,0.68)] mb-2">Latest</div>
            <div className="flex flex-wrap gap-3">
              {history.length === 0 ? (
                <div className="muted">No results yet</div>
              ) : (
                history.map((h, idx) => (
                  <motion.div
                    key={h.ts}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hist-bubble"
                    style={{ borderColor: h.color, color: h.color }}
                    title={`${h.platform} — ${h.period}`}
                  >
                    {h.digit}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* analysis */}
        <div className="mb-4">
          <div className="text-sm text-[rgba(255,255,255,0.68)] mb-2">Smart Analysis</div>
          <div className="flex gap-4 flex-wrap">
            <div className="chip hot bg-gradient-to-r from-[#ff7b7b] to-[#ffb3b3] px-3 py-2 rounded-lg font-bold">
              Hot: {hotCold.hot.join(", ") || "-"}
            </div>
            <div className="chip cold bg-gradient-to-r from-[#60a5fa] to-[#a3d4ff] px-3 py-2 rounded-lg font-bold">
              Cold: {hotCold.cold.join(", ") || "-"}
            </div>
          </div>
        </div>

        <div className="text-xs text-[rgba(255,255,255,0.54)]">Built with ❤️ — single-digit demo</div>
      </div>
    </div>
  );
}
