import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src="/assets/awareness.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: -1,
        }}
      />

      {/* Content */}
      <Box>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", mb: 2, textShadow: "0px 0px 10px cyan" }}
          >
            Decentralized Betting Awareness
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <Typography variant="body1" sx={{ maxWidth: "600px", opacity: 0.9, mb: 4, mx: "auto" }}>
            Protect yourself from betting scams and fraudulent influencers. Report and stay informed.
          </Typography>
        </motion.div>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Button
            variant="contained"
            component={Link}
            to="/report"
            sx={{
              background: "linear-gradient(90deg, #ff00ff, #00ffff)",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              px: 4,
              py: 1.5,
              borderRadius: "30px",
              boxShadow: "0px 0px 15px rgba(255, 0, 255, 0.6)",
              "&:hover": {
                boxShadow: "0px 0px 25px rgba(0, 255, 255, 0.8)",
              },
            }}
          >
            Report a Scam 🚀
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroSection;
