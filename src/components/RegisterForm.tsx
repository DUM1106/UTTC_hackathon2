import React from 'react'
import "../LoginForm.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { setFlagsFromString } from 'v8';

const RegisterForm = () => {
  const initialValues = { username: "", mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErros, setFormErrors] = useState({username: "", mailAddress: "", password: ""});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
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

  const onSubmit = (name:string, email:string, password:string) => {
    axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/register", {
      name: name,
      email: email,
      password: password,
    }).then((response: any) => {
        console.log('body:', response.data);
        if (response.data == "Yes") {
          setIsLogin(true);
          setFormValues({username: "", mailAddress: "", password: ""});
          window.location.pathname = "./login";
      }
  });
}

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    for (let i = 0; i < len; i ++) {
      if (Member[i].name == formValues.username) {
        setAccountCheck(false)
        setTimeout(() => {
          window.location.href = "/register";
        }, 1 * 1000);
        break
      }
    }
    if (Object.keys(formErros).length === 0 && isSubmit && accountCheck) {
      onSubmit(formValues.username, formValues.mailAddress, formValues.password);
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
    <div className="formContainer" id="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>新規登録フォーム</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>ユーザー名</label>
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
            <label>メールアドレス</label>
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
            <label>パスワード</label>
            <input
              type="text"
              name="password"
              placeholder="パスワード"
              value={formValues.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErros.password}</p>
          <button className="loginButton">登録</button>
          {Object.keys(formErros).length === 0 && isSubmit && isLogin && (
            <div className="msgOk">登録に成功しました</div>
          )}
          {!accountCheck && (
            <div className="msgOk">このユーザー名は使用されています</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm