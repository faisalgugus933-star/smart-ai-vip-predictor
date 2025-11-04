import React, { useState } from 'react';
import './index.css';

function App() {
  const [mode, setMode] = useState('mz'); // mz = Mzplay, mys = Mysgame
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState(null);

  const handlePredict = () => {
    if (!period) {
      alert('Masukkan nombor period dahulu!');
      return;
    }

    // Simulasi prediction ikut mode
    let prediction;
    if (mode === 'mz') {
      prediction = (parseInt(period) * 7 + 13) % 90 + 10; // formula Mzplay
    } else {
      prediction = (parseInt(period) * 5 + 21) % 90 + 10; // formula Mysgame
    }

    setResult(prediction);
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
      <h1>🔥 SMART AI VIP PREDICTOR v14.5 🔥</h1>
      <p>Platform: Mzplay & Mysgame</p>

      <div style={{ marginTop: '20px' }}>
        <label style={{ marginRight: '10px', fontSize: '16px' }}>Pilih Mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '10px',
            fontSize: '16px',
            border: '1px solid #ff4747',
            backgroundColor: '#1a1a1a',
            color: '#fff'
          }}
        >
          <option value="mz">Mzplay</option>
          <option value="mys">Mysgame</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          placeholder="Masukkan nombor period..."
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '10px',
            border: '1px solid #ff4747',
            width: '220px'
          }}
        />
      </div>

      <button
        onClick={handlePredict}
        style={{
          marginTop: '20px',
          padding: '10px 25px',
          backgroundColor: '#ff4747',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
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
