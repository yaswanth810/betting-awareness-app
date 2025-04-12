import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Slide,
} from "@mui/material";
import axios from "axios";

const ReportInfluencer = () => {
  const [formData, setFormData] = useState({
    influencer_name: "",
    platform: "",
    social_media_links: "",
    scam_details: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      formData.influencer_name.trim() &&
      formData.platform.trim() &&
      formData.social_media_links.trim() &&
      formData.scam_details.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Convert social_media_links to an array of strings
      const payload = {
        ...formData,
        social_media_links: formData.social_media_links.split(",").map((link) => link.trim()),
      };

      const response = await axios.post("http://localhost:8000/report-influencer", payload);
      setMessage(response.data.message || "Report submitted successfully.");
      setFormData({ influencer_name: "", platform: "", social_media_links: "", scam_details: "" });
    } catch (err) {
      // Extract error message from the backend response
      const backendError = err.response?.data?.detail;
      if (Array.isArray(backendError)) {
        // If the backend returns an array of errors, join them into a single string
        setError(backendError.map((e) => e.msg).join(", "));
      } else {
        // Otherwise, use a generic error message
        setError(backendError || "Failed to submit report. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={4}
        p={4}
        sx={{
          backgroundColor: "#121212",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,255,255,0.2)",
          border: "1px solid rgba(0,255,255,0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#00ffe0" }}>
          🚨 Report an Influencer
        </Typography>

        <Slide direction="up" in={!!message || !!error} mountOnEnter unmountOnExit>
          <Box mb={2}>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Slide>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Influencer Name"
            name="influencer_name"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={formData.influencer_name}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: { color: "#fff", borderColor: "#00ffe0" },
            }}
          />
          <TextField
            label="Platform (e.g., YouTube, Twitter)"
            name="platform"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={formData.platform}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: { color: "#fff", borderColor: "#00ffe0" },
            }}
          />
          <TextField
            label="Social Media Links (comma-separated)"
            name="social_media_links"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={formData.social_media_links}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: { color: "#fff", borderColor: "#00ffe0" },
            }}
          />
          <TextField
            label="Reason for Reporting"
            name="scam_details"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
            required
            value={formData.scam_details}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: { color: "#fff", borderColor: "#00ffe0" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "#00ffe0",
              color: "#000",
              "&:hover": {
                backgroundColor: "#00e6cc",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Report"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ReportInfluencer;