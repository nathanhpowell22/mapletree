import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import MonthlyScreenings from "components/MonthlyScreenings";
import OverviewChart from "components/OverviewChart";
import ScreeningChart from "components/ScreeningChart";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox";
import { useGetPharmacyQuery } from "state/api";
import { ResponsiveLine } from "@nivo/line";
import testData from "assets/testData.json";

const Screenings = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetPharmacyQuery();
  const [chartData, setChartData] = useState(testData);

  const columns = [
    {
      field: "pharmacy",
      headerName: "Screening Location",
      flex: 1,
    },
    {
      field: "date_screened",
      headerName: "Date Screened",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "yob",
      headerName: "Year of Birth",
      flex: 1,
    },
    {
      field: "sex",
      headerName: "Sex",
      flex: 1,
    },
    {
      field: "race",
      headerName: "Race",
      flex: 1,
    },
    {
      field: "ethnicity",
      headerName: "Ethnicity",
      flex: 1,
    },  
  ];

  const yearToDatePatients = data
  ? data.pharmacies.filter((item) => {
      const date = new Date(item.date_screened);
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      return date >= startOfYear;
    })
  : [];

  const last30DaysPatients = data
  ? data.pharmacies.filter((item) => {
      const date = new Date(item.date_screened);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return date >= thirtyDaysAgo;
    })
  : [];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="PHARMACY" subtitle="Welcome to the pharmacy dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Patients Screened"
          value={data && data.totalPatientIds}
          increase="+10%"
          description="All Time"
        />
        <StatBox
          title="2025 Screenings"
          value={yearToDatePatients.length}
          increase="+15%"
          description="Year-to-Date"
        />
        <StatBox
          title="Last Month Screenings"
          value={last30DaysPatients.length}
          increase="+5%"
          description="Since last year"
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Cumulative Screening Trends
          </Typography>
          <OverviewChart view="pharmacy" isDashboard={true} />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Monthly Screening Trends
          </Typography>
          <MonthlyScreenings isDashboard={true} />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Screening by Type
          </Typography>
          <Box height="100%">
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 115, bottom: 60, left: 60 }}
              xScale={{ type: "point", }}
              yScale={{ type: "linear", min: "115", max: "150", stacked: false, reverse: false }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time",
                legendOffset: 36,
                legendPosition: "middle",
                legendTextStyle: { fill: theme.palette.secondary[100] },
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Screenings",
                legendOffset: -40,
                legendPosition: "middle",
                legendTextStyle: { fill: theme.palette.secondary[100] },
              }}
              colors={{ scheme: "nivo" }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              lineWidth="3"
              useMesh={true}
              enableSlices="x"
              lineStyle={(serie) => {
                const isActive = !chartData.find((data) => data.id === serie.id)?.hidden;
                return {
                  opacity: isActive ? 1 : 0.3,
                };
              }}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: "#ffffff",
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "#ffffff",
                      strokeWidth: 1,
                    },
                    text: {
                      fill: "#ffffff",
                    },
                  },
                  legend: {
                    text: {
                      fill: "#ffffff",
                    },
                  },
                },
                legends: {
                  text: {
                    fill: "#ffffff",
                  },
                },
                tooltip: {
                  container: {
                    color: "black",
                  },
                },
              }}
              legends={[
                {
                  anchor: "top",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: -40,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                  onClick: (data) => {
                    const selectedSerieId = data.id;
                    setChartData((prevData) => {
                      return prevData.map((serie) => {
                        if (serie.id === selectedSerieId) {
                          return { ...serie, isActive: true };
                        }
                        return { ...serie, isActive: false };
                      });
                    });
                  },
                },
              ]}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 8"
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
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.pharmacies) || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Screenings;