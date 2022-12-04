import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetAllUser } from "../handleData/userBlockData";
import UserListForPost from "../fragments/UserListForPost";
import Loading from "../fragments/Loading";
import "../CSS/background.css";
import "../CSS/character.css";

//this is the post reaction Metrics component
function ReactionMetrics() {
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
                    View Post Reaction deteil
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
                          <UserListForPost
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

export default ReactionMetrics;
