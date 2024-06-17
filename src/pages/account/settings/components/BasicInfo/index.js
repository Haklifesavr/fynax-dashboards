// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDTypography from "ResuseableComponents/MDTypography";
import MDButton from "ResuseableComponents/MDButton";

// Settings page components
import FormField from "pages/account/components/FormField";
import manager from "helpers/manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BasicInfo() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  //handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const update_profile =  await manager.updateProfile(
      e.target[0].value,
      e.target[2].value
    );
    console.log("THIS IS EVENT",update_profile)
    
    if (update_profile.status===200) {
      navigate('/dashboards');
    } else {
      setError("sorry we messed up");
    }
  };

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Update Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" onSubmit={handleSubmit} pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="First Name" placeholder="" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Last Name" placeholder="" />
          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
        <MDBox ml="auto" mt={6}>
              <MDButton
                variant="gradient"
                color="dark"
                size="small"
                type="submit"
              >
                Update Profile
              </MDButton>
            </MDBox>
      </MDBox>
    </Card>
  );
}

export default BasicInfo;
