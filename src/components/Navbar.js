import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ethers } from "ethers";

const Navbar = ({ toggleTheme, darkMode }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (Array.isArray(accounts) && accounts[0]) {
          setWalletAddress(accounts[0]);
        }
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0 && typeof accounts[0] === "string") {
          setWalletAddress(accounts[0]);
        }
      }
    };
    checkWallet();
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: darkMode ? "#111" : "#fff",
        color: darkMode ? "cyan" : "#000",
        boxShadow: "0px 0px 10px rgba(0,255,255,0.3)",
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Website Title */}
        <Typography
  variant="h5"
  sx={{ py: 2, px: 5, fontWeight: "bold", color: "cyan", textAlign: "center" }}
> Betting Awareness🚀
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Connect Wallet Button */}
          <Button
            variant="outlined"
            onClick={connectWallet}
            sx={{
              borderColor: "cyan",
              color: "cyan",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(0,255,255,0.1)",
              },
            }}
          >
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
