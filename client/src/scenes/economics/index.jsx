import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import Header from "components/Header";

const Economics = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the third-party API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/general/fred/series/observations?series_id=GNPCA&api_key=8e7f126134cae9785b5b40af8aabc2fb&file_type=json&units=pc1&observation_start=1980-01-01"); // Replace with your API URL
        const jsonData = await response.json();
        console.log("API Response:", jsonData); // Log the raw API response
        // Transform the data to match the format required by the chart
        const transformedData = [
          {
            id: jsonData.series_id || "Default Dataset", // Provide a default value if series_id is undefined
            data: jsonData.observations.map((item) => ({
              x: item.date, // Map the date field to the x-axis
              y: parseFloat(item.value), // Map the value field to the y-axis and parse it as a float
            })),
          },
        ];
        console.log("Transformed Data:", transformedData); // Log the transformed data
        console.log("Transformed Data (y-axis check):", transformedData); // Log transformed data to verify y-axis values
        setData(transformedData);
        setIsLoading(false);
        console.log("Chart Data:", transformedData); // Log the data passed to the chart
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LINE CHART" subtitle="Visualize data from a third-party API" />
      <Box mt="40px" height="75vh">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveLine
            data={data}
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
            xScale={{ 
              type: "time",
              format: "%Y-%m-%d",
              precision: "year",}}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              format: "%Y",
              tickValues: "every 5 years",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Year",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Value",
              legendOffset: -40,
              legendPosition: "middle",
              format: (value) => `${value}%`,
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
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
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default Economics;