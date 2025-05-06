import React, { useMemo, useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "components/Header";
import { ResponsiveSankey } from "@nivo/sankey";
import TreeChart from "components/TreeChart";
import { BorderBottom } from "@mui/icons-material";

const dummyData = {
  nodes: [
    { id: "Screenings" },
    { id: "Cone PCP" },
    { id: "Cone Virtual PCP" },
    { id: "Cone Urgent Care" },
    { id: "Cone Hospital" },
    { id: "Other PCP" },
    { id: "Other Virtual PCP" },
    { id: "Other Urgent Care" },
    { id: "Other Hospital" },
    { id: "No PCP Visit" },
    { id: "Cardiologist" },
    { id: "Endocrinologist" },
    { id: "Gastroenterologist" },
    { id: "Neurologist" },
    { id: "Oncologist" },
    { id: "Ophthalmologist" },
    { id: "Pediatrician" },
    { id: "Psychiatrist" },
    { id: "Urologist" },
    { id: "Dermatologist" },
    { id: "Allergy Specialist" },
    { id: "Other Specialist" },
  
  ],
  links: [
    { source: "Screenings", target: "Cone PCP", value: 90 },
    { source: "Screenings", target: "Cone Virtual PCP", value: 10 },
    { source: "Screenings", target: "Cone Urgent Care", value: 25 },
    { source: "Screenings", target: "Cone Hospital", value: 14 },
    { source: "Cone PCP", target: "Cardiologist", value: 3 },
    { source: "Cone PCP", target: "Endocrinologist", value: 12 },
    { source: "Cone PCP", target: "Gastroenterologist", value: 4 },
    { source: "Cone PCP", target: "Neurologist", value: 1 },
    { source: "Cone PCP", target: "Oncologist", value: 2 },
    { source: "Cone PCP", target: "Ophthalmologist", value: 1 },
    { source: "Cone PCP", target: "Pediatrician", value: 7 },
    { source: "Cone PCP", target: "Psychiatrist", value: 5 },
    { source: "Cone PCP", target: "Urologist", value: 2 },
    { source: "Cone PCP", target: "Dermatologist", value: 7 },
    { source: "Cone PCP", target: "Allergy Specialist", value: 3 },
    { source: "Cone Virtual PCP", target: "Cardiologist", value: 3 },
    { source: "Cone Virtual PCP", target: "Endocrinologist", value: 12 },
    { source: "Cone Virtual PCP", target: "Gastroenterologist", value: 4 },
    { source: "Cone Virtual PCP", target: "Neurologist", value: 1 },
    { source: "Cone Virtual PCP", target: "Oncologist", value: 2 },
    { source: "Cone Virtual PCP", target: "Ophthalmologist", value: 1 },
    { source: "Cone Urgent Care", target: "Cardiologist", value: 3 },
    { source: "Cone Urgent Care", target: "Endocrinologist", value: 12 },
    { source: "Cone Urgent Care", target: "Gastroenterologist", value: 4 },
    { source: "Cone Urgent Care", target: "Neurologist", value: 1 },
    { source: "Cone Urgent Care", target: "Oncologist", value: 2 },
    { source: "Cone Urgent Care", target: "Ophthalmologist", value: 1 },
    { source: "Cone Hospital", target: "Cardiologist", value: 3 },
    { source: "Cone Hospital", target: "Endocrinologist", value: 12 },
    { source: "Cone Hospital", target: "Gastroenterologist", value: 4 },
    { source: "Cone Hospital", target: "Neurologist", value: 1 },
    { source: "Cone Hospital", target: "Oncologist", value: 2 },
    { source: "Cone Hospital", target: "Ophthalmologist", value: 1 },     
    { source: "Screenings", target: "Other PCP", value: 30 },
    { source: "Screenings", target: "Other Virtual PCP", value: 12 },
    { source: "Screenings", target: "Other Urgent Care", value: 20 },
    { source: "Screenings", target: "Other Hospital", value: 5 },
    { source: "Screenings", target: "No PCP Visit", value: 357},
    { source: "Other PCP", target: "Other Specialist", value: 7 },
    { source: "Other Virtual PCP", target: "Other Specialist", value: 7 },
    { source: "Other Urgent Care", target: "Other Specialist", value: 7 },  
    { source: "Other Hospital", target: "Other Specialist", value: 7 },  
    { source: "No PCP Visit", target: "Other Specialist", value: 22 },
  ],
};

const Journey = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Patient Journeys" />

      <Box height="600px" mt="2rem" mb="2rem" pb="6rem" sx={{ borderBottom: "1px solid", borderColor: theme.palette.text.secondary }}>
        <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Patient Primary Care Insights
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          Does the patient have a primary care physician? If yes, did they visit within the last two years?
        </Typography>
        <TreeChart />
      </Box>

      <Box height="1000px" mt="6rem" mb="2rem" sx={{ borderBottom: "1px solid", borderColor: theme.palette.text.secondary }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Patient Journey following SiteLabs Screenings
        </Typography>

        <ResponsiveSankey
          data={dummyData}
          sort="input"
          margin={{ top: 40, right: 225, bottom: 40, left: 225 }}
          align="justify"
          colors={{ scheme: "set2" }}
          nodeOpacity={1}
          nodeThickness={30}
          nodeInnerPadding={3}
          nodeSpacing={24}
          nodeBorderWidth={1}
          nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
          linkColor={{ from: "color", modifiers: [["brighter", 0.8]] }} // Lighten the link color
          linkOpacity={0.3} // Adjust link opacity for better visibility
          linkHoverOthersOpacity={0.2}
          linkContrastColor={{ from: "color", modifiers: [["brighter", 0.8]] }}
          linkBlendMode="normal"
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="horizontal"
          labelPadding={16}
          labelTextColor="white"
          orientLabel={false}
          nodeTooltip={({ node }) => (
            <div
              style={{
                background: "white",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                color: "black",
              }}
            >
              <strong>{node.id}</strong>: {node.value}
            </div>
          )}
          linkTooltip={({ link }) => (
            <div
              style={{
                background: "white",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                color: "black", // Set the text color to match the source node's color
              }}
            >
              <strong>
                {link.source.id} → {link.target.id}
              </strong>
              : {link.value}
            </div>
          )}
          theme={{
            labels: {
              text: {
                fontSize: 18, // Increase the font size of the labels
                fill: "white", // Ensure the text color is white
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Journey;