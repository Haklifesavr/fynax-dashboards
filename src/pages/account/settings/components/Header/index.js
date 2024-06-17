import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDTypography from "ResuseableComponents/MDTypography";
import MDAvatar from "ResuseableComponents/MDAvatar";

// Images
import profilePicture from "assets/images/neutral-profile-pic.jpg";
import { useApp } from "AppContext/AppProvider";


function Header() {
  const ceo = useApp();
  const [visible, setVisible] = useState(true);

  const handleSetVisible = () => setVisible(!visible);

  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={profilePicture} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              {ceo.states.userProfile.first_name} {ceo.states.userProfile.last_name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {window.localStorage.getItem("COMPANY_NAME")}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              {/* <MDTypography variant="caption" fontWeight="regular">
                Switch to {visible ? "invisible" : "visible"}
              </MDTypography> */}
              {/* <MDBox ml={1}>
                <Switch checked={visible} onChange={handleSetVisible} />
              </MDBox> */}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
