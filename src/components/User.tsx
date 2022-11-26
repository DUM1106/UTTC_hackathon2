import React from "react";
import { useState } from "react";
import axios from "axios";
import "../User.css";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import Icon from "../images/userIcon.png";

type Props = {
  len: number
  Data: {"name":string; "point": number}[]
  Username: string | null
  Userpoint: string | null
  isMenu: boolean
  setIsMenu: any
}

function User(props:Props) {
    const[Showform, setShowform] = useState(false);
    const [Point, setPoint] = useState(0);
    const [Message, setMessage] = useState("");
    const [Receivername, setReceivername] = useState("");


    const onSubmit = (sendername:string | null, receivername:string, point:number, message:string) => {
        axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/postcontribution", {
          sendername: sendername,
          receivername: receivername,
          point: point,
          message: message
        }).then((response:any) => {
            console.log('body:', response.data);
      });
    }

      const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
          onSubmit(props.Username, Receivername, Point, Message)
          setPoint(0)
          setMessage("")
      } 


    const openModal = (name:string) => {
        setShowform(true)
        setReceivername(name)
    }

    const closeModal = () => {
        setShowform(false);
        setPoint(0);
        setMessage("");
        window.location.pathname = "./member";
    }
    

    let pointnumber = true;
    if (Point > 0 && Point <= 10) {
      pointnumber = false;
    }

    let messagelen = true;
    if (Message.length <= 70) {
      messagelen = false;
    }


    return(
    <div>
      <div className="assist">
      </div>
      <Sidebar/>
      <Sidebar2 isMenu={props.isMenu} setIsmenu={props.setIsMenu}/>
      <button className="showMenu" onClick = {() => props.setIsMenu(true)}>メニューを表示</button>
    <div className = "user">
          <ul>
            <li><img className = "icon2" src={Icon}/> {props.Username}<br/>
              <div className = "point">{"ポイント: " + props.Userpoint}</div>
            </li>
          </ul>
          <ul>
            {props.Data.map((value, key) => {
              if (props.Username != value.name) {
                return (
                  <li key={key}><img className = "icon2" src={Icon}/> {value.name}<br/>
              <div className = "point">{"ポイント: " + value.point}</div>
              <button className="contributionSend" onClick = {() => openModal(value.name)}>貢献を送る</button></li>
                 )
              } 
            }
          )
        }
          </ul>
    </div>

     <>
    {Showform ? ( // showFlagがtrueだったらModalを表示する
    <div className="contributionForm">
      <div className="contributionContainer">
        <div className="contributionContent">
          <p>貢献を送る</p>
        <form style={{ display: "flex", flexDirection: "column" }}>
      <label>ポイント: </label>
      <input className="pointForm"
        type={"number"}
        min={0}
        max={10}
        value={Point}
        onChange={(e) => setPoint(Number(e.target.value))}
      ></input>
      <label>メッセージ: </label>
      <textarea className="messageForm"
      value={Message}
      style={{ marginBottom: 20 }}
      placeholder="メッセージ"
      onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button className="contributionPost" disabled={!Message || messagelen || pointnumber} onClick = {(e) => submit(e)}> 送信</button>
    </form>
    <button className="closeForm"  onClick = {closeModal}>閉じる</button>
    </div>
    </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない
    )}
  </>

</div>
          
  
    )};
    export default User;