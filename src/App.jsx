import React, { useState } from 'react';
import './index.css';

function App() {
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState(null);

  const handlePredict = () => {
    if (!period) {
      alert('Masukkan nombor period dahulu!');
      return;
    }

    // 🔮 Logik contoh AI prediction (sementara)
    const prediction = Math.floor(Math.random() * 90) + 10;
    setResult(prediction);
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🔥 SMART AI VIP PREDICTOR v14.5 🔥</h1>
      <p>Platform: Mzplay & Mysgame</p>

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
          width: '220px',
          marginTop: '20px'
        }}
      />
      <br />
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
        <div style={{ marginTop: '30px', fontSize: '22px', color: '#0f0' }}>
          🎯 Prediction: <b>{result}</b>
        </div>
      )}
    </div>
  );
}

export default App;
