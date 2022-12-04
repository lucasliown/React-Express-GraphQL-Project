import React, { useState, useContext } from "react";
import "../CSS/loginsignup.css";
import { useNavigate } from "react-router-dom";
import "../CSS/icon.css";
import { deleteUser } from "../handlerdata/personaldata";
import { Outlet, Link } from "react-router-dom";
import Modalalert from "../Utilities/Modalalert";
import UserDetailContext from "../context/UserDetailContext";
import FollowedList from "../fragments/FollowedList";

//this profile page is for display the profile
const Profilecomponent = (props) => {
  const { currentUser, setCurrentUser } = useContext(UserDetailContext);
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [messageInmodal, setmessageInmodal] = useState("");
  const [titleInmodal, settitleInmodal] = useState("");
  const page="profile";

  const handlerWarning = () => {
    setshow(true);
    setmessageInmodal("Do you really want to delete the account?");
    settitleInmodal("Please read the instruction");
  };

  const handlerDelateUser = async () => {
    await deleteUser(currentUser.user_id);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <main role="main" className="min-vh-100 backgroundcolour">
      <div className="container moveProfile  ">
        <div className="row mb-3">
          <div className="col-sm-1"></div>
          <div className="col-sm-2 listCharacter mb-2">My Profile</div>
          <hr className="colorHr"></hr>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <FollowedList page={page}/>
          </div>
          <div className="col-sm-7 character">
            <div className="card shadow p-5 mb-5 submit border border-1 reduceradius">
              <div>
                <h5 className="card-title ProfileTitle">Profile :</h5>
              </div>
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-2 text-start">
                  <div className="material-icons accountSize">
                    account_circle
                  </div>
                </div>
                <div className="col-sm-7">
                  <div>
                    <span>{currentUser.username}</span>
                  </div>
                  <div className="text-muted">
                    <span>{currentUser.email}</span>
                  </div>
                </div>
                <div className="col-sm-2 row">
                  <div className="col-sm-6">
                    <Link
                      to="edit"
                      className="material-icons reduceBoader becomeblue removeundercore "
                    >
                      edit
                    </Link>
                  </div>

                  <div className="col-sm-6">
                    <button
                      onClick={handlerWarning}
                      className="material-icons reduceBoader becomeRed "
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="row card-footer text-muted fw-bold ">
                <div className="col-sm-7 row mx-auto moveJoinDate">
                  <div className="col-sm-4">
                    <span>Joined:</span>
                  </div>
                  <div className="col-sm-8 ">
                    <span>{currentUser.join_Date}</span>
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
      {/* this is the warning alert */}
      <Modalalert
        show={show}
        setshowModal={setshow}
        settile={titleInmodal}
        settest={messageInmodal}
        dothings={handlerDelateUser}
      />
    </main>
  );
};

export default Profilecomponent;
