import { useState } from "react";
import React, { useRef } from "react";
import Stack from '@mui/material/Stack';
import MDTypography from "ResuseableComponents/MDTypography";
// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDButton from "ResuseableComponents/MDButton";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import { useApp } from "AppContext/AppProvider";
import { useEffect } from "react";
import transformFactory from "../transformer/transformFactory";
import DefaultStatisticsCard from "components/Cards/StatisticsCards/DefaultStatisticsCard";
import {comapny_title} from "config"

function DashboardSettings() {
    const ceo = useApp();
    const [selectedYear, setSelectedYear] = React.useState(null);

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
    useEffect(() => {
        if (ceo.states.transformedData) {
            const key = Object.entries(ceo.states.transformedData.chartList).reverse()[0][0]
            console.log(key);
            setSelectedYear(key)
        }
    }, [ceo.states.transformedData]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {ceo.states.selectedDashboard ?
                <>
                    <MDBox
                        sx={{
                            width: 600,
                            height: 600,
                        }}
                        ml={15}
                        color="white"
                        bgColor="grey"
                        variant="gradient"
                        borderRadius="lg"
                        shadow="lg"
                        opacity={2}
                        display="flex"
                        p={2}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={12} lg={12}>
                                <DefaultStatisticsCard
                                    color="dark"
                                    title={comapny_title}
                                    count={ceo.states.selectedDashboard.name}
                                />
                                <MDBox textAlign="center">
                                    <MDButton variant="contained" component="label" color="info" display="flex" circular="true" >
                                        Upload Data Files Here
                                        <input multiple type="file" hidden />
                                    </MDButton>
                                </MDBox>
                                </Grid>
                            </Grid>
                    </MDBox>
                </>
                :
                <MDBox py={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                        Please select a dashboard to upload new data files
                    </MDTypography>
                </MDBox>
            }
        </DashboardLayout>
    )
}
export default DashboardSettings;