import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChartPayroll = () => {
  const usersData = useSelector((state) => state.usersReducer);

  const [dataArrayPayroll, setDataArrayPayroll] = useState([]);

  useEffect(() => {
    let chartData = [];
    let sumPayroll = 0;

    if (usersData.length > 0) {
      for (let i = 0; i < usersData.length; i++) {
        sumPayroll += parseInt(usersData[i].salaire);
      }
      chartData.push({
        name: "Masse salariale brut",
        data: sumPayroll,
      });
    }

    chartData.push({
      name: "Masse salariale chargée",
      data: sumPayroll * 1.5,
    });

    setDataArrayPayroll(chartData);
  }, [usersData]);

  return (
    <div className="chart-overview">
      <BarChart
        width={500}
        height={300}
        data={dataArrayPayroll}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="data" fill="#e3f2fd" />
      </BarChart>
    </div>
  );
};

export default ChartPayroll;
