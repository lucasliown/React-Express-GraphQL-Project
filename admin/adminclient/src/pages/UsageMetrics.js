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
import { GetPersonvisitCount } from "../handleData/metricsData";
import Loading from "../fragments/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//this is the useage Metrics component
function UsageMetrics() {
  const [dataFromChart, setdataFromChart] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  //this update chart function for update data
  const updataChart = (data) => {
    let labels = [];
    let emptyNumber = [];
    for (const dataM of data.getPersonVisit) {
      labels.push(moment(dataM.visitDate).format("MMMM Do YYYY"));
      emptyNumber.push(dataM.visitcount);
    }
    setdataFromChart({
      labels,
      datasets: [
        {
          label: "Usage",
          data: emptyNumber,
          backgroundColor: "rgba(203, 120, 207, 0.585)",
        },
      ],
    });
  };

  //mount the chart data in the mount stage
  useEffect(() => {
    client
      .query({ query: GetPersonvisitCount, fetchPolicy: "network-only" })
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
                    Website Usage everyday
                  </h5>
                  <br></br>
                  <Line options={options} data={dataFromChart} />
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

export default UsageMetrics;
