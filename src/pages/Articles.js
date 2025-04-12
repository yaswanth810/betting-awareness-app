import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const articles = [
  {
    title: "Online Gambling Addict Kills Woman, Steals Gold And Then Burns House",
    date: "March 2025",
    thumbnail:
      "https://c.ndtvimg.com/2022-09/73tco624_mumbai-police-generic-650_625x300_06_September_22.jpg?downsize=773:435",
    content:
      "New Delhi: The government on Thursday cautioned all endorsers and social media influencers to refrain from promoting or advertising, including surrogate advertisements, of offshore online betting and gambling platforms. The Ministry of Information and Broadcasting, in an advisory, said that these advertisements have significant financial and socio-economic implications of online betting and gambling on consumers, particularly the youth. The ministry has further advised the online advertisement intermediaries not to target such promotional content towards Indian audiences, an official statement said. Social media intermediaries have also been advised to conduct sensitisation efforts among their users to refrain from publishing such content, it said.The advisory cautions that failure to comply with it may lead to proceedings under the provisions of the Consumer Protection Act, 2019 including removal or disabling of social media posts or accounts and penal action under the applicable statutes, the statement said.",
  },
  {
    title:
      "Parents, Unable To Repay Son's Online Gambling Debts, Die By Suicide In Andhra Pradesh: Cops",
    date: "April 2025",
    thumbnail:
      "https://c.ndtvimg.com/2022-12/0htt5beg_india-police-generic_625x300_23_December_22.jpg?im=FeatureCrop,algorithm=dnn,width=773,height=435",
    content:
      "Abdullapuram: A married couple died by suicide due to their inability to repay debts incurred by their 22-year-old son through online gambling...",
  },
  {
    title:
      "Refrain From Promoting Offshore Betting Platforms: Centre Cautions Influencers",
    date: "May 2025",
    thumbnail:
      "https://c.ndtvimg.com/2022-06/49ef9qsk_social-media-generic-pixabay_625x300_07_June_22.jpg?downsize=773:435",
    content:
      "New Delhi: The government on Thursday cautioned all endorsers and social media influencers to refrain from promoting or advertising, including surrogate advertisements, of offshore online betting and gambling platforms...",
  },
];

function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <Box sx={{ padding: 4, minHeight: "100vh", background: "#0d0d0d" }}>
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#00eaff",
          textShadow: "0 0 10px #00eaff",
        }}
      >
        Awareness Articles
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 4,
        }}
      >
        {articles.map((article, index) => (
          <Card
            key={index}
            sx={{
              background:
                "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,0,0,0.6))",
              backdropFilter: "blur(8px)",
              border: "1px solid #00eaff55",
              boxShadow: "0 0 15px rgba(0,255,255,0.2)",
              borderRadius: "16px",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 25px #00eaff",
              },
            }}
            onClick={() => setSelectedArticle(article)}
          >
            <CardMedia
              component="img"
              height="180"
              image={article.thumbnail}
              alt={article.title}
              sx={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#ffffff", fontWeight: "bold" }}
              >
                {article.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#999" }}>
                {article.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Full Article Modal */}
      <Dialog
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: "#111",
            color: "#fff",
            border: "1px solid #00eaff55",
            borderRadius: "12px",
          },
        }}
      >
        {selectedArticle && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                color: "#00eaff",
              }}
            >
              {selectedArticle.title}
              <IconButton onClick={() => setSelectedArticle(null)}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {selectedArticle.content}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Articles;
