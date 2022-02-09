import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./dashboardContent/Chart";
import BoxOne from "./dashboardContent/BoxOne";

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            height: 180,
            backgroundColor: "yellow"
          }}
        >
          <BoxOne />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            borderRadius: "20px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 180,
            backgroundColor: "yellow"
          }}
        >
          <BoxOne />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            height: 180,
            backgroundColor: "yellow"
          }}
        >
          <BoxOne />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            height: 180,
            backgroundColor: "yellow"
          }}
        >
          <BoxOne />
        </Paper>
      </Grid>

      {/* Chart */}
      <Grid item xs={12} md={8} lg={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            height: 245,
            backgroundColor: "yellow"
          }}
        >
          <Chart />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            height: 245,
            backgroundColor: "yellow"
          }}
        >
          <BoxOne />
        </Paper>
      </Grid>
    </Grid>
  );
}
