import React from 'react'
import Icon from "../images/userIcon.png"
import "../SidebarIcon.css"

function SidebarIcon(props:any) {
  return (
    <div className="SidebarIcon">
      <button className="closeMenu" onClick={() => props.setIsmenu(false)}>閉じる</button>
        <img src={Icon}/>
        <p className="accountName">{sessionStorage.getItem('accountName')}</p>
        <p className="accountPoint">{sessionStorage.getItem('Userpoint')} ポイント</p>
    </div>
  )
}

export default SidebarIcon