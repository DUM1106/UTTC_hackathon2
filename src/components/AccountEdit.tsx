import React from 'react'
import "../LoginForm.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";


import { setFlagsFromString } from 'v8';

type Props = {
    Username: string | null
    isMenu: boolean
    setIsMenu: any
  }

const AccountEdit = (props: Props) => {
  const initialValues = { username: "", mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErros, setFormErrors] = useState({username: "", mailAddress: "", password: ""});
  const [isSubmit, setIsSubmit] = useState(false);
  const [issuccess, setIssuccess] = useState(false)
  const [accountCheck, setAccountCheck] = useState(true);

  const [Member, setMember] = useState([{"name": "", "point": 0}]);
  const [len, setLen] = useState(0);

  useEffect(() => {
    const fetchData3 = async () => {
      const data = await fetch('https://hackathon-4y7j2tipqq-uc.a.run.app/user/userinfo');
      const json = await data.json();
      setMember(json);
      setLen(json.length);
    }
     fetchData3()
      .catch(console.error)
  }, [])

  const handleChange = (e:any) => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const onSubmit = (name1:string | any, name2:string, email:string, password:string) => {
    axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/accountedit", {
      name1: name1,
      name2: name2,
      email: email,
      password: password,
    }).then((response: any) => {
        console.log('body:', response.data);
          setFormValues({username: "", mailAddress: "", password: ""});
          sessionStorage.setItem('accountName', name2);
          setIssuccess(true);
          window.location.pathname = "./accountedit";
  });
}

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    for (let i = 0; i < len; i ++) {
      if (Member[i].name != props.Username && Member[i].name == formValues.username) {
        setAccountCheck(false)
        setTimeout(() => {
          window.location.href = "/accountedit";
        }, 1 * 1000);
        break
      }
    }
    if (Object.keys(formErros).length === 0 && isSubmit && accountCheck) {
      onSubmit(props.Username, formValues.username, formValues.mailAddress, formValues.password);
    }
  };

  useEffect(() => {
    console.log(formErros);
    //エラーなしでかつ送信されているなら。
    if (Object.keys(formErros).length === 0 && isSubmit) {
      console.log(formValues);
    } else {
    }
  }, [formErros]);

  //バリデーションチェック
  const validate = (values:any) => {
    const errors:any = {};
    //半角英数字のみ(空文字OK)
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    //valueが空ならerrrosの配列に入れる。
    if (!values.username) {
      errors.username = "ユーザー名を入力してください。";
    }
    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください。";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください。";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };


  return (
    <div>
        <Sidebar/>
        <Sidebar2 isMenu={props.isMenu} setIsmenu={props.setIsMenu}/>
    <div className="formContainer">
    <button className="showMenu" onClick = {() => props.setIsMenu(true)}>メニューを表示</button>
      <form onSubmit={handleSubmit}>
        <h1>アカウント編集</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>新しいユーザー名</label>
            <input
              type="text"
              name="username"
              placeholder="ユーザー名"
              value={formValues.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErros.username}</p>
          <div className="formField">
            <label>新しいメールアドレス</label>
            <input
              type="text"
              name="mailAddress"
              placeholder="メールアドレス"
              value={formValues.mailAddress}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErros.mailAddress}</p>

          <div className="formField">
            <label>新しいパスワード</label>
            <input
              type="text"
              name="password"
              placeholder="パスワード"
              value={formValues.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErros.password}</p>
          <button className="submitButton">変更</button>
          {Object.keys(formErros).length === 0 && isSubmit && issuccess &&(
            <div className="msgOk">変更に成功しました</div>
          )}
          {!accountCheck && (
            <div className="msgOk">このユーザー名は使用されています</div>
          )}
        </div>
      </form>
    </div>
    </div>
  );
}

export default AccountEdit