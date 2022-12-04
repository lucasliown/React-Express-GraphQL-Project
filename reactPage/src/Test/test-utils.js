import React, { useState } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { getUserData } from "../handlerdata/personaldata";
import UserDetailContext from "../context/UserDetailContext";
import FollowingListContext from "../context/FollowingListContext";
import UnFollowListContext from "../context/UnFollowListContext";

//add the provider for test
const AllTheProviders = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: "1111@126.com",
    join_Date: "Thu 28 Jul 2022",
    password_hash:
      "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
    user_id: "34fc5338-7226-48cd-8d48-1ded7f5fd6b3",
    username: "kaige",
    blockStatus: "false",
  });
  const [followList, setFollowList] = useState([]);
  const [unFollowList, setUnfollowList] = useState([]);

  return (
    <BrowserRouter>
      <UserDetailContext.Provider value={{ currentUser, setCurrentUser }}>
        <FollowingListContext.Provider value={{ followList, setFollowList }}>
          <UnFollowListContext.Provider
            value={{ unFollowList, setUnfollowList }}
          >
            {children}
          </UnFollowListContext.Provider>
        </FollowingListContext.Provider>
      </UserDetailContext.Provider>
    </BrowserRouter>
  );
};

const providerRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { providerRender as render };
