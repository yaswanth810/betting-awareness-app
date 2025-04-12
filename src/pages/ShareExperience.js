import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Input,
} from "@mui/material";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";

const SharedExperiences = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a video file!");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await axios.post("http://localhost:8000/experiences/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Video uploaded successfully!");
      setSelectedFile(null);
      window.location.reload(); // refresh to show new videos
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert("Failed to upload experience.");
    }
    setUploading(false);
  };

  const clearExperiences = async () => {
    try {
      await axios.delete("http://localhost:8000/experiences/clear");
      alert("All experiences cleared successfully!");
      window.location.reload(); // reload to clear UI
    } catch (error) {
      console.error("Error clearing experiences:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ mb: 4 }}>
        📤 Share & Explore 
      </Typography>

      {/* 🚀 Upload Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          border: "2px dashed #00f0ff",
          padding: 4,
          borderRadius: 4,
          textAlign: "center",
          color: "#fff",
          mb: 5,
          boxShadow: "0 0 20px #00f0ff80",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Click to Upload  🌐
        </Typography>

        <label htmlFor="upload-file" style={{ cursor: "pointer" }}>
          <Input
            id="upload-file"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            sx={{ display: "none" }}
          />
          <Box
            sx={{
              background: "#111",
              borderRadius: "8px",
              padding: "10px 20px",
              border: "1px solid #00f0ff",
              color: "#00f0ff",
              mb: 2,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#222",
              },
            }}
          >
            {selectedFile ? selectedFile.name : "Choose a video file"}
          </Box>
        </label>

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={uploading}
          sx={{
            background: "#00f0ff",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            '&:hover': {
              backgroundColor: "#00c4e4",
              boxShadow: "0 0 10px #00f0ff",
            },
          }}
        >
          {uploading ? <CircularProgress size={24} /> : "🚀 Upload Video"}
        </Button>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={clearExperiences}
        sx={{ display: "block", mx: "auto", mb: 3 }}
      >
        Clear All Experiences
      </Button>

      {/* ✅ Display Videos Layout */}
      <VideoPlayer />
    </Container>
  );
};

export default SharedExperiences;
