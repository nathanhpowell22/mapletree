import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import PortionChart from "components/PortionChart";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox";

const Results = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Screening Results" subtitle="Welcome to the screening dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Has PCP"
          value={"522"}
          increase="65.3%"
          description="All Patients"
        />
        <StatBox
          title="Smokes"
          value={"196"}
          increase="24.5%"
          description="All Patients"
        />
        <StatBox
          title="Numbness / Tingling"
          value={"123"}
          increase="15.4%"
          description="All Patients"
        />
        <StatBox
          title="Has Insurance"
          value={"792"}
          increase="72%"
          description="All Patients"
        />

        {/* Force a new row */}
        <Box gridColumn="span 12" />

        {/* ROW 2 */}
        <StatBox
          title="Medicare"
          value={"120"}
          increase="13.0%"
          description="All Patients"
        />
        <StatBox
          title="Medicaid"
          value={"132"}
          increase="111.5%"
          description="All Patients"
        />
        <StatBox
          title="Commercial"
          value={"556"}
          increase="51.3%"
          description="All Patients"
        />
        <StatBox
          title="Other Insurance"
          value={"80"}
          increase="4.4%"
          description="All Patients"
        />
    
        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="4 / span 3" // Start a new row for BreakdownChart
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Abnormal Results Breakdown: Totals
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Abnormal results are defined as any test result that is outside the normal range. This can include high or low values for various blood tests, imaging studies, and other diagnostic tests. Abnormal results may indicate a potential health issue that requires further investigation or treatment.
          </Typography>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="4 / span 3" // Start a new row for PortionChart
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Abnormal Results Breakdown: Proportions
          </Typography>
          <PortionChart isDashboard={true} />
        </Box>

      </Box>
    </Box>
  );
};

export default Results;