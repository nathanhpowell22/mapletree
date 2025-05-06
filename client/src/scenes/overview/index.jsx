import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select, useTheme, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import BreakdownChart from "components/BreakdownChart";
import { DataGrid } from "@mui/x-data-grid";

const Overview = () => {
  const [view, setView] = useState("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Revenue"
          value="$50,000"
          increase="5%"
          description="Since last month"
          icon={<></>} // Add an icon if needed
        />
        <StatBox
          title="Total Units Sold"
          value="1,200"
          increase="10%"
          description="Since last month"
          icon={<></>} // Add an icon if needed
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor="#f4f6f8"
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor="#f4f6f8"
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <BreakdownChart isDashboard={true} />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f4f6f8",
              color: "#333",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#f4f6f8",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f4f6f8",
              color: "#333",
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#666 !important",
            },
          }}
        >
          <DataGrid
            rows={[
              { id: 1, col1: "Dummy Row 1", col2: "Value 1" },
              { id: 2, col1: "Dummy Row 2", col2: "Value 2" },
            ]}
            columns={[
              { field: "col1", headerName: "Column 1", flex: 1 },
              { field: "col2", headerName: "Column 2", flex: 1 },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
