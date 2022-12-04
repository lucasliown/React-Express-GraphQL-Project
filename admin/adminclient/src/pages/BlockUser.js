import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetAllUser } from "../handleData/userBlockData";
import UserDetail from "../fragments/UserDetail";
import Loading from "../fragments/Loading";
import "../CSS/background.css";
import "../CSS/character.css";

//this is the blocak user component
function BlockUser() {
  const { loading, data, refetch } = useQuery(GetAllUser);

  useEffect(() => {
    refetch();
  });

  return (
    <main role="main" className="min-vh-100 backgroundColour">
      <div className="container move mb-5">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm-8">
            {loading ? (
              <Loading />
            ) : (
              <div className="card border-0">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <h5 className="card-title tableTitle border-0">
                    Block/unblock
                  </h5>
                  <br></br>
                  <table className="table table-sm table-borderless tableHeader mb-0">
                    <thead>
                      <tr>
                        <th>Username :</th>
                        <th>Email :</th>
                        <th>Join Date :</th>
                        <th>Status :</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.allUsers.map((user) => {
                        return (
                          <UserDetail
                            key={user.user_id}
                            detail={user}
                            refetchUser={refetch}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="col-sm"></div>
        </div>
      </div>
    </main>
  );
}

export default BlockUser;
