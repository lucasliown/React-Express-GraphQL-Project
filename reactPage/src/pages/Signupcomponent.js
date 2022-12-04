import React, { useState, useContext } from "react";
import "../CSS/loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import { checkSignup as checkSignupData } from "../handlerdata/personaldata";
import { toast } from "react-toastify";
import UserDetailContext from "../context/UserDetailContext";
import {addPersonVisitCount} from "../handlerdata/analysisDataService"

//this is the sign up component
function Signupcomponent() {
  const { setCurrentUser } = useContext(UserDetailContext);
  const navigate = useNavigate();
  const [userDetail, setDetail] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  //for submit the sign up
  const checkSignup = async (event) => {
    event.preventDefault();
    //check the vaildation
    const check = await checkSignupData(
      userDetail.username,
      userDetail.email,
      userDetail.password
    );
    if (check === "can not have empty username or email") {
      const wrongDetail = {
        username: "",
        email: userDetail.email,
        password: userDetail.password,
      };
      setDetail(wrongDetail);
      setMessage("Can not have empty username or email");
      return;
    }

    if (check === "not strong password") {
      const wrongDetail = {
        username: userDetail.username,
        email: userDetail.email,
        password: "",
      };
      setDetail(wrongDetail);
      setMessage("Not strong password");
      return;
    }

    if (check === "username or email already exist") {
      const wrongDetail = {
        username: "",
        email: "",
        password: userDetail.password,
      };
      setDetail(wrongDetail);
      setMessage("Username or email already exist");
      return;
    }
    toast.dismiss();
    toast.success("You are sucessfull Sign Up!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    await addPersonVisitCount();
    setCurrentUser(check);
    navigate("/profile");
  };

  //handle the input for onchnage
  const handerInput = (event) => {
    const nameFromHTML = event.target.name;
    const valueFromHTML = event.target.value;
    const giveValue = {
      username: userDetail.username,
      email: userDetail.email,
      password: userDetail.password,
    };

    giveValue[nameFromHTML] = valueFromHTML;
    setDetail(giveValue);
  };

  return (
    <main role="main" className="min-vh-100 backgroundcolour">
      <div className="container move">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 border border-2 shadow p-5 submit reduceradius">
            <form onSubmit={checkSignup} className="mb-4">
              <div className="row mb-1 character">
                <div className="col-sm-4 mx-auto signinTitle">
                  <h4>Sign Up</h4>
                </div>
              </div>
              <div className="row mb-2 mx-auto">
                <div className="col-sm-1"></div>
                <div className="col-sm-10 movesmallmessage">
                  <p className="smallmessage">
                    Already registered? click <Link to="/signin"> sign in</Link>{" "}
                    here.
                  </p>
                </div>
                <div className="col-sm-1"></div>
              </div>
              <div className="mb-4">
                <label className="col-form-label movelabel character">
                  UserName
                </label>
                <div className="mx-5">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="inputEmail4"
                    value={userDetail.username}
                    onChange={handerInput}
                  />
                </div>
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
                    id="inputPassword3"
                    value={userDetail.email}
                    onChange={handerInput}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="col-form-label movelabel character">
                  Password
                </label>
                <div className="mx-5">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword4"
                    value={userDetail.password}
                    onChange={handerInput}
                  />
                </div>
              </div>
              {message !== null && (
                <div className="row mb-4">
                  <div className="col-sm-1"></div>
                  <div className="col-sm-10">
                    <p className="message rounded text-center">{message}</p>
                  </div>
                  <div className="col-sm-1"></div>
                </div>
              )}
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="row col-sm-10 d-grid gap-2 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary shadow rounded"
                    value="login"
                    id="signUp"
                  >
                    Sign up
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

export default Signupcomponent;
