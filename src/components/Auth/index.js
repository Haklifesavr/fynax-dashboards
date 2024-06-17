import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { backendRoot, verifyTokenPath } from "../../backendInfo";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useApp } from "AppContext/AppProvider";

const Auth = (props) => {
  const ceo = useApp();
  const navigate = useNavigate();
  const verifyToken = () => {
    const token = Cookies.get("token");
    if (token && !ceo.states.publicAccess) {
      const url = `${backendRoot}/${verifyTokenPath}`;
      axios
        .post(url, { token })
        .then((res) => {
          // console.log("verify res", res);
          if (res.status === 200) {
            // console.log("status code is 200");
            ceo.actions.setIsAuthenticated(1);
            navigate("/dashboards");
          }
        })
        .catch((err) => {
          // console.log("error: ", err);
          //navigate("/auth/signin");
        });
    } else if (!ceo.states.publicAccess) {
      // console.log("not authenticated");
      //navigate("/auth/signin");
    }
  };

  useLayoutEffect(() => {
    verifyToken();
  }, []);



  return ceo.states.isAuthenticated === 1 || ceo.states.publicAccess ? (
    <> {props.children} </>
  ) : (
    <Navigate to="/auth/signin" />
  );
};

export default Auth;
