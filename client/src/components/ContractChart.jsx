import React from "react";
import { ResponsiveTree } from "@nivo/tree";
import { useTheme } from "@mui/material";

const dummyData = {
        "name": "SiteLabs Tests",
        "description": "1,042 tests",
        "color": "hsl(127, 70%, 50%)",
        "children": [
          {
            "name": "Has Risk Contract: Yes",
            "description": "420 (40%)",
            "color": "hsl(321, 70%, 50%)",
            "children": [
              {
                "name": "Has PCP: Yes",
                "description": "353 (84%)",
                "color": "hsl(130, 70%, 50%)",
              },
              {
                "name": "Has PCP: No",
                "description": "65 (12%)",
                "color": "hsl(221, 70%, 50%)",
              },
              {
                "name": "Has PCP: NA",
                "description": "2 (0%)",
                "color": "hsl(221, 70%, 50%)",
              },
            ]
          },
          {
            "name": "Has Risk Contract: No",
            "description": "622 (60%)",
            "color": "hsl(165, 70%, 50%)",
            "children": [
              {
                "name": "Has PCP: Yes",
                "description": "459 (74%)",
                "color": "hsl(130, 70%, 50%)",
              },
              {
                "name": "Has PCP: No",
                "description": "159 (26%)",
                "color": "hsl(221, 70%, 50%)",
              },
              {
                "name": "Has PCP: NA",
                "description": "4 (0%)",
                "color": "hsl(221, 70%, 50%)",
              },
            ]
          },
        ]
    }; // Updated to match the expected structure for @nivo/tree

const CustomNode = ({ node }) => (
  <g transform={`translate(${node.x},${node.y})`}>
    <circle
      r={10}
      fill={node.color} // Match the node color scheme from TreeChart
      stroke="black"
      strokeWidth={1}
    />
    {/* First line: sub-label or extra info */}
    <text
      x={-15} // Position text to the left of the node
      y={5}
      textAnchor="end"
      alignmentBaseline="middle"
      style={{ fontSize: 20, fill: "white" }} // Match text color to node color
    >
      {node.data.name}
    </text>
    {/* Second line: sub-label or extra info */}
    <text
      x={-15} // Position text to the left of the node
      y={35}
      textAnchor="end"
      alignmentBaseline="middle"
      style={{ fontSize: 20, fill: "white" }} // Match text color to node color
    >
      {node.data.description}
    </text>
  </g>
);

const ContractChart = () => {
    const theme = useTheme();
    
    return (
        <ResponsiveTree
            data={dummyData}
            identity="name"
            mode="tree"
            label={() => ""}
            activeNodeSize={24}
            inactiveNodeSize={12}
            nodeColor={{ scheme: 'tableau10' }}
            fixNodeColorAtDepth={1}
            linkThickness={2}
            activeLinkThickness={8}
            inactiveLinkThickness={2}
            orientLabel={false}
            linkColor={{
                from: 'source.color',
                modifiers: [
                    [
                        'opacity',
                        0.4
                    ]
                ]
            }}
            margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
            motionConfig="stiff"
            meshDetectionRadius={80}
            theme={{
                textColor: theme.palette.text.primary, // Use primary text color from theme.js
                fontSize: 14, // Optional: Set font size
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.divider, // Use divider color for axis lines
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.divider, // Use divider color for tick lines
                    },
                    text: {
                      fill: theme.palette.text.secondary, // Use secondary text color for tick text
                    },
                  },
                },
                labels: {
                  text: {
                    fill: theme.palette.text.primary, // Use primary text color for labels
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.text.secondary, // Use secondary text color for legends
                  },
                },
              }}
            nodeComponent={CustomNode} // Use CustomNode for custom rendering
        />
    )
}
export default ContractChart;