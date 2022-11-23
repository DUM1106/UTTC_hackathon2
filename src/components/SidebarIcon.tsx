import React from 'react'
import Icon from "../images/dog.png"
import "../SidebarIcon.css"

function SidebarIcon() {
  return (
    <div className="SidebarIcon">
        <img src={Icon}/>
        <p className="accountName">{sessionStorage.getItem('accountName')}</p>
        <p className="accountPoint">{sessionStorage.getItem('Userpoint')} ポイント</p>
    </div>
  )
}

export default SidebarIcon