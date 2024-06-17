// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDTypography from "ResuseableComponents/MDTypography";
import MDButton from "ResuseableComponents/MDButton";
import MDInput from "ResuseableComponents/MDInput";
import Cookie from "js-cookie";
import manager from "helpers/manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
function ChangePassword() {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  //handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reset_password =  await manager.changePassword(
      e.target[0].value,
      e.target[2].value
    );
    console.log("THIS IS EVENT",reset_password)
    
    if (reset_password.status===200) {
      Cookie.remove("token")
      navigate('/auth/signin');
    } else {
      setError("sorry we messed up");
    }
  };
  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;
    return (
      <MDBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <MDTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    );
  });
  return (
      <Card id="change-password">
        <MDBox p={3}>
          <MDTypography variant="h5">Change Password</MDTypography>
        </MDBox>
        <MDBox  pb={3} px={3}>
          <form onSubmit={handleSubmit} >
            {" "}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="New Password"
                  inputProps={{ type: "password", autoComplete: "" }}
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="Confirm New Password"
                  inputProps={{ type: "password", autoComplete: "" }}
                />
              </Grid>
            </Grid>
            
            <MDBox ml="auto" mt={6}>
              <MDButton
                variant="gradient"
                color="dark"
                size="small"
                type="submit"
              >
                update password
              </MDButton>
            </MDBox>
          </form>

          <MDBox mt={6} mb={1}>
            <MDTypography variant="h5">Password requirements</MDTypography>
          </MDBox>
          <MDBox mb={1}>
            <MDTypography variant="body2" color="text">
              Please follow this guide for a strong password
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            flexWrap="wrap"
          >
            <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </MDBox>
          </MDBox>
        </MDBox>
      </Card>
  );
}
export default ChangePassword;
