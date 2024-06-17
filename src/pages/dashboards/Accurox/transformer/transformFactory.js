import { helpers, chartsFactory } from "helpers/helperFunctions";

const transformFactory = (
  dashboardName,
  dashboardID,
  chartsData,
  setTransformedData,
  setTablesData
) => {
  //Write Transformation Logic Here
  console.log("BACKEND DATA:", chartsData);
  let others = chartsData["data"]["others"];
  delete chartsData["data"]["others"];
  let chartList = {};
  //YEARLY AND MONTHLY CHARTS
  for (const [key, value] of Object.entries(chartsData["data"])) {
    // eslint-disable-next-line no-loop-func
    value.forEach((new_obj) => {
      if (Object.keys(chartList).includes(key)) {
        chartList[key].push(
          new_obj.combined_key
            ? new_obj.combined_key === ""
              ? chartsFactory.getChart(new_obj, new_obj.type, null)
              : chartsFactory.getChart(
                value.filter(
                  (temp) => new_obj.combined_key === temp.combined_key
                ),
                  "COMBINED" + new_obj.type,
                )
            : chartsFactory.getChart(new_obj, new_obj.type, null)
        );
      } else {
        var object = {};
        object[key] = [];
        chartList = { ...chartList, ...object };
        chartList[key].push(
          new_obj.combined_key
            ? new_obj.combined_key === ""
              ? chartsFactory.getChart(new_obj, new_obj.type, null)
              : chartsFactory.getChart(
                  new_obj,
                  "COMBINED" + new_obj.type,
                  value.filter(
                    (temp,index) => new_obj.combined_key === temp.combined_key
                  )
                )
            : chartsFactory.getChart(new_obj, new_obj.type, null)
        );
      }
    });
  }

  //OTHER CHARTS, WHOLE DATA CHARTS
  const top_charts = [];
  const tableData = others.filter((obj)=>obj.type==="table")[0];
  others = others.filter((obj)=>obj.type!=="table");
  setTablesData(tableData);
  others.forEach((object, index) => {
    top_charts.push(chartsFactory.getChart(object, object.type));
  });

  // chartList = helpers.dedupeData(chartList)
  console.log("CHARTS LIST",chartList)
  setTransformedData({ chartList, top_charts });
  others.push(tableData)
  chartsData.data.others = others;

  return "OK";
};

export default transformFactory;
