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

const ChartHeadcount = () => {
  const usersData = useSelector((state) => state.usersReducer);

  const [dataArrayHeadcount, setDataArrayHeadcount] = useState([]);

  useEffect(() => {
    let chartData = [];
    let sumHeadcount = 0;

    if (usersData.length > 0) {
      for (let i = 0; i < usersData.length; i++) {
        sumHeadcount += 1;
      }
      chartData.push({
        name: "Nombre de membre",
        data: sumHeadcount,
      });
    }

    setDataArrayHeadcount(chartData);
  }, [usersData]);
  return (
    <div className="chart-overview">
      <BarChart
        width={500}
        height={300}
        data={dataArrayHeadcount}
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
        <Bar dataKey="data" fill="#b8d0eb" />
      </BarChart>
    </div>
  );
};

export default ChartHeadcount;
