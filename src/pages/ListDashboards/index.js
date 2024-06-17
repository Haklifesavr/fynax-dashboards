// @mui material components
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import { useApp } from "AppContext/AppProvider";
import { useNavigate } from "react-router-dom";
import MDCircularProgress from "ResuseableComponents/MDCircularProgress";

function ListDashboard() {
  const ceo = useApp();
  const [is_loading, set_loading] = useState(true);
  const navigate = useNavigate();
  
  const handleClick = (dashboardDetails) => {
    set_loading(false);
    ceo.actions.setTransformedData(null);
    ceo.actions.setChartsData(null);
    ceo.actions.setSelectedDashboard(dashboardDetails);
    navigate("/dashboards/analytics");
  }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {is_loading ? <List>
        {ceo.states.userDashboards ?
          ceo.states.userDashboards.map((dashboard) => {
            return (
              <ListItem disablePadding>
                <ListItemButton component="button" onClick={() => handleClick(dashboard)}>
                  <ListItemText primary={dashboard.name} secondary=
                    {<div>
                      <div>Owner: {dashboard.owner}</div>
                      <div>Last Updated: {dashboard.updated_at}</div>
                    </div>}
                  />
                </ListItemButton>
              </ListItem>
            );
          }) : null}
      </List> : <MDCircularProgress />
      }
    </DashboardLayout>
  );
}

export default ListDashboard;
