import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./VideoPlayer.css";

const ITEMS_PER_PAGE = 8;

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8000/experiences")
      .then((response) => response.json())
      .then((data) => {
        const unique = Array.from(
          new Map(data.map((v) => [v.file_id, v])).values()
        );
        setVideos(unique.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, []);

  const handleOpenVideo = (videoUrl) => setSelectedVideo(videoUrl);
  const handleCloseVideo = () => setSelectedVideo(null);
  const handlePageChange = (_, value) => setPage(value);

  const paginatedVideos = videos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom className="cyberpunk-heading">
        🔮 Shared Experiences
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : videos.length === 0 ? (
        <Typography>No experiences available.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedVideos.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.file_id}>
                <Card
                  className="cyberpunk-card"
                  onClick={() =>
                    handleOpenVideo(
                      `http://localhost:8000/experiences/${video.file_id}`
                    )
                  }
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#111",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <CardContent style={{ padding: "10px" }}>
                    <Typography
                      variant="body2"
                      noWrap
                      className="cyberpunk-text"
                      sx={{ mb: 1 }}
                    >
                      {video.filename}
                    </Typography>

                    <div
                      style={{
                        width: "100%",
                        height: "320px", // Fixed height for 9:16 ratio
                        backgroundColor: "#000",
                        borderRadius: "10px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <video
                        src={`http://localhost:8000/experiences/${video.file_id}`}
                        muted
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Pagination
              count={Math.ceil(videos.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>

          {/* Modal Video Player */}
          <Dialog
            open={Boolean(selectedVideo)}
            onClose={handleCloseVideo}
            maxWidth="lg"
          >
            <DialogContent
              style={{ position: "relative", background: "#0d0d0d" }}
            >
              <IconButton
                onClick={handleCloseVideo}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "white",
                }}
              >
                <CloseIcon />
              </IconButton>
              <video
                src={selectedVideo}
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  borderRadius: "8px",
                }}
                controls
                autoPlay
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
