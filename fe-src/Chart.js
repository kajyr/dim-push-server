import React from "react";
import PropTypes from "prop-types";
import Highcharts, { Chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getIssuesPartition, getTimeDistanceInDays } from "./helper";

const daysAge = [30, 40, 60];

const AgeChart = ({ issues }) => {
  const partitions = daysAge.map((dayAge) =>
    getIssuesPartition(issues, (issue) => getTimeDistanceInDays(issue) > dayAge)
  );

  const series = daysAge
    .map((dayAge, ageIndex) => {
      // First range
      if (ageIndex === 0) {
        return {
          name: `<= ${dayAge} days`,
          data: [partitions[ageIndex][1].length],
        };
      }
      // Middle range
      if (ageIndex > 0 && ageIndex < daysAge.length - 1) {
        return [
          {
            name: `> ${daysAge[ageIndex - 1]} days & <= ${dayAge} days`,
            data: [
              partitions[ageIndex - 1][0].length -
                partitions[ageIndex][0].length,
            ],
          },
          {
            name: `> ${dayAge} days & <= ${daysAge[ageIndex + 1]} days`,
            data: [
              partitions[ageIndex][0].length -
                partitions[ageIndex + 1][0].length,
            ],
          },
        ];
      }

      // Last range
      return {
        name: `> ${dayAge} days`,
        data: [partitions[ageIndex][0].length],
      };
    })
    .flat();

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
