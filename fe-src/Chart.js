import React from "react";
import PropTypes from "prop-types";
import Highcharts, { Chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getIssuesPartition, getTimeDistanceInDays } from "./helper";

const daysAge = [5, 6, 9];

const AgeChart = ({ issues }) => {
  let remainingIssues = issues;

  // TODO: FIx logical bug
  const series = daysAge.map((dayAge, ageIndex) => {
    const issuesPartition = getIssuesPartition(
      remainingIssues,
      (issue) => getTimeDistanceInDays(issue) > dayAge
    );

    remainingIssues = remainingIssues.filter(
      (issue) => getTimeDistanceInDays(issue) > dayAge
    );

    if (ageIndex === 0) {
      return {
        name: `< ${dayAge} days`,
        data: [issuesPartition[1].length],
      };
    }

    return {
      name: `> ${dayAge} days`,
      data: [issuesPartition[0].length],
    };
  });

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Stacked column chart",
    },
    xAxis: {
      categories: ["Age"],
    },
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
    series,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

AgeChart.propTypes = {
  issues: PropTypes.array.isRequired,
};

export default AgeChart;
