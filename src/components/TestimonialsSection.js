import { Box, Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Alice Johnson",
    text: "This platform saved me from a scam betting app. Highly recommended!",
    avatar: "/assets/user1.jpg",
  },
  {
    name: "Michael Smith",
    text: "I reported a fraudulent influencer, and action was taken quickly!",
    avatar: "/assets/user2.jpg",
  },
  {
    name: "Sophie Lee",
    text: "Sharing my experience helped others. Love the transparency!",
    avatar: "/assets/user3.jpg",
  },
];

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
        background: "linear-gradient(135deg, #240046, #5A189A)",
        color: "white",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textShadow: "0px 0px 10px cyan" }}>
        What People Are Saying
      </Typography>

      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card
              sx={{
                borderRadius: 3,
                p: 3,
                mx: 2,
                boxShadow: 6,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                color: "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar src={testimonial.avatar} sx={{ width: 60, height: 60, mx: "auto", mb: 2 }} />
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "{testimonial.text}"
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 2, color: "cyan" }}>
                  - {testimonial.name}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialsSection;
