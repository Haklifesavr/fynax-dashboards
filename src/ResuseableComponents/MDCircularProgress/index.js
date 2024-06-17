
// Material Dashboard 2 PRO React components
import MDTypography from "ResuseableComponents/MDTypography";

import { CircularProgress } from "@mui/material";

const MDCircularProgress = ({ color , size })=>{

  if (!color){
    color='info'
  }
  if (!size){
    size='40'
  }

  return (
    <CircularProgress color={color} size={size}/>
  )
}


export default MDCircularProgress;
