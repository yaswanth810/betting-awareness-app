import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
  Divider,
  Box,
} from "@mui/material";
import {
  Menu,
  Home,
  Article,
  Report,
  Chat,
  Gavel,
  Psychology,
  Support,
  VideoLibrary,
  Settings,
  Leaderboard,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "./Sidebar.css";

const Sidebar = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const pages = [
    { text: "Home", path: "/", icon: <Home /> },
    { text: "Report", path: "/report", icon: <Report /> },
    // { text: "Articles", path: "/articles", icon: <Article /> },
    { text: "Awareness", path: "/experiences", icon: <VideoLibrary /> },
    // { text: "Illegal Apps", path: "/illegal-apps", icon: <Gavel /> },
    { text: "Community Chat", path: "/community-chat", icon: <Chat /> },
    { text: "Companion AI", path: "/companion-ai", icon: <Psychology /> },
    { text: "Emergency Support", path: "/emergency-support", icon: <Support /> },
    
    // 🛠️ Admin & Leaderboard Pages
   // { text: "Manage Influencers", path: "/admin/influencers", icon: <Settings /> },
   // { text: "Influencer Leaderboard", path: "/influencers/leaderboard", icon: <Leaderboard /> },
  ];

  return (
    <>
      {/* Menu Button */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          top: 15,
          left: 15,
          zIndex: 9999,
          backgroundColor: darkMode ? "#001F3F" : "#fff",
          borderRadius: "8px",
          padding: "6px",
        }}
      >
        <Menu sx={{ color: darkMode ? "cyan" : "black" }} />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 240,
            background: darkMode ? "rgba(0,0,0,0.85)" : "#111",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 0px 20px rgba(0,255,255,0.3)",
            color: "white",
          },
        }}
      >
        {/* Logo & Title */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Box sx={{ p: 2, mt: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "cyan", whiteSpace: "nowrap" }}
            >
              🚀 Betting Awareness
            </Typography>
          </Box>
        </motion.div>

        <Divider sx={{ borderColor: "cyan", mb: 1 }} />

        {/* Menu Items */}
        <List>
          {pages.map((page, idx) => (
            <Link
              to={page.path}
              key={idx}
              style={{ textDecoration: "none" }}
              onClick={() => setOpen(false)}
            >
              <ListItem
                button
                sx={{
                  color: location.pathname === page.path ? "cyan" : "white",
                  "&:hover": { backgroundColor: "rgba(0,255,255,0.1)" },
                }}
              >
                <Tooltip title={page.text} placement="right">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    {page.icon}
                  </Box>
                </Tooltip>
                <ListItemText primary={page.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
