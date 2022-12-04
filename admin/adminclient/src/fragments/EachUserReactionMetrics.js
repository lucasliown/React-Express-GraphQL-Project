import React, { useEffect, useState } from "react";
import moment from "moment";
import client from "../apollo/client";
import "../CSS/background.css";
import "../CSS/character.css";
import { getGetLikeCount, getGetDislikeCount } from "../handleData/metricsData";
import Loading from "../fragments/Loading";
import { useParams, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//this is the post reaction Metrics component
function EachUserReactionMetrics() {
  let { user_id, username } = useParams();
  const [dataFromLikeChart, setdataFromLikeChart] = useState([]);
  const [showLikeChart, setShowLikeChart] = useState(true);
  const [dataFromDislikeChart, setdataFromDislikeChart] = useState([]);
  const [showDislikeChart, setShowDislikeChart] = useState(true);
  const navigate = useNavigate();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  //this is update like chart function
  const updataChartLike = (data) => {
    let labels = [];
    let emptyNumber = [];
    if (data.getPostReactionLikeCount.length === 0) {
      setShowLikeChart(false);
    }
    for (const dataM of data.getPostReactionLikeCount) {
      const Release =
        "Publish: " + moment(dataM.post_time).format("MMMM Do YYYY, h:mm a");
      labels.push(Release);
      emptyNumber.push(dataM.likeCount);
    }
    setdataFromLikeChart({
      labels,
      datasets: [
        {
          label: "Count of Like Reaction",
          data: emptyNumber,
          backgroundColor: "rgba(203, 120, 207, 0.585)",
        },
      ],
    });
  };

  //mount the like chart
  useEffect(() => {
    client
      .query({
        query: getGetLikeCount,
        variables: { user_id },
        fetchPolicy: "network-only",
      })
      .then((result) => {
        updataChartLike(result.data);
      });
      // eslint-disable-next-line
  }, []);

  //this is update dislike chart function
  const updataChartDislike = (data) => {
    let labels = [];
    let emptyNumber = [];
    if (data.getPostReactionDislikeCount.length === 0) {
      setShowDislikeChart(false);
    }
    for (const dataM of data.getPostReactionDislikeCount) {
      const Release =
        "Publish: " + moment(dataM.post_time).format("MMMM Do YYYY, h:mm a");
      labels.push(Release);
      emptyNumber.push(dataM.dislikeCount);
    }
    setdataFromDislikeChart({
      labels,
      datasets: [
        {
          label: "Count of Dislike Reaction",
          data: emptyNumber,
          backgroundColor: "rgba(203, 120, 207, 0.585)",
        },
      ],
    });
  };

  //mount the dislike function
  useEffect(() => {
    client
      .query({
        query: getGetDislikeCount,
        variables: { user_id },
        fetchPolicy: "network-only",
      })
      .then((result) => {
        updataChartDislike(result.data);
      });
      // eslint-disable-next-line
  }, []);

  //go back function
  const handlerGoBack = () => {
    navigate("/reactionmetrics");
  };

  return (
    <main role="main" className="min-vh-100 backgroundColour">
      <div className="container move mb-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            {dataFromLikeChart.length === 0 && showLikeChart === true ? (
              <Loading />
            ) : showLikeChart === false ? (
              <div className="card border-0 reduceradius">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <h2 className="card-title useTitle border-0 mb-4">
                    User: {username}
                  </h2>
                  <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm-6">
                      <h5 className="card-title tableTitle border-0">
                        The number of Like Reaction for each Post
                      </h5>
                    </div>
                    <div className="col-sm"></div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mx-5 mt-5 p-5 ">
                    <div className=" mb-0 p-5 warningBackground">
                      <div className="material-icons mx-5 mt-5 changeFontOfWarning">
                        error
                      </div>
                      <div className="mt-5 changeWarningCharacter mx-4">
                        No enough Data !
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border-0 reduceradius">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <h2 className="card-title useTitle border-0 mb-4">
                    User: {username}
                  </h2>
                  <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm-6">
                      <h5 className="card-title tableTitle border-0">
                        The number of Like Reaction for each Post
                      </h5>
                    </div>
                    <div className="col-sm"></div>
                  </div>
                  <br></br>
                  <Bar options={options} data={dataFromLikeChart} />
                </div>
              </div>
            )}
            {dataFromDislikeChart.length === 0 && showDislikeChart === true ? (
              <Loading />
            ) : showDislikeChart === false ? (
              <div className="card border-0 reduceradius">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm-6">
                      <h5 className="card-title tableTitle border-0">
                        The number of Disike Reaction for each Post
                      </h5>
                    </div>
                    <div className="col-sm"></div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mx-5 mt-5 p-5 ">
                    <div className=" mb-0 p-5 warningBackground">
                      <div className="material-icons mx-5 mt-5 changeFontOfWarning">
                        error
                      </div>
                      <div className="mt-5 changeWarningCharacter mx-4">
                        No enough Data !
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border-0 reduceradius">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm-6">
                      <h5 className="card-title tableTitle border-0">
                        The number of Disike Reaction for each Post
                      </h5>
                    </div>
                    <div className="col-sm"></div>
                  </div>
                  <br></br>
                  <Bar options={options} data={dataFromDislikeChart} />
                </div>
              </div>
            )}
          </div>
          <div className="col-sm-1">
            <button className="material-icons close" onClick={handlerGoBack}>
              clear
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EachUserReactionMetrics;
