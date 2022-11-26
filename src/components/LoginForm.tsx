import React from 'react'
import "../LoginForm.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function LoginForm() {
    const initialValues = { username: "", mailAddress: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErros, setFormErrors] = useState({username: "", mailAddress: "", password: ""});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLogin, setIsLogin] = useState(0);
    
    const handleChange = (e:any) => {
      // console.log(e.target.name);
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      // console.log(formValues);
    };

    const toRegister = () => {
      window.open('./register');
    }

    const onSubmit = (name:string, email:string, password:string) => {
        axios.post("https://hackathon-4y7j2tipqq-uc.a.run.app/user/login", {
          name: name,
          email: email,
          password: password,
        }).then((response: any) => {
            console.log('body:', response.data);
            if (response.data == "Yes") {
                setIsLogin(1);;
                window.location.pathname = "./home";
                sessionStorage.setItem('accountName', name);
            } else {
                setIsLogin(2);
            }
      });
    }

    const handleSubmit = (event:any) => {
      event.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      if (Object.keys(formErros).length === 0 && isSubmit) {
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
      const errors:any = {}
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
    <>


      <div className="formContainer" id = "formContainer">
        <form>
          <h1>ログインフォーム</h1>
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
            <button className="loginButton" onClick={(e) => handleSubmit(e)}>ログイン</button>

            {Object.keys(formErros).length === 0 && isLogin === 1 && (
              <div className="msgOk">ログインに成功しました</div>
            )}

            {Object.keys(formErros).length === 0 && isLogin === 2 && (
              <div className="msgOk">ログインに失敗しました</div>
            )}
          <button className="loginButton" onClick={toRegister}>新規登録</button>

          </div>
        </form>
      </div>
     
      </>
    );
  }
  

  
  export default LoginForm;