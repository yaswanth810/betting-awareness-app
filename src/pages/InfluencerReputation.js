import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import ErrorIcon from "@mui/icons-material/Error";
import GroupIcon from "@mui/icons-material/Group";
import ReportIcon from "@mui/icons-material/Report";

const getRiskLevel = (count) => {
  if (count >= 8) return { label: "High Risk", color: "error" };
  if (count >= 4) return { label: "Caution", color: "warning" };
  return { label: "Safe", color: "success" };
};

const InfluencerReputation = () => {
  const [loading, setLoading] = useState(true);
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    fetchInfluencerReports();
  }, []);

  const fetchInfluencerReports = async () => {
    try {
      const response = await fetch("http://localhost:8000/influencer-reports");
      const data = await response.json();

      const grouped = {};
      data.forEach((report) => {
        const name = report.name;
        if (!grouped[name]) {
          grouped[name] = [];
        }
        grouped[name].push(report);
      });

      const reputationList = Object.keys(grouped).map((name) => {
        const reports = grouped[name];
        const total = reports.length;
        const risk = getRiskLevel(total);
        return {
          name,
          totalReports: total,
          platform: reports[0]?.platform || "Unknown",
          riskLevel: risk.label,
          riskColor: risk.color,
          reports,
        };
      });

      setInfluencers(reputationList);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch influencer reports:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress size={40} thickness={4} />
        <Typography mt={2} fontWeight="bold">
          Loading influencer reputations...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 3,
          textShadow: "0 0 10px #00ffff",
          color: "#00ffff",
        }}
      >
        👁️‍🗨️ Influencer Reputation Scoreboard
      </Typography>

      <Grid container spacing={4}>
        {influencers.map((influencer, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                background: "linear-gradient(145deg, #1c1c3c, #2c2c54)",
                color: "#fff",
                borderLeft: `5px solid ${
                  influencer.riskColor === "error"
                    ? "#ff1744"
                    : influencer.riskColor === "warning"
                    ? "#ffc107"
                    : "#00e676"
                }`,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 0 15px #00ffff",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {influencer.name}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                🧩 Platform: <strong>{influencer.platform}</strong>
              </Typography>
              <Typography variant="body1">
                🚨 Total Reports:{" "}
                <strong style={{ color: "#ff4444" }}>{influencer.totalReports}</strong>
              </Typography>

              <Box mt={1.5}>
                <Chip
                  label={influencer.riskLevel}
                  color={influencer.riskColor}
                  icon={
                    influencer.riskColor === "error" ? (
                      <ErrorIcon />
                    ) : influencer.riskColor === "warning" ? (
                      <GroupIcon />
                    ) : (
                      <StarIcon />
                    )
                  }
                  sx={{
                    fontWeight: "bold",
                    backgroundColor:
                      influencer.riskColor === "error"
                        ? "#ff0033"
                        : influencer.riskColor === "warning"
                        ? "#ffbb33"
                        : "#00c851",
                    color: "#000",
                  }}
                />
              </Box>

              <Accordion
                sx={{
                  mt: 2,
                  backgroundColor: "#1e1e2f",
                  color: "#ffffff",
                  border: "1px solid #333",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#00ffff" }} />}>
                  <Typography fontWeight="bold">📝 View Report Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {influencer.reports.map((r, i) => (
                    <Box
                      key={i}
                      sx={{
                        mb: 1.5,
                        p: 1,
                        borderBottom: "1px dashed #444",
                        backgroundColor: "#121223",
                        borderRadius: 1,
                      }}
                    >
                      <Tooltip title={r.description || "No description provided"}>
                        <Typography variant="body2" sx={{ fontStyle: "italic", color: "#bbb" }}>
                          • {new Date(r.timestamp).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </Typography>
                      </Tooltip>
                    </Box>
                  ))}
                  {influencer.reports.length === 0 && (
                    <Typography variant="body2" color="gray">
                      No reports yet for this influencer.
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfluencerReputation;
