import { Box } from "@mui/material";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import LiveReportCounter from "../components/LiveReportCounter";
import CallToAction from "../components/CallToAction";

function Home() {
  return (
    <Box sx={{ margin: 0, padding: 0, overflowX: "hidden" }}>
      {/* Fullscreen Hero Section (with video) */}
      <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
        <HeroSection />
      </Box>

      {/* Other content */}
      <Box sx={{ padding: { xs: 2, md: 4 } }}>
        <LiveReportCounter />
        <FeaturesSection />
        <TestimonialsSection />
        <CallToAction />
      </Box>
    </Box>
  );
}

export default Home;
