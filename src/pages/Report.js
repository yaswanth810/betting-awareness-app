import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BugReportIcon from "@mui/icons-material/BugReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import ReportInfluencer from "../pages/ReportInfluencer";
import InfluencerReports from "../pages/InfluencerReports";
import InfluencerReputation from "../pages/InfluencerReputation";
import { BrowserProvider, Contract } from "ethers";
import "./Report.css";

const CONTRACT_ADDRESS = "0xac8C5CC2F0a5D9890CDfA3D3F929cB07395fdF07";

const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "string", name: "description", type: "string" },
      { indexed: false, internalType: "address", name: "reporter", type: "address" },
      { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    name: "ReportSubmitted",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getReport",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "address", name: "reporter", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct ReportSystem.Report",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalReports",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reportCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "reports",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "address", name: "reporter", type: "address" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
    ],
    name: "submitReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const Report = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  const submitReport = async () => {
    if (!name || !description) {
      setStatus("Please enter both Name and Description.");
      return;
    }
    if (!window.ethereum) {
      setStatus("MetaMask is not installed.");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.submitReport(name, description);
      setStatus("Transaction submitted! Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ Report submitted successfully!");
      fetchReports();
    } catch (error) {
      console.error("Transaction failed:", error);
      setStatus("❌ Transaction failed. Check console for details.");
    }
    setLoading(false);
  };

  const fetchReports = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const totalReports = await contract.getTotalReports();
      let reportsList = [];
      for (let i = 0; i < totalReports; i++) {
        try {
          const report = await contract.getReport(i);
          reportsList.push({
            id: report.id.toString(),
            name: report.name,
            description: report.description,
            reporter: report.reporter,
            timestamp: new Date(parseInt(report.timestamp) * 1000).toLocaleString(),
          });
        } catch (error) {
          console.warn(`Skipping invalid report ID: ${i}`);
        }
      }
      setReports(reportsList.reverse());
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <Box className="report-bg">
      <Container maxWidth="md" style={{ padding: "40px 20px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h3" className="cyberpunk-heading" gutterBottom>
            Blockchain Report Portal 🚀
          </Typography>
        </motion.div>

        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          textColor="secondary"
          indicatorColor="secondary"
          centered
          sx={{ mb: 3 }}
        >
          <Tab icon={<BugReportIcon />} label="Submit Report" />
          <Tab icon={<VisibilityIcon />} label="View Reports" onClick={fetchReports} />
          <Tab icon={<PersonAddIcon />} label="Report Influencer" />
          <Tab icon={<GroupsIcon />} label="Influencer Reports" />
          <Tab icon={<GroupsIcon />} label="Influencer Reputation" />
        </Tabs>

        {/* Submit Report */}
        {tabIndex === 0 && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Submit a New Scam Report</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                label="Report Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={submitReport}
                disabled={loading}
                sx={{
                  mt: 2,
                  background: "linear-gradient(90deg, #ff00ff, #00ffff)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "30px",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "🚨 Submit Report"}
              </Button>
              {status && (
                <Alert
                  severity={status.includes("✅") ? "success" : "error"}
                  style={{ marginTop: "15px" }}
                >
                  {status}
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>
        )}

        {/* View Reports */}
        {tabIndex === 1 && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">View Reported Betting Apps</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {reports.map((report) => (
                  <Grid item xs={12} sm={6} key={report.id}>
                    <Paper
                      elevation={6}
                      sx={{
                        padding: 2,
                        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
                        color: "#fff",
                        borderRadius: "12px",
                        border: "1px solid #00ffff",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {report.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {report.description}
                      </Typography>
                      <Typography variant="caption" display="block">
                        <strong>Reporter:</strong> {report.reporter}
                      </Typography>
                      <Typography variant="caption" display="block">
                        <strong>Timestamp:</strong> {report.timestamp}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Report Influencer */}
        {tabIndex === 2 && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Report a Scam Influencer</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ReportInfluencer />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Influencer Reports List */}
        {tabIndex === 3 && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">View Influencer Reports</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InfluencerReports />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Influencer Reputation */}
        {tabIndex === 4 && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Check Influencer Reputation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InfluencerReputation />
            </AccordionDetails>
          </Accordion>
        )}
      </Container>
    </Box>
  );
};

export default Report;
