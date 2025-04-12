// src/pages/CompanionAI.js

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  Fade,
  Container,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import "./companion.css";

const CompanionAI = () => {
  const [userMessage, setUserMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    setConversation((prev) => [...prev, { from: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/companion-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_message: userMessage }),
      });
      const data = await res.json();
      setConversation((prev) => [...prev, { from: "ai", text: data.response }]);
    } catch {
      setConversation((prev) => [
        ...prev,
        { from: "ai", text: "⚠️ AI unavailable. Please try again later." },
      ]);
    } finally {
      setUserMessage("");
      setLoading(false);
    }
  };

  return (
    <Box className="cyber-bg" sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" className="glitch-text" gutterBottom align="center">
          💬 Companion AI
        </Typography>

        <Box className="chat-window">
          {conversation.map((msg, idx) => (
            <Fade in key={idx}>
              <Paper
                elevation={3}
                className={`chat-bubble ${msg.from === "ai" ? "ai" : "user"}`}
              >
                <Avatar sx={{ mr: 1, bgcolor: msg.from === "ai" ? "#00f2ff" : "#ff0099" }}>
                  {msg.from === "ai" ? <SmartToyIcon /> : <PersonIcon />}
                </Avatar>
                <Typography>{msg.text}</Typography>
              </Paper>
            </Fade>
          ))}
          {loading && (
            <Paper className="chat-bubble ai">
              <CircularProgress size={20} sx={{ mr: 2 }} /> Typing...
            </Paper>
          )}
        </Box>

        <Box
          mt={2}
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          gap={2}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your thoughts..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={loading}
            sx={{ minWidth: isMobile ? "100%" : "150px" }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CompanionAI;
