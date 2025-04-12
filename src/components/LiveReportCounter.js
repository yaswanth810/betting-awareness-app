import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const LiveReportCounter = () => {
  const [reportCount, setReportCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const response = await fetch("https://your-api.com/reports/count");
        const data = await response.json();
        setReportCount(data.count);
      } catch (error) {
        console.error("Error fetching report count:", error);
        setReportCount(5000);
      } finally {
        setLoading(false);
      }
    };

    fetchReportCount();
    const interval = setInterval(fetchReportCount, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {loading ? (
        <CircularProgress sx={{ color: "#00AEEF" }} size={30} />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#00FFCC" }}>
            🌍 {reportCount.toLocaleString()} Reports Submitted
          </Typography>
        </motion.div>
      )}
    </Box>
  );
};

export default LiveReportCounter;
