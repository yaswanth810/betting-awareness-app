import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle, #001F3F, #000814)", // Futuristic dark theme
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        color: "white",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgress sx={{ color: "#00AEEF" }} size={80} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, opacity: 0.8 }}>
          Loading... Please wait
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;
