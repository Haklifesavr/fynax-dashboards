// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDTypography from "ResuseableComponents/MDTypography";
import MDButton from "ResuseableComponents/MDButton";
import MDBadgeDot from "ResuseableComponents/MDBadgeDot";
import PieChart from "components/Charts/PieChart";




function ChannelsPieChart({ data, options, description, tooltipTitle,title }) {
    //const [controller] = useMaterialUIController();
    //const { darkMode } = false;

    return (
        
        <Card sx={{ height: "100%" }}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <MDTypography variant="h6">{title}</MDTypography>
                <Tooltip title={`${tooltipTitle ? tooltipTitle : "Hover on tiles to see more"}`} placement="bottom" arrow>
                    <MDButton variant="outlined" color="secondary" size="small" circular iconOnly>
                        <Icon>priority_high</Icon>
                    </MDButton>
                </Tooltip>
            </MDBox>
            <MDBox mt={3}>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={10} lg={10}>
                        <PieChart chart={data} options={options} height={ window.innerWidth<600 ? "20rem" : "15rem"} />
                    </Grid>
                    {/* <Grid item xs={5}>
                        <MDBox pr={1}>
                            {
                                data.labels.map((obj, index) => {
                                    return (
                                        <MDBox mb={1}>
                                            <MDBadgeDot color="info" size="sm" badgeContent={obj} />
                                        </MDBox>
                                    )
                                })
                            }
                        </MDBox>
                    </Grid> */}
                </Grid>
            </MDBox>
            <MDBox
                pt={4}
                pb={2}
                px={2}
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                mt="auto"
            >
                {description ?
                    <MDBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
                        <MDTypography variant="button" color="text" fontWeight="light">
                            {description}
                        </MDTypography>
                    </MDBox>
                    : null}
            </MDBox>
        </Card>
    );
}

export default ChannelsPieChart;