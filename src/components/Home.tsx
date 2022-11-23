import React from 'react'
import Sidebar from "./Sidebar";
import "../Home.css"

function Home() {
  return (
    <div className="home">
        <div className="assist">
        <h1>Assist</h1>
        </div>
    <Sidebar/>
    <p className="message">日々の感謝をポイントと共に伝えよう。</p>
    </div>
  )
}

export default Home