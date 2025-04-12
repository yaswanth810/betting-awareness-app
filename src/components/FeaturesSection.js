import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Report, Person, Movie } from "@mui/icons-material";

const features = [
  { icon: <Report fontSize="large" />, title: "Report Betting Apps", desc: "Flag illegal betting platforms instantly." },
  { icon: <Person fontSize="large" />, title: "Report Influencers", desc: "Identify and expose fraudulent promotions." },
  { icon: <Movie fontSize="large" />, title: "Share Experiences", desc: "Help others by sharing your insights." },
];

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
        backgroundImage: "url('/assets/neon-grid.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textShadow: "0px 0px 10px cyan" }}>
        Key Features
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  p: 3,
                  boxShadow: 6,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2, color: "cyan" }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
