// @mui material components
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/////////////// BIG TODO: ADD ADD MATERIAL UI CONTEXT IN IT/////////////////////////

// Material Dashboard 2 React themes
import theme from "assets/theme";
import { Navigate, Route, Routes } from "react-router-dom";
import SignInIllustration from "pages/authentication/sign-in/illustration";
//import Sales from "pages/dashboards/Clients/Fynax/sales";

import Sidenav from "components/Sidenav";

// Images
import brandWhite from "assets/images/logo-ct.png";
import Auth from "components/Auth";

//dynamic routes import
import { DynamicRoutes } from "routes";
import { useApp } from "AppContext/AppProvider";

const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }

    if (route.route) {
      if (route.Auth) {
        //if auth required then put auth component on it
        return (
          <Route
            exact
            path={route.route}
            element={
              <Auth>
                {
                  <>
                    <Sidenav
                      color={"info"}
                      brand={brandWhite} //TODO DARK MODE CONFIG REMOVED ADD THESE LATER
                      brandName={window.localStorage.getItem("COMPANY_NAME")}
                      routes={DynamicRoutes}
                      onMouseEnter={
                        () => {}

                        //console.log("ADD THIS FEATURE ON MOUSE ENTER")
                      }
                      onMouseLeave={
                        () => {}
                        //console.log("ADD THIS FEATURE ON MOUSE LEAVE")
                      }
                    />
                  </>
                }
                {route.component}
              </Auth>
            }
            key={route.key}
          />
        );
      }
      return (
        <Route
          exact
          path={route.route}
          element={route.component}
          key={route.key}
        />
      );
    }

    return null;
  });

function App() {
  const ceo = useApp();
  const isPublic = ceo.states.publicAccess;
  let DefinedRoutes = DynamicRoutes;

  useEffect(() => {
    console.log("DEBUG TABLES STATE", ceo.states.tablesData);
    // console.log("DEBUG LOCATION", window.location.href, typeof window.location.href);
  });

  //Changing Dynamic Routes on basis of acceess , i.e. Public or login
  if (isPublic) {
    DefinedRoutes = DefinedRoutes.filter((obj) => {
      if (obj["type"] === "collapse") {
        if (obj["key"] === "dashboards") {
          obj["collapse"] = obj["collapse"].filter((objects) =>
            objects.isPublic ? objects : null
          );
        }
        if (obj["key"] === "user") {
          obj["collapse"] = obj["collapse"].filter((objects) =>
            objects.isPublic ? objects : null
          );
        }
      }
      return obj;
    });

    // console.log("DEFINED ROUTES ARE", DefinedRoutes);
  }
  // TODO: ADD UTILITY FUNCTIONS TO RUN ON EVERY RENDER
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(DefinedRoutes)}

        {/* To redirect */}
        <Route
          exact
          path="/"
          element={
            <Navigate
              to={
                ceo.states.publicAccess ? "/dashboards/analytics" : "dashboards"
              }
            />
          }
        />
        <Route exact path="/auth/signin" element={<SignInIllustration />} />
        <Route exact path="/auth/logout" element={<div>LOGOUT</div>} />
        <Route exact path="/auth/signup" element={<div>SIGNUP</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
