import React, { useState, useEffect } from "react";
import {
  Box, TextField, Button, Typography, Paper, Grid, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminInfluencerManager = () => {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [reputationScore, setReputationScore] = useState(100);
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    const res = await fetch("http://localhost:8000/influencers");
    const data = await res.json();
    setInfluencers(data);
  };

  const addInfluencer = async () => {
    await fetch("http://localhost:8000/admin/add-influencer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, platform, reputation_score: Number(reputationScore) })
    });
    fetchInfluencers();
    setName("");
    setPlatform("");
    setReputationScore(100);
  };

  const deleteInfluencer = async (name) => {
    await fetch(`http://localhost:8000/admin/delete-influencer/${name}`, {
      method: "DELETE"
    });
    fetchInfluencers();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ color: "#00ffff" }}>
        🛠️ Admin Panel - Manage Influencers
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
        <TextField label="Score" type="number" value={reputationScore} onChange={(e) => setReputationScore(e.target.value)} />
        <Button onClick={addInfluencer} variant="contained" color="success">Add / Update</Button>
      </Box>

      <Grid container spacing={2}>
        {influencers.map((inf, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Paper sx={{ p: 2, backgroundColor: "#1e1e2f", color: "#fff" }}>
              <Typography variant="h6">{inf.name}</Typography>
              <Typography>📱 Platform: {inf.platform}</Typography>
              <Typography>⭐ Score: {inf.reputation_score}</Typography>
              <Typography>🚨 Reports: {inf.report_count}</Typography>
              <IconButton onClick={() => deleteInfluencer(inf.name)} sx={{ color: "red" }}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminInfluencerManager;
