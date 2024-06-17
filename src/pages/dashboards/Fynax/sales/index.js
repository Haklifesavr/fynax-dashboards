import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDButton from "ResuseableComponents/MDButton";
import MDTypography from "ResuseableComponents/MDTypography";
import Modal from '@mui/material/Modal';

// Material Dashboard 2 PRO React components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";

import SalesTable from "components/Tables/SalesTable";
import DataTable from "components/Tables/DataTable";
import CsvEditor from "components/CsvFileEditor";
import { chartsFactory } from "helpers/helperFunctions";
import { useApp } from "AppContext/AppProvider";

function Sales() {
  const ceo = useApp();
  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const [customersDropdownValue, setCustomersDropdownValue] = useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState("6 May - 7 May");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openCustomersDropdown = ({ currentTarget }) => setCustomersDropdown(currentTarget);
  const closeCustomersDropdown = ({ currentTarget }) => {
    setCustomersDropdown(null);
    setCustomersDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openRevenueDropdown = ({ currentTarget }) => setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <MDButton onClick={handleOpen}>Alter Data</MDButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <MDBox sx={style}>
                <CsvEditor/>
              </MDBox>
            </Modal>

          </Grid>
          <Grid item xs={12}>
            <Card>
              {ceo.states.tablesData ?
                <>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h5" fontWeight="medium">
                      {ceo.states.selectedDashboard.name} - Data Table
                    </MDTypography>
                  </MDBox>
                  <MDBox py={1}>
                    <DataTable
                      canSearch={true}
                      table={chartsFactory.getTABLE(ceo.states.tablesData)}
                      entriesPerPage={false}
                      showTotalEntries={true}
                      isSorted={true}
                      noEndBorder
                    />
                  </MDBox>
                </> :
                <MDBox py={3} px={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Please select a dashboard to view it's data
                  </MDTypography>
                </MDBox>
              }
            </Card>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default Sales;
