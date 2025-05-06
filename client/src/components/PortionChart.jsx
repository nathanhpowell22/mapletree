import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const dummyData = [
	{
		condition: "High BP",
		count: 301,
	},
	{
		condition: "High Chol",
		count: 181,
	},
	{
		condition: "Has DM",
		count: 133,
	},
	{
		condition: "Has CKD",
		count: 19,
	},
	{
		condition: "Has COPD",
		count: 22,
	},
];

const BreakdownChart = ({ isDashboard = false }) => {
	const { data, isLoading } = useGetSalesQuery();
	const theme = useTheme();

	if (!data || isLoading) return "Loading...";

	const colors = [
		theme.palette.secondary[500],
		theme.palette.secondary[300],
		theme.palette.secondary[300],
		theme.palette.secondary[500],
	];
	const formattedData = dummyData.map((item) => ({
		id: item.condition,
		label: item.condition,
		value: item.count,
		color: theme.palette.secondary[500],
	}));

	const totalValue = formattedData.reduce((acc, item) => acc + item.value, 0); // Calculate the total value of the data

	return (
		<Box
			height={isDashboard ? "400px" : "100%"}
			width={undefined}
			minHeight={isDashboard ? "325px" : undefined}
			minWidth={isDashboard ? "325px" : undefined}
			position="relative"
		>
			<ResponsivePie
				data={formattedData}
				theme={{
					axis: {
						domain: {
							line: {
								stroke: theme.palette.secondary[200],
							},
						},
						legend: {
							text: {
								fill: theme.palette.secondary[200],
							},
						},
						ticks: {
							line: {
								stroke: theme.palette.secondary[200],
								strokeWidth: 1,
							},
							text: {
								fill: theme.palette.secondary[200],
							},
						},
					},
					legends: {
						text: {
							fill: theme.palette.secondary[100], // Match legend text color to title color
						},
					},
					tooltip: {
						container: {
							color: theme.palette.primary.main,
						},
					},
				}}
        colors={{ scheme: "nivo" }}
				margin={
					isDashboard
						? { top: 40, right: 50, bottom: 10, left: 50 }
						: { top: 40, right: 50, bottom: 10, left: 50 }
				}
				sortByValue={true}
				innerRadius={0.45}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				borderColor={{
					from: "color",
					modifiers: [["darker", 0.2]],
				}}
				enableArcLinkLabels={true} // Enable arc link labels
				arcLinkLabelsTextColor={theme.palette.secondary[200]} // Set arc link label text color
				arcLinkLabelsThickness={2} // Set arc link label thickness
				arcLinkLabelsColor={{ from: "color" }} // Match arc link label color to the slice
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
					from: "color",
					modifiers: [["darker", 2]],
				}}
				arcLabelsTextSize={20} // Increase arc label text size to 16px
				arcLabels={(datum) => `${((datum.value / totalValue) * 100).toFixed(2)}%`} // Display percentage of each slice using the total value
				tooltip={({ datum }) => (
          <div
            style={{
              background: theme.palette.background.alt,
              padding: "5px",
              borderRadius: "5px",
              color: theme.palette.secondary[100],
            }}
          >
            <strong>{datum.id}</strong>: {datum.value} ({((datum.value / totalValue) * 100).toFixed(2)}%)
          </div>
        )}
			/>
			<Box
				position="absolute"
				top="50%"
				left="50%"
				color={theme.palette.secondary[400]}
				textAlign="center"
				pointerEvents="none"
				sx={{
					transform: isDashboard
						? "translate(-75%, -170%)"
						: "translate(-50%, -100%)",
				}}
			>
			</Box>
		</Box>
	);
};

export default BreakdownChart;
