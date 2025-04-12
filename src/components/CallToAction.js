import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        background: "linear-gradient(135deg, #5A189A, #9D4EDD)",
        color: "white",
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Take Action Now!
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
          Help others by reporting scams and sharing experiences.
        </Typography>

        {/* Pulsating Button */}
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
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
      </motion.div>
    </Box>
  );
};

export default CallToAction;
