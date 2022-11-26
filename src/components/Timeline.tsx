import React from "react";
import { useState } from "react";
import axios from "axios";
import "../Timeline.css";
import Icon from "../images/userIcon.png";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";

type Props = {
  len: number
  Data: {"id":string; "sender_name": string; "receiver_name": string}[]
  Username: string | null
  isMenu: boolean
  setIsMenu: any
}

function Timeline(props:Props) {
    const [showModal, setShowModal] = useState(false); 
    const [showModal2, setShowModal2] = useState(false);
    const [Data3, setData3] = useState({"sender_name": "", "receiver_name": "", "point": 0, "message": ""});
    const [Point, setPoint] = useState(0);
    const [Message, setMessage] = useState("");
    const [Id, setId] = useState("");
    const [ReceiverName, setReceiverName] = useState("");
    
    
    
    const submit = (id:string) => {
        setShowModal(true);
        const params = {id : id};
        const query = new URLSearchParams(params);
        console.log(id);

        const fetchData3 = async () => {
            const data = await fetch(`https://hackathon-4y7j2tipqq-uc.a.run.app/user/detailcontribution?${query}`);
            const json = await data.json();
            setData3(json);
          }
      
           fetchData3()
            .catch(console.error);;
    }


    const edit = (id:string, receiver_name:string) => {
      setShowModal2(true);
      setId(id);
      setReceiverName(receiver_name);
  }
  
  const onSubmit = (id:string, receivername:string, point:number, message:string) => {
    axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/edit", {
      id: id,
      receivername: receivername,
      point: point,
      message: message
    }).then((response:any) => {
        console.log('body:', response.data);
  });
  }

  const onSubmitDelete = (id:string, receivername:string) => {
    closeModal()
    axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/delete", {
      id: id,
      receivername: receivername
    }).then((response:any) => {
        console.log('body:', response.data);
        window.location.href = "/timeline";

  });
  }


  const submit2 = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    onSubmit(Id, ReceiverName, Point, Message);
    setPoint(0)
    setMessage("")
  }

  const submitDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    onSubmitDelete(Id, ReceiverName)
  }

  const closeModal = () => {
        setShowModal(false);
        setShowModal2(false);
        setPoint(0);
        setMessage("");
      };

  let pointnumber = true;
  if (Point > 0 && Point <= 100) {
    pointnumber = false;
  }

  let messagelen = true;
  if (Message.length <= 70) {
    messagelen = false;
  }

      
    return(
      <div>
    <Sidebar/>
    <Sidebar2 isMenu={props.isMenu} setIsmenu={props.setIsMenu}/>
    <button className="showMenu" onClick = {() => props.setIsMenu(true)}>メニューを表示</button>
    <div className="timeline">
    <div className="assist">
    </div>
       <div>
       <ul>
            {props.Data.slice(0).reverse().map((value, key) => {
              if (props.Username == value.sender_name) {
                return (
                  <li key={key} >
                    <img className = "icon" src={Icon}/>{value.sender_name + " → " }<img className = "icon" src={Icon}/>{value.receiver_name}<br></br>
                    <button className="detailButton" onClick = {() => submit(value.id)}>詳細</button>
                    <button className="detailButton" onClick = {() => edit(value.id, value.receiver_name)}>編集</button>
                  </li>
                      )
              } else {
                return (
                  <li key={key} >
                    <img className = "icon" src={Icon}/>{value.sender_name + " → " }<img className = "icon" src={Icon}/>{value.receiver_name}<br></br>
                    <button className="detailButton" onClick = {() => submit(value.id)}>詳細</button>
                  </li>
                )

              }
                
            })}

        </ul>
       </div>

      {showModal ? ( // showFlagがtrueだったらModalを表示する
        <div className="detail">
          <div className="container">
            <div className="content">
            <p>{"送り手: " + Data3.sender_name}</p>
            <p>{"受け手: " + Data3.receiver_name}</p>
            <p>{"ポイント: " + Data3.point}</p>
            <p>{"メッセージ:"}</p>
            <div className="textSpace">
              <p>{Data3.message}</p>
            </div>
            <button className="close" onClick = {closeModal}>閉じる</button>
            </div>
          </div>
        </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない
    )}

{showModal2 ? ( // showFlagがtrueだったらModalを表示する
    <div className="contributionForm">
      <div className="contributionContainer">
        <div className="contributionContent">
          <p id="editHeader">貢献を編集</p>
          <button className="contributionDelete" onClick = {(e) => submitDelete(e)}>この貢献を削除</button>
        <form style={{ display: "flex", flexDirection: "column" }}>
      <label>ポイント: </label>
      <input className="pointForm"
        type={"number"}
        min={0}
        max={100}
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
      <button className="contributionPost" disabled={!Message || messagelen || pointnumber} onClick = {(e) => submit2(e)}> 送信</button>
    </form>
    <button className="closeForm"  onClick = {closeModal}>閉じる</button>
    </div>
    </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない
    )}

  </div>
  </div>

    )};
    export default Timeline;