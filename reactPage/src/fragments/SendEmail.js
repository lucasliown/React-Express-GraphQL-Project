import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../CSS/loginsignup.css";
import {
  getcode,
  saveCodeIntoLocal,
  saveTime,
  countTime,
  countDisableTime,
} from "../handlerdata/personaldata";

//this component is use the emailjs to send the email for MFA
const SendEmail = (props) => {
  const [codeDetail, setcodeDetail] = useState(getcode());
  const [timeCount, setTimeCount] = useState(countTime() + "s");
  const [sendButton, setsendButton] = useState(countDisableTime());
  const [count, setCount] = useState(0);

  //send the email function
  const sendEmail = (e) => {
    if (props.email === null || props.email === "") {
      props.setError();
      return;
    }

    setcodeDetail(getcode());
    saveCodeIntoLocal(codeDetail);
    var templateParams = {
      EmailAddress: props.email,
      code: codeDetail,
    };

    //this is the thirty party library for send email
    // emailjs.send('service_irh7jur', 'template_a6za36k', templateParams, 'dCzhfukWxLw8RGk3Q')
    //     .then((result) => {
    //         console.log(result.text);
    saveTime();
    setsendButton(false);
    // }, (error) => {
    //     console.log(error.text);
    //     props.setFailEamil();
    // });
  };

  //this is for count the time for prevent user send the email repeat and repeat
  useEffect(() => {
    const timer = setTimeout(() => {
      const counter = count + 1;
      setCount(counter);
      setTimeCount(countTime() + "s");
      if (countDisableTime() === true) {
        setsendButton(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div>
      {sendButton === true ? (
        <input
          onClick={sendEmail}
          className="btn btn-outline-secondary rounded sendCodeButton"
          type="button"
          value="Send"
          data-testid="sendAuthCode"
        />
      ) : (
        <input
          onClick={sendEmail}
          className="btn btn-outline-secondary rounded sendCodeButton"
          type="button"
          value={timeCount}
          disabled
        />
      )}
    </div>
  );
};

export default SendEmail;
