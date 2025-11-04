import React, { useState, useMemo } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts'
import './index.css'

function sizeLabel(n){
  const last = Number(String(n).slice(-1))
  return last >= 5 ? 'BIG' : 'SMALL'
}

function computeHotCold(latest){
  const freq = {}
  latest.forEach(n => { freq[n] = (freq[n]||0)+1 })
  const entries = Object.entries(freq).sort((a,b)=>b[1]-a[1])
  const hot = entries.slice(0,2).map(e=>e[0])
  // cold: numbers 0-9 least frequent
  const all = Array.from({length:10},(_,i)=>String(i))
  const cold = all.map(k=>[k, freq[k]||0]).sort((a,b)=>a[1]-b[1]).slice(0,2).map(e=>e[0])
  return { hot, cold }
}

export default function App(){
  const [mode, setMode] = useState('mz') // 'mz' or 'mys'
  const [period, setPeriod] = useState('')
  const [latest, setLatest] = useState([]) // newest first
  const [last, setLast] = useState(null)

  const accent = mode === 'mz' ? '#ff3b3b' : '#22c55e'
  const platformName = mode === 'mz' ? 'Mzplay' : 'Mysgame'

  const chartData = useMemo(()=>{
    // show last 8 as chart values 0/1 for demonstration
    return latest.slice(0,8).map((v,i)=>({ name: String(i+1), value: Number(v%10) }))
  },[latest])

  const handleGenerate = ()=>{
    if(!/^\d{1,2}$/.test(period.trim())) { alert('Masukkan period 1-2 digit — contoh: 40'); return }
    const base = Number(period)
    const pred = mode === 'mz' ? ((base*7+13)%90)+1 : ((base*5+21)%90)+1
    setLast(pred)
    setLatest(prev => [pred, ...prev].slice(0,20))
    setPeriod('')
  }

  const stats = computeHotCold(latest)

  return (
    <div className="page-root">
      <div className="container">
        <header className="top">
          <h1>WINGO — SMART AI VIP PREDICTOR</h1>
          <p className="sub">Auto prediction • V15.5</p>
        </header>

        <div className="card control">
          <div className="row">
            <div>
              <label className="lbl">Platform</label>
              <div className="mode-switch">
                <button className={`m-btn ${mode==='mz'?'active':''}`} onClick={()=>setMode('mz')}>Mzplay</button>
                <button className={`m-btn ${mode==='mys'?'active':''}`} onClick={()=>setMode('mys')}>Mysgame</button>
              </div>
            </div>

            <div>
              <label className="lbl">Enter Period (2 digits)</label>
              <div className="input-row">
                <input value={period} onChange={e=>setPeriod(e.target.value)} placeholder="e.g. 40" className="period" />
                <button className="generate" style={{background:accent}} onClick={handleGenerate}>Generate</button>
              </div>
            </div>
          </div>

          <div className="result-area">
            <div className="result-left">
              <div className="result-title">Result for Period</div>
              <div className="big-num" style={{borderColor:accent}}>{ last ?? '—' }</div>
            </div>
            <div className="result-meta">
              <div className="meta">
                <div className="meta-label">Number</div>
                <div className="meta-value">{ last ?? '—' }</div>
              </div>
              <div className="meta">
                <div className="meta-label">Color</div>
                <div className="meta-value" style={{color:accent}}>{ mode==='mz' ? 'MERAH' : 'HIJAU' }</div>
              </div>
              <div className="meta">
                <div className="meta-label">Size</div>
                <div className="meta-value">{ last ? sizeLabel(last) : '—' }</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Latest Results</h3>
          <div className="latest">
            { latest.length===0 ? <div className="muted">No results yet — generate.</div> :
              latest.map((n,i)=>(
                <div key={i} className="bubble" style={{ borderColor: n%2? '#ff7b7b' : '#7ee7a8' }}>{n}</div>
              ))
            }
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Smart Analysis</h3>
          <div className="analysis">
            <div className="a-col">
              <div className="a-title">Hot Numbers</div>
              <div className="chips">{ stats.hot.length? stats.hot.map(h=> <div key={h} className="chip hot">{h}</div>) : <div className="muted">—</div> }</div>
            </div>
            <div className="a-col">
              <div className="a-title">Cold Numbers</div>
              <div className="chips">{ stats.cold.length? stats.cold.map(c=> <div key={c} className="chip cold">{c}</div>) : <div className="muted">—</div> }</div>
            </div>
          </div>
        </div>

        <footer className="foot">Mode active: <strong style={{color:accent}}>{platformName}</strong></footer>
      </div>
    </div>
  )
                }
