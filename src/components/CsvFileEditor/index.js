import transformFactory from "pages/dashboards/Fynax/transformer/transformFactory";
import { useApp } from "AppContext/AppProvider";
import { useEffect, useRef, useState } from "react";
import { chartsFactory } from "helpers/helperFunctions";
import DataGridXL from "@datagridxl/datagridxl2";
import MDBox from "ResuseableComponents/MDBox";
import MDButton from "ResuseableComponents/MDButton";
import Grid from "@mui/material/Grid";
import manager from "helpers/manager";
import { usePapaParse } from 'react-papaparse';
import MDAlert from "ResuseableComponents/MDAlert";
import DataLoader from "components/DataLoader/dataloader";
function CsvEditor(props) {
  const ceo = useApp();
  const [selected, setSelected] = useState("")
  const { jsonToCSV } = usePapaParse();


  const dgxlRef = useRef(null);
  const data = ceo.states.chartsData.data.others;
  let finalObj = {};
  Object.assign(finalObj, data[0]);

  const dgxlData = chartsFactory.getSHEET(finalObj);

  useEffect(() => {
    if (!dgxlRef.current.grid) {
      // create only once
      dgxlRef.current.grid = new DataGridXL(dgxlRef.current, {
        data: dgxlData,
      });
    }
  }, []);

  const handleSaveChangesClick = async (dgxlreference) => {
    const dgxlgrid = dgxlreference.current.grid;
    const csv_data = jsonToCSV(dgxlgrid.getData())
    const saveDataChanges = await manager.saveDataChanges(ceo.states.selectedDashboard.id, csv_data);
    if (saveDataChanges.status === 200) {
      console.log("Data altered")
        return (
          <DataLoader/>
        )
    }

    else {
      console.log("Data is not Altered Please Try Again Later");
      return(
        <MDAlert color='info' dismissible= 'true' >
          Data is not being altered please try again later </MDAlert>
      
      )}
  }

  return (
    
    <MDBox className="CSV-Editor">
      <Grid container spacing={3}>
        <Grid container spacing={3}>
          {/* <Grid item xs={6} pt={0}>
            <MDButton id="button-undo">Undo</MDButton>
            <MDButton id="button-redo">Redo</MDButton>
          </Grid> */}
          <Grid item xs={6} mt={2} mx={2} mb={0}
            style={{
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
              WritingMode: "vertical-lr"
            }}>
            <MDButton variant={"primary"} size={"lg"} id="button-save" onClick={() => handleSaveChangesClick(dgxlRef)}>Save Changes</MDButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MDBox ref={dgxlRef} style={{ height: "500px" }} />
        </Grid>
        
      </Grid>
    </MDBox>
  );
}

export default CsvEditor;
