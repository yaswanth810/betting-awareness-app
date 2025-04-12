import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import axios from "axios";

const InfluencerReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:8000/influencer-reports");
        setReports(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to load influencer reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={4} p={3} sx={{ backgroundColor: "#1e1e1e", borderRadius: "8px" }}>
        <Typography variant="h5" gutterBottom>
          Influencer Scam Reports
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && reports.length === 0 && (
          <Typography variant="body1" color="gray">
            No reports available at the moment.
          </Typography>
        )}

        <List>
          {reports.map((report) => (
            <ListItem key={report._id} divider>
              <ListItemText
                primary={
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h6">👤 {report.influencer_name}</Typography>
                    <Chip label={report.platform} variant="outlined" />
                  </Stack>
                }
                secondary={
                  <Box mt={1}>
                    <Typography variant="body2" color="gray">
                      📄 {report.scam_details}
                    </Typography>
                    {report.evidence_link && (
                      <Typography variant="body2" color="gray">
                        🔗{" "}
                        <a
                          href={report.evidence_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#66ccff" }}
                        >
                          View Evidence
                        </a>
                      </Typography>
                    )}
                    {report.timestamp && (
                      <Typography variant="body2" color="gray">
                        🕒 {new Date(report.timestamp).toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default InfluencerReports;