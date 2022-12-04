import React, { useState, useContext } from "react";
import "../CSS/loginsignup.css";
import "../CSS/icon.css";
import { editUser } from "../handlerdata/personaldata";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDetailContext from "../context/UserDetailContext";

const Profilemanagement = () => {
  const { currentUser, setCurrentUser } = useContext(UserDetailContext);
  const navigate = useNavigate();
  const [userDetail, setDetail] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password_hash,
    joinDate: currentUser.join_Date,
  });
  const [message, setMessage] = useState("");

  //submit the modify form for the profile
  const handlerSubmit = async (event) => {
    event.preventDefault();
    //check the vaildation
    const check = await editUser(userDetail);
    if (check === "You have to modify your detial") {
      const wrongDetail = {
        username: currentUser.username,
        email: currentUser.email,
      };
      setDetail(wrongDetail);
      setMessage("You have to modify your detail");
      return;
    }
    if (check === "can not have empty username or email") {
      const wrongDetail = {
        username: currentUser.username,
        email: currentUser.email,
      };
      setDetail(wrongDetail);
      setMessage("Can not have empty username or email");
      return;
    }
    if (check === "Username or email already exist") {
      const wrongDetail = {
        username: currentUser.username,
        email: currentUser.email,
      };
      setDetail(wrongDetail);
      setMessage("Username or email already exist");
      return;
    }
    //push the data in the local and for call back
    setCurrentUser(check);
    setDetail(check);
    toast.success("You are sucessfull Edit your profile!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    navigate("/profile");
  };

  const handlerCancel = () => {
    navigate("/profile");
  };

  //this useEffect is for display the all user data

  const handerInput = (event) => {
    const nameFromHTML = event.target.name;
    const valueFromHTML = event.target.value;
    const giveValue = {
      username: userDetail.username,
      email: userDetail.email,
    };

    giveValue[nameFromHTML] = valueFromHTML;
    setDetail(giveValue);
  };

  return (
    <div className="moveEdit">
      <div className="card card-body  border border-1 shadow p-5 mb-5 submit reduceradius">
        <form onSubmit={handlerSubmit}>
          <div className="mb-5 mx-auto">
            <h5>Profile Detail:</h5>
          </div>
          <div className="mb-4">
            <label className="col-form-label moveProfileLabel">UserName</label>
            <div className="col-sm-8 mx-auto">
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
            <label className="col-form-label moveProfileLabel">Email</label>
            <div className="col-sm-8 mx-auto">
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
          {message !== null && (
            <div className="row mb-5">
              <div className="col-sm-3"></div>
              <div className="col-sm-7">
                <p className="message rounded">{message}</p>
              </div>
              <div className="col-sm-2"></div>
            </div>
          )}
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-4">
              <button type="submit" className="btn btn-success  shadow rounded">
                Submit
              </button>
            </div>
            <div className="col-sm-3">
              <button
                type="button"
                onClick={handlerCancel}
                className="btn btn-primary bg-opacity-10 shadow rounded"
              >
                Cancel
              </button>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profilemanagement;
