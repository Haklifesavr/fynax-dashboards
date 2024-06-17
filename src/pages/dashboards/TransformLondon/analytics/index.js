/* eslint-disable array-callback-return */
// @mui material components
import React, { useRef } from "react";
import Grid from "@mui/material/Grid";
// import {Treemaps} from "d3-treemap/dist"
import Treemaps from "components/Charts/TreeMapChart/Treemaps";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDCircularProgress from "ResuseableComponents/MDCircularProgress";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import ReportsBarChart from "components/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "components/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultStatisticsCard from "components/Cards/StatisticsCards/DefaultStatisticsCard";
import ChannelsPieChart from "components/Charts/ChannelsPieChart";
import CombinedBarChart from "components/Charts/BarCharts/CombinedBarChart";
// tranform Factory
import transformFactory from "../transformer/transformFactory";
// import ChartDataLabels from "chartjs-plugin-labels";

//APP Context
import { useApp } from "AppContext/AppProvider";
import { useEffect } from "react";
import { helpers } from "helpers/helperFunctions";
import { Co2Sharp, Grid3x3 } from "@mui/icons-material";

// window.React = React
// ChannelsPieChart.register(ChartDataLabels);
const chartColors = [
  "info",
  "success",
  "secondary",
  "dark",
  "primary",
  "error",
  "warning",
];

function Analytics() {
  const ceo = useApp();


  useEffect(() => {
    if (ceo.states.chartsData) {
      transformFactory(
        "dashboardName",
        "dashboardID",
        ceo.states.chartsData,
        ceo.actions.setTransformedData,
        ceo.actions.setTablesData
      );
    }
  }, [ceo.states.chartsData]);

  // cDU: When Transform data is populated , set first time year in selectedYear state

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {ceo.states.transformedData ? (
        <>
          <MDBox mt={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <MDBox mb={3}>
                  <DefaultStatisticsCard
                    color="dark"
                    title={window.localStorage.getItem("TITLE")}
                    count={ceo.states.selectedDashboard.name}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>

          {/* FOR SCORE CARDS AT TOP */}
          {/* FOR OTHER CHARTS WHICH REQUIRE FULL WIDTH SUCH AS TREE MAP */}
          {/* FOR CHARTS LIKE PIE , THEY SHOULD BE ABOVE THIS COMMENT */}
          <MDBox mt={6}>
            <Grid container spacing={5}>
              {Object.entries(ceo.states.transformedData.chartList)
                .reverse()
                .map((data) => {
                  let key = data[0];
                  let values = data[1];
                  if (ceo.states.selectedYear === key) {
                    return (
                      <>
                        <Grid item xs={12} sm={12} lg={12}>
                          <DefaultStatisticsCard title={"year"} count={key} />
                        </Grid>
                        <>
                          {values
                            .filter((object) => object.type === "SCORECARD")
                            .map((object) => {
                              return (
                                <Grid item xs={12} lg={6} md={7}>
                                  <ComplexStatisticsCard
                                    color="dark"
                                    icon="info"
                                    title={object.title}
                                    count={object.data}
                                    percentage={{
                                      color: "success",
                                    }}
                                  />
                                </Grid>
                              );
                            })}
                          {values
                            .filter((object) => object.type === "TREEMAP")
                            .map((object) => {
                              return (
                                <Grid item xs={12} sm={12} lg={12}>
                                  <Treemaps
                                    treeData={object}
                                    height={150}
                                    width={400}
                                    title={object.datasets.label}
                                  />
                                </Grid>
                              );
                            })}
                          {values
                            .filter((object) => object.type === "COMBINEDBAR")
                            .map((object, index) => {
                              return (
                                <Grid item xs={12} sm={12} lg={12}>
                                  <CombinedBarChart
                                    color={chartColors[index]}
                                    chart={object}
                                    title={object.label}
                                  />
                                </Grid>
                              );
                            })}
                          {values
                            .filter((object) => object.type === "BAR")
                            .map((object, index) => {
                              return (
                                <Grid item xs={12} sm={12} lg={12}>
                                  <ReportsBarChart
                                    color={chartColors[index]}
                                    title={object.datasets.label}
                                    chart={object}
                                  />
                                </Grid>
                              );
                            })}
                        </>
                      </>
                    );
                  }
                  else {
                    return null;
                  }
                })}
            </Grid>
          </MDBox>
        </>
      ) : (
        <MDBox mt={1.5}>
          {" "}
          <MDCircularProgress color="info" size={40} />{" "}
        </MDBox>
      )}
    </DashboardLayout>
  );
}

export default Analytics;
