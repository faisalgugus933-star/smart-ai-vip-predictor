:root{
  --bg1:#f5f7ff;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%}
body{
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: linear-gradient(180deg,#6e58f5 0%, #6fa8f7 60%, #0f172a 100%);
  color:#fff;
  -webkit-font-smoothing:antialiased;
}
.page-root{padding:26px 16px;display:flex;justify-content:center}
.container{width:100%;max-width:920px}

/* header */
.top{text-align:center;margin-bottom:14px}
.top h1{font-size:20px;color:#fff;letter-spacing:0.6px}
.sub{color:rgba(255,255,255,0.85);font-size:13px;margin-top:6px}

/* card */
.card{background:rgba(255,255,255,0.06);padding:16px;border-radius:12px;margin-bottom:14px;box-shadow:0 8px 24px rgba(2,6,23,0.5);border:1px solid rgba(255,255,255,0.03)}
.control .row{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-end;justify-content:space-between}
.lbl{font-size:13px;color:rgba(255,255,255,0.8);margin-bottom:8px;display:block}
.mode-switch{display:flex;gap:8px}
.m-btn{padding:8px 12px;border-radius:10px;background:transparent;border:1px solid rgba(255,255,255,0.06);color:#fff;cursor:pointer;font-weight:700}
.m-btn.active{background:rgba(255,255,255,0.03)}

/* input */
.input-row{display:flex;gap:10px;align-items:center}
.period{padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#fff;width:120px}
.generate{padding:10px 14px;border-radius:10px;border:none;color:#fff;font-weight:800;cursor:pointer}

/* result */
.result-area{margin-top:14px;display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.result-left{flex:1}
.big-num{width:96px;height:96px;border-radius:12px;border:3px solid #ff3b3b;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))}
.result-meta{display:flex;gap:14px;align-items:center}
.meta{min-width:80px;text-align:center}
.meta-label{font-size:12px;color:rgba(255,255,255,0.7);margin-bottom:6px}
.meta-value{font-weight:800}

/* latest */
.latest{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.bubble{min-width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;border:2px solid rgba(255,255,255,0.06)}

/* analysis */
.analysis{display:flex;gap:14px;flex-wrap:wrap}
.a-col{flex:1}
.a-title{color:rgba(255,255,255,0.8);margin-bottom:8px}
.chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{padding:10px 12px;border-radius:8px;font-weight:800;color:#fff}
.chip.hot{background:linear-gradient(90deg,#ff6b6b,#ff9a9a)}
.chip.cold{background:linear-gradient(90deg,#60a5fa,#93c5fd)}
.muted{color:rgba(255,255,255,0.6)}

/* footer */
.foot{text-align:center;color:rgba(255,255,255,0.85);margin-top:8px}
