import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "ResuseableComponents/MDBox";
import MDTypography from "ResuseableComponents/MDTypography";
import MDButton from "ResuseableComponents/MDButton";
import MDBadgeDot from "ResuseableComponents/MDBadgeDot";

export default function Treemaps({ treeData, width, height, title }) {
  const svgRef = useRef(null);
  const fontSize = 1.3;

  function process_data(data) {
    const gdata = {}
    const children = []
  
    for (let i = 0; i < data.labels.length; i++) {
      // if(!data.labels[i].includes("(0%)")){
      children[i] = {'name' : data.labels[i],'value' : data.datasets.data[i], 'color': data.datasets.backgroundColors[i], 'label':  data.datasets.label}
      gdata['children'] = children
    // }
  }
    return gdata
  }

  let data = process_data(treeData)

  function wrapText(selection) {
    selection.each(function () {
      const width1 = d3.select(this.previousElementSibling).datum().x1 - d3.select(this.previousElementSibling).datum().x0
      const height1 = d3.select(this.previousElementSibling).datum().y1 - d3.select(this.previousElementSibling).datum().y0
      // if(height1 > width1/4){
      const node = d3.select(this);
      const rectWidth = +node.attr('data-width');
      let word;
      const words = node.text().split(' ').reverse();
      let line = [];
      const x = node.attr('x');
      const y = node.attr('y');
      let tspan = node.text('').append('tspan').attr('x', x).attr('y', y);
      let lineNumber = 0;
      while (words.length > 1) {
        word = words.pop();
        line.push(word);
        tspan.text(line.join(' '));
        const tspanLength = tspan.node().getComputedTextLength();
        if (tspanLength > rectWidth-4 && line.length !== 1) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = addTspan(word);
        }
      }
      
      addTspan(words.pop());
  
      function addTspan(text) {
        lineNumber += 1;
        return (
          node
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', `${lineNumber * fontSize}em`)
            .text(text)
        );
      }
    //  }
    });
  }

  function getSize(d) {
    var bbox = this.getBBox(),
        cbbox = this.parentNode.getBBox(),
        scale = Math.min(cbbox.width/bbox.width,cbbox.height/bbox.height);
        if(cbbox.width < 100 && cbbox.height < 21){
        d.scale = scale-5;  
      }
      else {
        d.scale = scale; 
      }
  }

  function renderTreechart() {
    const svg = d3.select(svgRef.current);

    // svg.attr('width', width).attr('height', height);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const root = d3
      .hierarchy(data)
      .sum((d) => d.value ? d.value : 0)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .join('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
      .on("mouseover", function(){return d3.select(this).style("opacity", 0.7);})
      .on("mouseout", function(){return d3.select(this).style("opacity", 1);});

    // const fader = (color) => d3.interpolateRgb(color, '#fff')(0.3);
    // const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    nodes
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', (d) => d.data.color ? d.data.color : "#525252");

      nodes.append("title").text((d) => d.data.name ? d.data.name : "Untitled");


      nodes
      .append('text')
      .text((d) => d.value === 0 || d.data.name.includes('(0%)') ? '' : d.data.name ? d.data.name : "Anonymous")
      .attr("x", function() {
        const parentData = d3.select(this.parentNode).datum();
        return (parentData.x1 - parentData.x0) / 2
    })
      .attr("y", function() {
        const parentData = d3.select(this.parentNode).datum();
        return (parentData.y1 - parentData.y0) / 2
    })
      .attr('data-width', (d) => d.x1 - d.x0)
      .attr("text-anchor", "middle")
      // .attr("font-size", `${fontSize}em`)
      .attr("fill", '#FFFFFF')
      .attr("font-size", "1px")
      .each(getSize)
      .attr("font-size", function(d) { return d.scale + 2 + "px"; })
    //   .attr('font-size', `${fontSize}px`)
      .call(wrapText);

  }

  useEffect(() => {
    renderTreechart();
  }, [data]);

  const renderChart = (
    <MDBox py={2} pr={2} pl={2}>
      {title  ? (
        <MDBox display="flex" px={0} pt={0}>
          <MDBox mb={2}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
          </MDBox>
        </MDBox>
      ) : null}
          <MDBox>
          <Grid container alignItems="center">
              <Grid item xs={12} md={12} lg={12}>
              <svg ref={svgRef} />
              </Grid>
          </Grid>
      </MDBox>
    </MDBox>
  );

  return title ? <Card sx={{ height: "100%", width: "100%" }}>{renderChart}</Card> : renderChart;

  
//   return (
//     <>
//     <Card sx={{ height: "100%", width: "100%" }}>
//     <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
//         <MDTypography variant="h6">{title}</MDTypography>
//     </MDBox>
//     <MDBox mt={3}>
//         <Grid container alignItems="center">
//             <Grid item xs={12} md={12} lg={12}>
//             <svg ref={svgRef} />
//             </Grid>
//         </Grid>
//     </MDBox>
// </Card>
//     </>
//   );
}