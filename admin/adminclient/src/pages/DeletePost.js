import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { AllPostsWithDirtyWordCheck } from "../handleData/postDeleteData";
import PostDetail from "../fragments/PostDetail";
import Loading from "../fragments/Loading";
import "../CSS/background.css";
import "../CSS/character.css";

//this is the delete post component
function DeletePost() {
  const { loading, data, refetch } = useQuery(AllPostsWithDirtyWordCheck);

  useEffect(() => {
    refetch();
  });

  return (
    <main role="main" className="min-vh-100 backgroundColour">
      <div className="container move mb-5">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm-12">
            {loading ? (
              <Loading />
            ) : (
              <div className="card border-0">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <h5 className="card-title tableTitle border-0">
                    Delete Post
                  </h5>
                  <br></br>
                  <table className="table table-sm table-borderless tableHeader mb-0">
                    <thead className="mt-5">
                      <tr>
                        <th>Publisher :</th>
                        <th>Text :</th>
                        <th>Image :</th>
                        <th>Option :</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.allPostsWithDirtyWordCheck.map((post) => {
                        return (
                          <PostDetail
                            key={post.post_id}
                            detail={post}
                            refetchPost={refetch}
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

export default DeletePost;
