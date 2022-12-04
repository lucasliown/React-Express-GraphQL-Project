import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetAllUser } from "../handleData/userBlockData";
import UserList from "../fragments/UserList";
import Loading from "../fragments/Loading";
import "../CSS/background.css";
import "../CSS/character.css";

//this is the profile Metrics component
function ProfileMetrics() {
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
                    View Profile visits deteil
                  </h5>
                  <br></br>
                  <table className="table table-sm  tableHeader">
                    <thead>
                      <tr>
                        <th>Username :</th>
                        <th>Email :</th>
                        <th>Join Date :</th>
                        <th>Detail :</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.allUsers.map((user) => {
                        return (
                          <UserList
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

export default ProfileMetrics;
