import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Marquee from "react-fast-marquee"; // 🔥 Scrolling message library

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Articles from "./pages/Articles";
import Experiences from "./pages/Experiences";
import IllegalApps from "./pages/IllegalApps";
import ReportInfluencer from "./pages/ReportInfluencer";
import InfluencerReports from "./pages/InfluencerReports";
import CompanionAI from "./pages/CompanionAI";
import EmergencySupport from "./pages/EmergencySupport";
import CommunityChat from "./pages/CommunityChat";



// Sidebar width
const SIDEBAR_WIDTH = 240;

// Themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#007BFF" },
    secondary: { main: "#00AEEF" },
    background: { default: "#F5F9FF", paper: "#FFFFFF" },
    text: { primary: "#0A2540", secondary: "#0056B3" },
  },
  typography: { fontFamily: "Inter, sans-serif" },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00AEEF" },
    secondary: { main: "#00FFCC" },
    background: { default: "#001F3F", paper: "#002B5B" },
    text: { primary: "#FFFFFF", secondary: "#00FFCC" },
  },
  typography: { fontFamily: "Inter, sans-serif" },
});

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate loading
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Box sx={{ display: "flex", overflowX: "hidden" }}>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} width={SIDEBAR_WIDTH} />

            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Navbar toggleTheme={toggleTheme} darkMode={darkMode} toggleSidebar={toggleSidebar} />

              {/* 🔻 Scrolling Awareness Ticker Bar */}
              <Box
                sx={{
                  backgroundColor: darkMode ? "#ff0055" : "#ffc107",
                  color: darkMode ? "#ffffff" : "#000000",
                  py: 1,
                  px: 2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderBottom: "2px solid",
                  borderColor: darkMode ? "#ff99cc" : "#ff4444",
                  overflow: "hidden",
                }}
              >
                <Marquee pauseOnHover gradient={false} speed={60}>
                  ⚠️ Stop Betting, Start Living — Say NO to Online Gambling! 🚫 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  Raise Awareness. Save Lives. 💡 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Choose Future, Not Addiction 🔒
                </Marquee>
              </Box>

              <Box
                component="main"
                sx={{
                  padding: 1,
                  mt: "2px",
                  minHeight: "100vh",
                  overflowX: "hidden",
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/illegal-apps" element={<IllegalApps />} />
                  <Route path="/report-influencer" element={<ReportInfluencer />} />
                  <Route path="/influencer-reports" element={<InfluencerReports />} />
                  <Route path="/community-chat" element={<CommunityChat />} />
                  <Route path="/companion-ai" element={<CompanionAI />} />
                  <Route path="/emergency-support" element={<EmergencySupport />} />
                  
                </Routes>
              </Box>
            </Box>
          </Box>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
