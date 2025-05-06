import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "components/Header";
import ContractChart from "components/ContractChart";
import { DataGrid } from "@mui/x-data-grid";
import { ResponsivePie } from "@nivo/pie";
import InsurancePlanBarChart from "components/InsurancePlanBarChart";
import InsurancePlanPieChart from "components/InsurancePlanPieChart";

const tableRows = [
  { id: 1, payer: "No Risk Contract", uniquePatients: 622, proportion: "60%" },
  { id: 2, payer: "BCBS Comm", uniquePatients: 101, proportion: "10%" },
  { id: 3, payer: "Aetna Comm", uniquePatients: 59, proportion: "6%" },
  { id: 4, payer: "United MA", uniquePatients: 48, proportion: "5%" },
  { id: 5, payer: "Humana MA HMO", uniquePatients: 35, proportion: "3%" },
  { id: 6, payer: "Bright Health MA", uniquePatients: 30, proportion: "3%" },
  { id: 7, payer: "Aetna MA", uniquePatients: 24, proportion: "2%" },
  { id: 8, payer: "BCBS Medicaid", uniquePatients: 21, proportion: "2%" },
  { id: 9, payer: "HTA Combined MA", uniquePatients: 20, proportion: "2%" },
  { id: 10, payer: "UHC Medicaid", uniquePatients: 19, proportion: "2%" },
  { id: 11, payer: "Humana MA PPO", uniquePatients: 17, proportion: "12%" },
  { id: 12, payer: "ACO REACH", uniquePatients: 15, proportion: "1%" },
  { id: 13, payer: "Devoted Health MA", uniquePatients: 9, proportion: "1%" },
  { id: 14, payer: "Wellcare Medicaid", uniquePatients: 9, proportion: "1%" },
  { id: 15, payer: "CMS DCE", uniquePatients: 6, proportion: "1%" },
  { id: 16, payer: "BCBS MA", uniquePatients: 5, proportion: "1%" },
  { id: 17, payer: "Cigna MA", uniquePatients: 2, proportion: "0%" },
];

const tableColumns = [
  { field: "payer", headerName: "Payer", flex: 1 },
  { field: "uniquePatients", headerName: "Unique Patients", flex: 1 },
  { field: "proportion", headerName: "Proportion", flex: 1 },
];

const pieData = tableRows
  .filter((row) => row.payer !== "No Risk Contract") // Exclude 'No Risk Contract'
  .map((row) => ({
    id: row.payer,
    label: row.payer,
    value: row.uniquePatients,
  }));

const Contracts = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Risk Contracts" />

      <Box height="600px" mt="2rem" mb="2rem" pb="6rem" sx={{ borderBottom: "1px solid", borderColor: theme.palette.text.secondary }}>
        <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Patient Coverage Insights
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          Does the patient have insurance coverage? If so, did they visit their PCP?
        </Typography>
        <ContractChart />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap="2rem"
        mt="4rem"
        mb="2rem"
      >
        <Box
          height="500px"
          width="50%"
        >
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
            Patient Count and Proportion by Payer
          </Typography>
          <DataGrid
            rows={tableRows}
            columns={tableColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
                fontSize: "1.125rem", // Increase font size by 2px (default is 1rem)
                fontWeight: "bold", // Make column headers bold
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
            }}
          />
        </Box>

        <Box height="500px" width="50%">
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary }}>
            Patient Distribution by Payer
          </Typography>
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor={theme.palette.text.primary}
            radialLabelsLinkColor={theme.palette.text.primary}
            sliceLabelsSkipAngle={10}
            arcLinkLabelsTextColor="white" // Make chart labels white
            arcLabelsTextColor={theme.palette.text.primary}
            legends={[]} // Remove the legend
            theme={{
              tooltip: {
                container: {
                  color: theme.palette.primary.main, // Match PortionChart tooltip text color
                },
              },
            }}
          />
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="2rem"
        mt="2rem"
      >
        <Box
          gridColumn="span 6"
          gridRow="4 / span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
            Uninsured to Insured
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          Patients initially without insurance coverage that later obtained coverage.
        </Typography>
          <InsurancePlanBarChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            This chart provides a breakdown of insurance plans by total counts. It helps in understanding the distribution of insurance plans among patients.
          </Typography>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="4 / span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
            Uninsured to Insured: Proportional
          </Typography>
          <InsurancePlanPieChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Contracts;