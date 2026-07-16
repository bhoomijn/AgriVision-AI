import React, { useState, useEffect } from 'react'
const BACKEND = "http://localhost:8000"
export default function App() {
  const [tab, setTab] = useState('disease')
  const [backendOk, setBackendOk] = useState(false)
  const [nvidiaKey, setNvidiaKey] = useState(false)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([{role:'assistant', text:'Vanakkam! AgriVision NVIDIA ready. Ask about tomato blight, weather, market.'}])

  const checkHealth = async () => {
    try{
      const r = await fetch(`${BACKEND}/health`)
      const j = await r.json()
      setBackendOk(true)
      setNvidiaKey(j.nvidia_key_set)
    }catch{ setBackendOk(false) }
  }
  useEffect(()=>{ checkHealth(); const id=setInterval(checkHealth, 3000); return ()=>clearInterval(id) },[])

  const handleImage = (file) => { setImage(file); setPreview(URL.createObjectURL(file)); setResult(null) }
  const predict = async () => {
    if(!image) return; setLoading(true)
    const fd = new FormData(); fd.append('file', image)
    try {
      const res = await fetch(`${BACKEND}/predict`, {method:'POST', body: fd})
      const data = await res.json(); setResult(data.data)
    } catch(e){ alert('Backend not running. Run: python -m uvicorn app.main:app --reload --port 8000 in backend folder') }
    setLoading(false)
  }
  const sendChat = async () => {
    if(!chatInput) return; const q = chatInput
    setMessages(m=>[...m, {role:'user', text: q}]); setChatInput('')
    try{
      const res = await fetch(`${BACKEND}/chat?query=${encodeURIComponent(q)}`)
      const data = await res.json(); setMessages(m=>[...m, {role:'assistant', text: data.response, mode: data.mode}])
    }catch{ setMessages(m=>[...m, {role:'assistant', text:'Backend offline'}]) }
  }

  return (
    <div style={{maxWidth:900, margin:'0 auto', padding:20, fontFamily:'system-ui'}}>
      <h1 style={{color:'#16a34a', fontSize:28, fontWeight:'bold'}}>🌱 AgriVision AI - NVIDIA Edition</h1>
      <p>Backend: {BACKEND} {backendOk ? '🟢 Connected' : '🔴 Offline'} | NVIDIA Key: {nvidiaKey ? '🟢 Set' : '🔴 Not Set - Add in backend/.env'}</p>
      <div style={{display:'flex', gap:10, margin:'20px 0'}}>
        {['disease','chat','weather','market'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 16px', background: tab===t ? '#16a34a' : '#e5e7eb', color: tab===t?'white':'black', border:'none', borderRadius:8, cursor:'pointer'}}>{t}</button>
        ))}
      </div>
      {tab==='disease' && (
        <div style={{border:'2px dashed #16a34a', padding:20, borderRadius:12}}>
          <input type="file" accept="image/*" onChange={e=>handleImage(e.target.files[0])} />
          {preview && <img src={preview} style={{width:300, marginTop:10, borderRadius:8}} />}
          <br/><br/>
          <button onClick={predict} disabled={loading} style={{padding:'10px 20px', background:'#16a34a', color:'white', border:'none', borderRadius:8}}>{loading ? 'Detecting...' : 'Detect with NVIDIA AI'}</button>
          {result && (
            <div style={{marginTop:20, background:'white', padding:15, borderRadius:8}}>
              <h3>Disease: {result.prediction.disease} ({(result.prediction.confidence*100).toFixed(1)}%)</h3>
              <p>Severity: {result.prediction.severity}</p>
              <p><b>Treatments:</b> {result.treatments.join(', ')}</p>
              {result.nvidia_explanation && <p style={{background:'#f0fdf4', padding:10, borderRadius:6, whiteSpace:'pre-wrap'}}><b>NVIDIA AI:</b> {result.nvidia_explanation}</p>}
            </div>
          )}
        </div>
      )}
      {tab==='chat' && (
        <div>
          <div style={{height:350, overflowY:'auto', border:'1px solid #ddd', padding:10, borderRadius:8, background:'white'}}>
            {messages.map((m,i)=><div key={i} style={{margin:'8px 0', textAlign: m.role==='user'?'right':'left'}}><span style={{background: m.role==='user'?'#16a34a': m.mode==='nvidia'?'#e0f2fe':'#f3f4f6', color: m.role==='user'?'white':'black', padding:'6px 12px', borderRadius:12, display:'inline-block', maxWidth:'80%'}}>{m.text} {m.mode && <small style={{display:'block', fontSize:10, opacity:0.6}}>{m.mode}</small>}</span></div>)}
          </div>
          <div style={{display:'flex', gap:8, marginTop:10}}>
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()} placeholder="Ask e.g. My tomato has black spots" style={{flex:1, padding:10, borderRadius:8, border:'1px solid #ccc'}} />
            <button onClick={sendChat} style={{padding:'10px 20px', background:'#16a34a', color:'white', border:'none', borderRadius:8}}>Send</button>
          </div>
        </div>
      )}
      {tab!=='disease' && tab!=='chat' && <div style={{padding:20, background:'white', borderRadius:8}}><p>{tab} API works via backend. Use /docs to test.</p><p>Backend: {BACKEND}/{tab}/...</p></div>}
    </div>
  )
}