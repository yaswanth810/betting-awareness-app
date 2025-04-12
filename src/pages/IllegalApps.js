// No change in imports
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReportIcon from "@mui/icons-material/Report";
import "./IllegalApps.css";

const API_URL = "http://localhost:8000";

const IllegalApps = () => {
  const [apps, setApps] = useState([]);
  const [appName, setAppName] = useState("");
  const [description, setDescription] = useState("");

  const fetchIllegalApps = async () => {
    try {
      const response = await fetch(`${API_URL}/illegal-apps`);
      const data = await response.json();
      setApps(data);
    } catch (error) {
      console.error("Error fetching illegal apps:", error);
    }
  };

  useEffect(() => {
    fetchIllegalApps();
  }, []);

  const handleAddApp = async () => {
    if (!appName || !description) {
      alert("Please enter both app name and description.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/illegal-apps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app_name: appName, description }),
      });

      if (response.ok) {
        alert("App added successfully!");
        setAppName("");
        setDescription("");
        fetchIllegalApps();
      } else {
        alert("Failed to add app.");
      }
    } catch (error) {
      console.error("Error adding app:", error);
    }
  };

  const handleLike = async (appId) => {
    try {
      const response = await fetch(`${API_URL}/illegal-apps/${appId}/like`, {
        method: "PUT",
      });
      if (response.ok) fetchIllegalApps();
    } catch (error) {
      console.error("Error liking app:", error);
    }
  };

  const handleReport = async (appId) => {
    try {
      const response = await fetch(`${API_URL}/illegal-apps/${appId}/report`, {
        method: "PUT",
      });
      if (response.ok) fetchIllegalApps();
    } catch (error) {
      console.error("Error reporting app:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        className="cyberpunk-heading"
        sx={{ textAlign: "center" }}
      >
        ⚠️ Illegal Betting Apps
      </Typography>

      {/* Form Section */}
      <Box
        sx={{
          background: "#111",
          border: "1px solid #00f0ff44",
          borderRadius: "12px",
          p: { xs: 2, sm: 3 },
          mb: 4,
          boxShadow: "0 0 15px #00f0ff55",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#00f0ff", mb: 2 }}
        >
          🚫 Add a New App
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="App Name"
              variant="outlined"
              fullWidth
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#888" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#888" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                background: "#00f0ff",
                color: "#000",
                fontWeight: "bold",
                ":hover": {
                  background: "#00bcd4",
                },
              }}
              onClick={handleAddApp}
            >
              ➕ Add App
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Apps List */}
      <Grid container spacing={3}>
        {apps.length > 0 ? (
          apps.map((app) => (
            <Grid item xs={12} sm={6} md={4} key={app._id}>
              <Card
                className="cyberpunk-card"
                sx={{
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #00f0ff33",
                  borderRadius: "12px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 0 20px #00f0ff88",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#00f0ff", mb: 1 }}
                  >
                    {app.app_name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {app.description}
                  </Typography>
                  <Typography variant="body2">
                    📢 Reports: {app.total_reports} | ❤️ Likes: {app.likes}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <IconButton
                      onClick={() => handleLike(app._id)}
                      color="primary"
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleReport(app._id)}
                      color="error"
                    >
                      <ReportIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography sx={{ color: "#888" }}>
              No illegal betting apps found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default IllegalApps;
