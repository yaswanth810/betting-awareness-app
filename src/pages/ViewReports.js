import { Box, Typography, Card, CardContent } from "@mui/material";

const reports = [
  { name: "Scam Betting App", description: "This app stole my money!", date: "March 2025" },
  { name: "Fake Influencer", description: "Misleading investment scheme.", date: "April 2025" },
];

function ViewReports() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 8,
    }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Reported Scams</Typography>
      {reports.map((report, index) => (
        <Card key={index} sx={{ width: "60%", mb: 2, backgroundColor: "#1e1e1e" }}>
          <CardContent>
            <Typography variant="h6">{report.name}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>{report.date}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>{report.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ViewReports;
