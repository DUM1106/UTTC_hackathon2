import React from 'react'
import "../LoginForm.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";

type Props = {
    Username: string | null
    isMenu: boolean
    setIsMenu: any
  }

function ContributionForm(props:Props) {
    const [receivername, setReceivername] = useState("")
    const [point, setPoint] = useState(0)
    const [message, setMessage] = useState("")

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

    const handleSubmit = (event:any) => {
      event.preventDefault();
        onSubmit(props.Username, receivername,point, message);
        setReceivername("")
        setPoint(0)
        setMessage("")
      }

    const [Member, setMember] = useState([{"name": "", "point": 0}]);
      useEffect(() => {
        const fetchData3 = async () => {
          const data = await fetch('https://hackathon-4y7j2tipqq-uc.a.run.app/user/userinfo');
          const json = await data.json();
          setMember(json);
          if (json[0].name != props.Username) {
            setReceivername(json[0].name);
          } else {
            setReceivername(json[1].name);
          }
          
        }
         fetchData3()
          .catch(console.error);;
      }, [])
      
    let pointnumber = true;
      if (point > 0 && point <= 10) {
        pointnumber = false;
      }
  
    let messagelen = true;
      if (message.length <= 70) {
        messagelen = false;
      }

    return (
    <div>
     <Sidebar/>
     <Sidebar2 isMenu={props.isMenu} setIsmenu={props.setIsMenu}/>
      <div className="formContainer">
      <button className="showMenu" onClick = {() => props.setIsMenu(true)}>メニューを表示</button>
        <form>
          <h1>貢献を送る</h1>
          <hr />
          <div className="uiForm">
            <div className="formField">
              <label>送る相手</label>
              <select 
              className="senderSelect"
              value={receivername}
              onChange={(e) => setReceivername(e.target.value)}
              >
              {Member.map((option, key) => {
                if (option.name != props.Username) {
                    return(<option value={option.name} key={key}>{option.name}</option>)
                }     
              })}
             </select>
            </div>
            <div className="formField">
              <label>ポイント</label>
              <input
                className="pointsend"
                type="number"
                name="point"
                placeholder="ポイント"
                value={point}
                min={0}
                max={10}
                onChange={(e) => setPoint(Number(e.target.value))}
              />
            </div>
  
            <div className="formField">
              <label>メッセージ</label>
              <textarea
                className="formFieldContribution"
                name="message"
                placeholder="メッセージ"
                value={message}
                style={{ marginBottom: 20 }}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button className="submitButton" disabled={!message || messagelen || pointnumber} onClick={(e) => handleSubmit(e)}>送信</button>

          </div>
        </form>
      </div>
     
      </div>
    );
}
  
  export default ContributionForm;