import React, { useState, useEffect } from 'react'
import './App.css';

const URL = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json';

function App() {
  const [candidatos, setCandidatos] = useState([]);

  const fetchAPI = async () => {
    const request = await fetch(URL);
    const result = await request.json();
    setCandidatos(result.cand);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAPI();
    }, 50000);
    return () => clearInterval(interval);
  }, [])
  
  return (
    <div className="main">
      <h1>ELEIÇÕES 2022 - APURAÇÃO 1º turno</h1>
      { candidatos.map((cand, i) => {
        const {
          nm, pvap, n, cc
        } = cand;
      return (
        <div key={i} className="cand-card">
          <h2 className="cand-name"> { nm } </h2>
          <h3 className="cand-number"> { n } </h3>
          <p className="cand-percentual"> { pvap }% </p>
          <p className="cand-partido"> { cc } </p>
        </div>
      )
    })}
    </div>
  )
}

export default App
