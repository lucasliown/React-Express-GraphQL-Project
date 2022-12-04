import React from "react";
import "./App.css";
import Navcomponent from "./fragments/Navcomponent";
import BlockUser from "./pages/BlockUser";
import DeletePost from "./pages/DeletePost";
import FollowerMetrics from "./pages/FollowerMetrics";
import ProfileMetrics from "./pages/ProfileMetrics";
import EachUserProfileMetrics from "./fragments/EachUserProfileMetrics";
import ReactionMetrics from "./pages/ReactionMetrics";
import EachUserReactionMetrics from "./fragments/EachUserReactionMetrics";
import UsageMetrics from "./pages/UsageMetrics";
import Home from "./fragments/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//this is root component for adminClient
function App() {
  return (
    <div className="d-flex flex-column min-vh-100 ">
      <BrowserRouter>
        <Navcomponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blockuser" element={<BlockUser />} />
          <Route path="/deletePost" element={<DeletePost />} />
          <Route path="/followermetrics" element={<FollowerMetrics />} />
          <Route path="/profilemetrics" element={<ProfileMetrics />} />
          <Route
            path="/profilemetrics/:user_id/:username"
            element={<EachUserProfileMetrics />}
          />
          <Route path="/reactionmetrics" element={<ReactionMetrics />} />
          <Route
            path="/reactionmetrics/:user_id/:username"
            element={<EachUserReactionMetrics />}
          />
          <Route path="/usagemetrics" element={<UsageMetrics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
