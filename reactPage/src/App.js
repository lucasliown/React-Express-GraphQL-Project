import React, { useState, useEffect } from "react";
import "./App.css";
import Navcomponent from "./fragments/Navcomponent";
import Home from "./fragments/Home";
import Footercomponent from "./fragments/Footercomponent";
import Signincomponent from "./pages/Signincomponent";
import Profilecomponent from "./pages/Profilecomponent";
import Signupcomponent from "./pages/Signupcomponent";
import Profilemanagement from "./pages/Profilemanagement";
import Postingcomponent from "./pages/Postingcomponent";
import Allpostcomponent from "./pages/Allpostcomponent";
import Favouritecomponent from "./pages/Favouritecomponent";
import OthersProfilecomponent from "./pages/OthersProfilecomponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  getUserData,
  logoutFromWbsite,
  removeCodeFromLocal,
} from "./handlerdata/personaldata";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetailContext from "./context/UserDetailContext";
import FollowingListContext from "./context/FollowingListContext";
import UnFollowListContext from "./context/UnFollowListContext";
import { displayFollowUer, displayUnFollowUer } from "./handlerdata/followData";

function App() {
  const [exploreOnOrOff, setExplore] = useState(false);
  const [currentUser, setCurrentUser] = useState(getUserData());
  const [followList, setFollowList] = useState([]);
  const [unFollowList, setUnfollowList] = useState([]);

  //this call back function is for log out
  const logout = () => {
    logoutFromWbsite();
    setCurrentUser(null);
    removeCodeFromLocal();
    toast.dismiss();
  };

  //get the following list
  useEffect(() => {
    const fetchFollowUser = async () => {
      const data = await displayFollowUer();
      setFollowList(data);
    };
    fetchFollowUser().catch(console.error);
  }, [currentUser]);

  //get the unfollow list
  useEffect(() => {
    const fetchUnFollowUser = async () => {
      const data = await displayUnFollowUer();
      setUnfollowList(data);
    };
    fetchUnFollowUser().catch(console.error);
  }, [currentUser]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <UserDetailContext.Provider
          value={{ currentUser, setCurrentUser, logout }}
        >
          <FollowingListContext.Provider value={{ followList, setFollowList }}>
            <UnFollowListContext.Provider
              value={{ unFollowList, setUnfollowList }}
            >
              <Navcomponent />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      explore={setExplore}
                      exploreOnOrOff={exploreOnOrOff}
                    />
                  }
                />
                <Route path="/signin" element={<Signincomponent />} />
                <Route path="/signup" element={<Signupcomponent />} />
                <Route path="/profile" element={<Profilecomponent />}>
                  <Route path="edit" element={<Profilemanagement />} />
                </Route>
                <Route path="/posting" element={<Postingcomponent />} />
                <Route path="/favourite" element={<Favouritecomponent />} />
                <Route path="/allpost" element={<Allpostcomponent />} />
                <Route
                  path="/otherdProfile/:user_id/:username/:email/:join_Date/:page"
                  element={<OthersProfilecomponent />}
                />
              </Routes>
              <Footercomponent />
            </UnFollowListContext.Provider>
          </FollowingListContext.Provider>
        </UserDetailContext.Provider>
      </BrowserRouter>

      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
