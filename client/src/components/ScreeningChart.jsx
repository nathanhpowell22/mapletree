import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetPharmacyQuery } from "state/api";


const ScreeningChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetPharmacyQuery(); // Fetch data from the pharmacy API

  // Transform data for the ResponsiveLine chart
  const chartData = useMemo(() => {
    if (!data || !data.monthlyScreenings) return [];

    return [
      {
        id: "Monthly Screenings",
        color: theme.palette.secondary.main,
        data: data.monthlyScreenings.map((item) => ({
          x: item._id, // Month (e.g., "2025-04")
          y: item.count, // Number of screenings in that month
        })),
      },
    ];
  }, [data, theme]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.text.primary,
            },
          },
          legend: {
            text: {
              fill: theme.palette.text.primary,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.text.primary,
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.text.primary,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.text.primary,
          },
        },
        tooltip: {
          container: {
            color: theme.palette.text.primary,
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point", min: "1", }}
      yScale={{
        type: "linear",
        min: "90",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Value",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ datum: "color" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
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
              },
            ]
          : []
      }
    />
  );
};
export default ScreeningChart;