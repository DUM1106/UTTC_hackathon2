import React from 'react'
import { useState } from "react";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import "../Home.css"

type Props = {
  isMenu: boolean
  setIsMenu: any
}

function Home(props:Props) {
  return (
    <div className="home">
        <div className="assist">
        <h1>Assist</h1>
        </div>
    <Sidebar/>
    <Sidebar2 isMenu={props.isMenu} setIsmenu={props.setIsMenu}/>
    <button className="showMenu" onClick = {() => props.setIsMenu(true)}>メニューを表示</button>
    <p className="message">日々の感謝をポイントと共に伝えよう。</p>
    </div>
  )
}

export default Home