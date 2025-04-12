import React, { useState, useEffect } from "react";
import { getAllReports } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
//import "./ReportsList.css"; // Optional: Add styles here for neon glow, cyberpunk theme

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllReports();
        setReports(response);
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };
    fetchReports();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom className="cyberpunk-heading">
        🕵️‍♂️ All Scam Reports
      </Typography>

      <Grid container spacing={3}>
        {reports.map((report, index) => {
          const isExpanded = expandedIndex === index;
          const shortDescription = report.description.slice(0, 200);

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="cyberpunk-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom className="cyberpunk-text">
                    {report.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{ color: "#ccc", marginBottom: "10px" }}
                  >
                    {isExpanded ? report.description : `${shortDescription}...`}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => toggleExpand(index)}
                    sx={{ marginBottom: "8px" }}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </Button>

                  <Typography variant="caption" style={{ color: "#888" }}>
                    Reported by: {report.reporter}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ReportsList;
