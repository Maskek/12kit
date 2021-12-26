import React from "react";
import ReactApexChart from "react-apexcharts";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["Open issues", "Closed issues"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      series: [this.props.open, this.props.close]
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width="380"
        />
      </div>
    );
  }
}
