import React, { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [mzPrediction, setMzPrediction] = useState(null);
  const [mysPrediction, setMysPrediction] = useState(null);

  const handlePredict = () => {
    if (!input) return;
    // Logik rawak simple
    const mz = Math.floor(Math.random() * 90) + 10;
    const mys = Math.floor(Math.random() * 90) + 10;
    setMzPrediction(mz);
    setMysPrediction(mys);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center text-white font-sans">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">
        🔥 SMART AI VIP PREDICTOR v14.5 🔥
      </h1>
      <p className="text-gray-300 mb-8 text-lg">Platform: Mzplay & Mysgame</p>

      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Masukkan nombor..."
        className="p-3 rounded-xl text-black w-60 text-center text-lg focus:outline-none"
      />

      <button
        onClick={handlePredict}
        className="mt-5 bg-gradient-to-r from-red-600 to-orange-500 hover:scale-105 transition-all px-6 py-3 rounded-2xl text-white font-semibold shadow-lg"
      >
        🔮 Predict Sekarang
      </button>

      {mzPrediction !== null && mysPrediction !== null && (
        <div className="mt-8 text-center space-y-3">
          <p className="text-2xl font-semibold">
            <span className="text-red-500">🎯 MZPLAY:</span>{" "}
            <span className="text-red-400">{mzPrediction}</span>
          </p>
          <p className="text-2xl font-semibold">
            <span className="text-green-400">💎 MYSGAME:</span>{" "}
            <span className="text-green-300">{mysPrediction}</span>
          </p>
        </div>
      )}

      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 SMART AI VIP PREDICTOR | Powered by GPT
      </footer>
    </div>
  );
}
