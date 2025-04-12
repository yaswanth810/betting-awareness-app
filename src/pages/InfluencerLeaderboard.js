import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Grid, Chip } from "@mui/material";

const getBadgeColor = (score) => {
  if (score >= 80) return "success";
  if (score >= 50) return "warning";
  return "error";
};

const InfluencerLeaderboard = () => {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/influencers")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.reputation_score - a.reputation_score);
        setInfluencers(sorted);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, color: "#00ffff", textShadow: "0 0 10px #00ffff" }}>
        🏆 Influencer Leaderboard
      </Typography>

      <Grid container spacing={3}>
        {influencers.map((inf, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Paper sx={{ p: 2, background: "#1c1c3c", color: "#fff" }}>
              <Typography variant="h6">{inf.name}</Typography>
              <Typography>📱 {inf.platform}</Typography>
              <Typography>🚨 Reports: {inf.report_count}</Typography>
              <Typography>⭐ Score: {inf.reputation_score}</Typography>
              <Chip
                label={inf.reputation_score >= 80 ? "Safe" : inf.reputation_score >= 50 ? "Caution" : "High Risk"}
                color={getBadgeColor(inf.reputation_score)}
                sx={{ mt: 1 }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfluencerLeaderboard;
