import React, { useState, useContext } from "react";
import "../CSS/loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import { checkLogin } from "../handlerdata/personaldata";
import { toast } from "react-toastify";
import SendEmail from "../fragments/SendEmail";
import UserDetailContext from "../context/UserDetailContext";
import {addPersonVisitCount} from "../handlerdata/analysisDataService"

//this componet is for sign in
function Signincomponent() {
  const { setCurrentUser, logout } = useContext(UserDetailContext);
  const navigate = useNavigate();
  const [userDetail, setDetail] = useState({
    email: "",
    password: "",
    authcode: "",
  });
  const [message, setMessage] = useState("");

  //handler the sign in
  const checkSignin = async (event) => {
    event.preventDefault();
    //check the vaildation
    const checkPromise = await checkLogin(
      userDetail.email,
      userDetail.password,
      userDetail.authcode
    );
    const check = checkPromise;
    if (check === "You has been blocked,Please contact website Administrator") {
      logout();
      toast.error(
        "You has been blocked,Please contact website Administrator!",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
      navigate("/");
      return;
    }
    if (check !== false) {
      setCurrentUser(check);
      await addPersonVisitCount();
      toast.dismiss();
      toast.success("You are sucessfull Sign In!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/profile");
      return;
    }
    //give the wrong detail for dispaly
    const wrongDetail = {
      email: userDetail.email,
      password: "",
      authcode: "",
    };
    setDetail(wrongDetail);
    setMessage("Email or password or auth code is not correctly");
  };

  const handleNoEnterEmail = () => {
    setMessage("Please enter the Email Firist!");
  };

  const handleFailEmail = () => {
    setMessage("Fail to send Auth code");
  };

  //handle the input for onchnage
  const handerInput = (event) => {
    const nameFromHTML = event.target.name;
    const valueFromHTML = event.target.value;
    const giveValue = {
      email: userDetail.email,
      password: userDetail.password,
      authcode: userDetail.authcode,
    };
    giveValue[nameFromHTML] = valueFromHTML;
    setDetail(giveValue);
  };

  return (
    <main role="main" className="min-vh-100 backgroundcolour">
      <div className="container move">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 shadow p-5 submit border border-2 reduceradius">
            <form onSubmit={checkSignin} className="mb-4">
              <div className="row mb-1 character">
                <div className="col-sm-4 mx-auto signinTitle">
                  <h4>Sign In</h4>
                </div>
              </div>
              <div className="row mb-2 mx-auto">
                <div className="col-sm-1"></div>
                <div className="col-sm-10 movesmallmessage">
                  <p className="smallmessage">
                    Not yet registered? click <Link to="/signup"> sign up</Link>{" "}
                    here.
                  </p>
                </div>
                <div className="col-sm-1"></div>
              </div>
              <div className="mb-4">
                <label className="col-form-label movelabel character">
                  Email
                </label>
                <div className="mx-5">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="inputEmail3"
                    value={userDetail.email}
                    onChange={handerInput}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="col-form-label movelabel character">
                  Password
                </label>
                <div className="mx-5">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword3"
                    value={userDetail.password}
                    onChange={handerInput}
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-sm-4 movelabel">
                    <label className="col-form-label character">
                      Auth Code
                    </label>
                  </div>
                </div>
                <div className="mx-5">
                  <input
                    type="text"
                    name="authcode"
                    className="form-control"
                    id="inputPassword4"
                    value={userDetail.authcode}
                    onChange={handerInput}
                  />
                </div>
                <div className=" mt-1 mx-5">
                  <SendEmail
                    email={userDetail.email}
                    setError={handleNoEnterEmail}
                    setFailEamil={handleFailEmail}
                  />
                </div>
              </div>
              {message !== null && (
                <div className="row mb-4">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                    <p className="message rounded text-center" role="alert">
                      {message}
                    </p>
                  </div>
                  <div className="col-sm-1"></div>
                </div>
              )}
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="row col-sm-10  mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary shadow rounded"
                    value="login"
                    id="signIn"
                  >
                    Sign in
                  </button>
                </div>
                <div className="col-sm-1"></div>
              </div>
            </form>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </main>
  );
}

export default Signincomponent;
