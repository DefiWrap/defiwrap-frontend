import React, { useState, useEffect } from "react";
import axios from "axios";

import LineChart from "./charts/lineChart";

import {
  barChartDataCharts1,
  barChartDataCharts2,
  barChartOptionsCharts1,
  barChartOptionsCharts2,
  bubbleChartData,
  bubbleChartOptions,
  donutChartDataCharts1,
  donutChartOptionsCharts1,
  lineBarChartData,
  lineBarChartOptions,
  lineChartDataCharts1,
  lineChartDataCharts2,
  lineChartOptionsCharts1,
  lineChartOptionsCharts2,
  pieChartDataCharts1,
  pieChartOptionsCharts1,
  polarChartDataCharts,
  polarChartOptionsCharts,
  radarChartDataCharts,
  radarChartOptionsCharts
} from "./charts/chartData.js";
import tableData1 from "./tableData.json";
import { Box } from "@chakra-ui/react";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  const columnsData1 = [
    {
      Header: "NAME",
      accessor: "name"
    },
    {
      Header: "POSITION",
      accessor: "position"
    },
    {
      Header: "OFFICE",
      accessor: "office"
    },
    {
      Header: "AGE",
      accessor: "age"
    },
    {
      Header: "START DATE",
      accessor: "date"
    },
    {
      Header: "SALARY",
      accessor: "salary"
    }
  ];

  return (
    <div>
      <LineChart
                chartData={lineChartDataCharts2}
                chartOptions={lineChartOptionsCharts2}
              />
    </div>
  );
};

export default Chart;
