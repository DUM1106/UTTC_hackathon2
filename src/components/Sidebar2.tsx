import React from 'react';
import { useState } from "react";
import {SidebarData} from "./SidebarData";
import "../Sidebar2.css"
import SidebarIcon from "./SidebarIcon";
function Sidebar2(props:any) {
    
  return (
    <>
    {props.isMenu ? (
    <div className='Sidebar2'>
        <SidebarIcon setIsmenu = {props.setIsmenu}/>
        <ul className='SidebarList2'>
            {SidebarData.map((value, key) => {
                return (
                    <li 
                        key={key}
                        id={window.location.pathname == value.link ? "active" : ""}
                        className="row"
                        onClick={() => {
                            window.location.pathname = value.link;
                            props.setIsmenu(false)
                        }}
                        >
                        <div id="icon2">{value.icon}</div>
                        <div id="title2">{value.title}</div>
                    </li>
                )
            })}

        </ul>
    </div>
    ) : (
        <></>
)}
    </>
  )
}

export default Sidebar2