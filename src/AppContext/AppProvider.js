import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import manager from "helpers/manager";
import {  useNavigate } from "react-router-dom";

// The Material Dashboard 2 PRO React main context
const AppContext = createContext();

// Setting custom name for the context which is visible on react dev tools
AppContext.displayName = "AppContext";

function AppProvider({ children }) {
  //temporay local consts
  const navigate = useNavigate();
  //define states
  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [company_name,setCompanyName] = useState(null);
  const [company_title,setCompanyTitle] = useState(null);
  const [company_link,setCompanyLink] = useState(null);
  const [company_logo,setCompanyLogo] = useState(null);


  //Dashboard and Company Meta Data
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [userDashboards, setUserDashboards] = useState(null);
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  //charts Data
  const [chartsData, setChartsData] = useState(null);
  const [tablesData, setTablesData] = useState(null);
  const [transformedData, setTransformedData] = useState(null);
  const [selectedYear,setSelectedYear] = useState(null);
  const [publicAccess, setPublicAccess] = useState(
    window.location.href.includes("link") ? true : false
  );
  // console.log(publicAccess);
  
  const emptyAllStates=()=>{
    setIsAuthenticated(0);
    setUserProfile(null);
    setCompanyName(null);
    setCompanyTitle(null);
    setCompanyLink(null);
    setCompanyLogo(null);
    setDashboardDetails(null);
    setCompanyDetails(null);
    setChartsData(null);
    setTablesData(null);
    setTransformedData(null);
    setPublicAccess(false);
    setUserDashboards(null);
    setSelectedDashboard(null);
    setSelectedYear(null);
    Cookies.remove("token");
  }

  const states = {
    isAuthenticated,
    userProfile,
    dashboardDetails,
    companyDetails,
    chartsData,
    tablesData,
    transformedData,
    publicAccess,
    userDashboards,
    selectedDashboard,
    selectedYear,
    company_name,
    company_title,
    company_link,
    company_logo
  };

  const actions = {
    setIsAuthenticated,
    setUserProfile,
    setDashboardDetails,
    setCompanyDetails,
    setChartsData,
    setTablesData,
    setTransformedData,
    setPublicAccess,
    setUserDashboards,
    setSelectedDashboard,
    setSelectedYear,
    emptyAllStates,
    setCompanyName,
    setCompanyTitle,
    setCompanyLink,
    setCompanyLogo,
  };
  

  //Trying to fetch data before rendering
  useLayoutEffect(() => {
    let fetchData;
    if (publicAccess) {
      fetchData = async () => {
        //url to be used for public access /company/<company-name>/link/<share -id>
        //need to add code for poblic access
        const splitted_str = window.location.href.split("/").reverse();
        const share_id = splitted_str[0];
        const company_slug = splitted_str[2];
        // console.log(company_slug,share_id)
        const publicAccessMetaData_resp = await manager.getPublicAccessMetaData(
          company_slug,
          share_id
        );
        const publicAccessMetaData = await publicAccessMetaData_resp.json();
        const chartsView_resp = await manager.getPublicCharts(
          publicAccessMetaData["dashboard"].id
        );
        const chartsView = await chartsView_resp.json();

        setDashboardDetails(publicAccessMetaData["dashboard"]);
        setSelectedDashboard(publicAccessMetaData["dashboard"])
        setCompanyDetails(publicAccessMetaData["company"]);
        setChartsData(chartsView);
        // console.log(chartsView);
        navigate("/dashboards/analytics");
      };
    } else {
      fetchData = async () => {
        
        const UserProfile_resp = await manager.getProfile();
        const UserProfile = await UserProfile_resp;
        setUserProfile(await UserProfile.json())
        const UserDashboards_resp = await manager.getUserDashboards();
        const userDashboards = await UserDashboards_resp;
        if (userDashboards.status===200){
        const userDashboardsList= await userDashboards.json()
        // console.log("User Dashboard are ",userDashboardsList);
        setUserDashboards(userDashboardsList);
      }
      };
    }
    if (Cookies.get("token") || publicAccess) {
      // console.log("Data Fetching started LOGIN");
      fetchData();
      // console.log("Data Fetching stopped LOGIN");
    }
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const dashboardDetails_resp = await manager.getDashboardDetails(
        selectedDashboard.id
      );
      const dashboardDetails = await dashboardDetails_resp.json();
      const chartsView_resp = await manager.getCharts(selectedDashboard.id);
      const chartsView = await chartsView_resp.json();

      setDashboardDetails(dashboardDetails);
      //setCompanyDetails()
      setChartsData(chartsView);
      // console.log(chartsView);
      // console.log("DATA FETCHED LOGIN");
    };
    if (selectedDashboard && !publicAccess) {
      // console.log("Data Fetching started");
      fetchData();
      // console.log("Data Fetching stopped");
    }
  }, [selectedDashboard]);

  const value = { states, actions };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() {
  const context = useContext(AppContext);
  return context;
}

// Typechecking props for the MaterialUIControllerProvider
AppProvider.propTypes = PropTypes;

export { AppProvider, useApp };
