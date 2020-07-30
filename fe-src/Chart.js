import React from "react";
import PropTypes from "prop-types";
import Highcharts, { Chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { partition, getTimeDistanceInDays, groupBy, getStatus } from "./helper";

const daysAge = [30, 40, 60];
const clusters = [
  { min: 0, max: 30, name: "<= 30 days" },
  { min: 30, max: 40, name: "> 30 days & <= 40 days" },
  { min: 40, max: 60, name: "> 40 days & <= 60 days" },
  { min: 60, max: Infinity, name: "> 60 days" },
];

const statuses = {
  "1": "Backlog",
  "10004": "Selected for Development",
  "3": "In progress",
  "4": "Reopened",
  "10706": "Technical Review",
  "11100": "Ready to Release",
};

const AgeChart = ({ issues }) => {
  const jiraColumns = groupBy(issues, getStatus)
    .map((group) => ({
      ...group,
      partitions: clusters.map(
        (cluster) =>
          group.children.filter((issue) => {
            const distance = getTimeDistanceInDays(issue);
            return distance > cluster.min && distance < cluster.max;
          }).length
      ),
    }))
    .sort((a, b) => parseInt(a.group) - parseInt(b.group));

  console.log("rrr", jiraColumns);

  const s = clusters.map((c, i) => {
    const data = jiraColumns.reduce((acc, column) => {
      return acc.concat(column.partitions[i]);
    }, []);

    return { ...c, data };
  });

  const options = {
    chart: { type: "column" },
    title: { text: "" },
    xAxis: { categories: jiraColumns.map((c) => statuses[c.group]) },
    yAxis: {
      min: 0,
      title: {
        text: "Age sections",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray",
        },
      },
    },
    legend: {
      align: "right",
      x: -30,
      verticalAlign: "top",
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: s,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

AgeChart.propTypes = {
  issues: PropTypes.array.isRequired,
};

export default AgeChart;
