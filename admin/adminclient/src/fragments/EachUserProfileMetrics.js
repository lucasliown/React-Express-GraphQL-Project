import React, { useEffect, useState } from "react";
import moment from "moment";
import client from "../apollo/client";
import "../CSS/background.css";
import "../CSS/character.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getPorfileVisit } from "../handleData/metricsData";
import Loading from "../fragments/Loading";
import { useParams, useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//this is the every user profile visit Metrics component
function EachUserProfileMetrics() {
  let { user_id, username } = useParams();
  const [dataFromChart, setdataFromChart] = useState([]);
  const [showChart, setShowChart] = useState(true);
  const navigate = useNavigate();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  //this is update chart function
  const updataChart = (data) => {
    let labels = [];
    let emptyNumber = [];
    if (data.getProfileVisit.length === 0) {
      setShowChart(false);
    }
    for (const dataM of data.getProfileVisit) {
      labels.push(moment(dataM.visitDate).format("MMMM Do YYYY"));
      emptyNumber.push(dataM.visitcount);
    }
    setdataFromChart({
      labels,
      datasets: [
        {
          label: "The number of profile visits",
          data: emptyNumber,
          backgroundColor: "rgba(203, 120, 207, 0.585)",
        },
      ],
    });
  };

  //mount the chart
  useEffect(() => {
    client
      .query({
        query: getPorfileVisit,
        variables: { user_id },
        fetchPolicy: "network-only",
      })
      .then((result) => {
        updataChart(result.data);
      });
      // eslint-disable-next-line
  }, []);

  //go back function for profile
  const handlerGoBack = () => {
    navigate("/profilemetrics");
  };

  return (
    <main role="main" className="min-vh-100 backgroundColour">
      <div className="container move mb-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            {dataFromChart.length === 0 && showChart === true ? (
              <Loading />
            ) : showChart === false ? (
              <div className="card border-0">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <h2 className="card-title useTitle border-0 mb-4">
                    User: {username}
                  </h2>
                  <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm-5">
                      <h5 className="card-title tableTitle border-0">
                        The number of Profile visits everyday
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
              <div className="card border-0">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <h2 className="card-title useTitle border-0 mb-4">
                    User: {username}
                  </h2>
                  <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm-5">
                      <h5 className="card-title tableTitle border-0">
                        The number of Profile visits everyday
                      </h5>
                    </div>
                    <div className="col-sm"></div>
                  </div>
                  <br></br>
                  <Line options={options} data={dataFromChart} />
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

export default EachUserProfileMetrics;
