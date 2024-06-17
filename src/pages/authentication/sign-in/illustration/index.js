import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDTypography from "ResuseableComponents/MDTypography";
import MDInput from "ResuseableComponents/MDInput";
import MDButton from "ResuseableComponents/MDButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/IllustrationLayout/IllustrationLayout";

// Image
import bgImage from "assets/images/skyline.jpg";

//Project Imports
import Cookie from 'js-cookie';
import manager from "helpers/manager";
import {useNavigate} from "react-router-dom";
import { useApp } from "AppContext/AppProvider";
import { CircularProgress } from "@mui/material";

function SignInIllustration() {
  //States on top
  const [rememberMe, setRememberMe] = useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  //consts or variables
  const navigate= useNavigate();
  
  
  
  //handlers
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit= async (e)=>{
    e.preventDefault();
    //removing the token to ensure it doesn't refreshes 
    Cookie.remove("token")
    setLoading(true);
    const signin= await manager.signIn(e.target[0].value,e.target[2].value);
    const response = await signin.json();
    if (response.access){
      Cookie.set("token",response.access);
      setLoading(false);
      navigate("/dashboards");
    }
    else{
      setError("sorry we messed up");
    }
  }


  //Check if there is token then try to signin
  const token = Cookie.get('token')  
  if(token){
    navigate("/dashboards");
  }

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
    >
      <form onSubmit={handleSubmit}>
      <MDBox>
        <MDBox mb={2}>
          <MDInput type="email" label="Email" fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput type="password" label="Password" fullWidth />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton type="submit" variant="gradient" color="info" size="large" fullWidth>
            {loading ? <CircularProgress color="white" size={27} /> : "Sign in"}
          </MDButton>
        </MDBox>
        <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
            Don&apos;t have an account?{" "}
            <MDTypography
              component={Link}
              to="/authentication/sign-up/"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
      </form>
    </IllustrationLayout>
  );
}

export default SignInIllustration;
