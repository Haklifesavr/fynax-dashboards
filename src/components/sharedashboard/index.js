import React from "react";
import MDButton from "ResuseableComponents/MDButton";
import MDInput from "ResuseableComponents/MDInput";
import MDTypography from "ResuseableComponents/MDTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MDBox from "ResuseableComponents/MDBox";

import manager from "helpers/manager";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "AppContext/AppProvider";

const MyForm = (props) => {
  const navigate = useNavigate();
  const ceo = useApp();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const isPublic = e.target[2].checked; //true radio button
    const formData = new FormData();
    formData.append("email", email);
    formData.append("dashboard", ceo.states.dashboardDetails.dashboard.id);
    formData.append("role","V")
    if (isPublic) {
      formData.append("public", true);
    }
    const share = await manager.shareDashboard(formData);
    const response = await share.json();
    // console.log(response);
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* NEED TO ADD MORE SHARE FILTER IN IT LATER ON  */}
      <MDBox>
        <MDBox>
          <MDInput type="email" label="Email" required fullWidth />
        </MDBox>
        {/* <MDBox mb={2}>
          <MDInput
            type="role"
            label="Role"
            fullWidth
            onChange={(e) => set_role(e.target.value)}
          />
        </MDBox> */}
        {/* <MDBox display="flex" alignItems="center" ml={-1}></MDBox> */}
      </MDBox>
      <MDBox mt={1}>
        <MDTypography variant="body2" id="demo-radio-buttons-group-label">
          Public
        </MDTypography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="False"
          name="radio-buttons-group"
        >
          <FormControlLabel value="True" control={<Radio />} label="True" />
          <FormControlLabel value="False" control={<Radio />} label="False" />
        </RadioGroup>
      </MDBox>
      <MDBox mt={1} mb={1}>
        <MDButton
          type="submit"
          variant="gradient"
          color="info"
          size="large"
          fullWidth
        >
          {"Share"}
        </MDButton>
      </MDBox>
    </form>
  );
};
export default MyForm;
