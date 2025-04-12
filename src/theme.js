import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4", // Vibrant cyan for accent
    },
    secondary: {
      main: "#ff4081", // Pinkish contrast color (optional)
    },
    background: {
      default: "#0a0f18", // Deep dark background (Monad-like)
      paper: "#131a24", // Slightly lighter for cards
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0b8c1", // Slightly gray for less emphasis
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 600, fontSize: "2rem" },
    h3: { fontWeight: 500, fontSize: "1.75rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
  },
});

export default theme;
