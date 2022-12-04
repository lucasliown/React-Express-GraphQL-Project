import React, { useEffect, useState } from "react";
import client from "../apollo/client";
import "../CSS/background.css";
import "../CSS/character.css";
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
import { Top10FollowedUser } from "../handleData/metricsData";
import Loading from "../fragments/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//this is the follower Metrics component
function FollowerMetrics() {
  const [dataFromChart, setdataFromChart] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  //this is updata function for update chart
  const updataChart = (data) => {
    let labels = [];
    let emptyNumber = [];
    for (const dataM of data.topFollowed) {
      labels.push(dataM.username);
      emptyNumber.push(dataM.following_count);
    }
    setdataFromChart({
      labels,
      datasets: [
        {
          label: "Subscription",
          data: emptyNumber,
          backgroundColor: "rgba(203, 120, 207, 0.585)",
        },
      ],
    });
  };

  //this is a function that mount the chart
  useEffect(() => {
    client
      .query({ query: Top10FollowedUser, fetchPolicy: "network-only" })
      .then((result) => {
        updataChart(result.data);
      });
  }, []);

  return (
    <main role="main" className="min-vh-100 backgroundColour">
      <div className="container move mb-5">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm-12">
            {dataFromChart.length === 0 ? (
              <Loading />
            ) : (
              <div className="card border-0">
                <div className="card-body tableBackgroundColor p-5 shadow">
                  <h5 className="card-title tableTitle border-0">
                    Top 10 Follower of blogger Metrics
                  </h5>
                  <br></br>
                  <Bar options={options} data={dataFromChart} />
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

export default FollowerMetrics;
