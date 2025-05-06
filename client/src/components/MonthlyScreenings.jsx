import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetPharmacyQuery } from "state/api";


const MonthlyScreenings = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetPharmacyQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";
  if (!data.monthlyScreenings) return <div>No data available</div>; // Handle undefined or missing data gracefully

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const chartData = data.monthlyScreenings.map((item) => ({
    x: item._id, // Month (e.g., "2025-04")
    y: item.count, // Number of screenings in that month
  }));

  return (
    <Box
      height={isDashboard ? "100%" : "100%"}
      width="100%"
      minHeight={isDashboard ? "350px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsiveBar
        data={chartData}
        keys={["y"]}
        indexBy="x"
        margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Screenings",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[100],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[100],
              },
              text: {
                fill: theme.palette.secondary[100],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[100],
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default MonthlyScreenings;
