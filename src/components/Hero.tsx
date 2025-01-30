import { Box, Button, Container, Grid2, Typography } from "@mui/material";

function HeroComponent() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "70vh", md: "90vh" }, // Adjust height dynamically
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(rgba(20,31,44,0.8), rgba(20,31,44,0.9))", // Dark overlay
        backgroundImage: "url('/hero-bg.jpg')", // Optional
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={6} alignItems="center">
          <Grid2
            size={{ xs: 12, md: 6 }}
            textAlign={{ xs: "center", md: "right" }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: "bold",
              }}
            >
              منصة شطّب للشراء الجماعي
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{ opacity: 0.9, fontSize: { xs: "1rem", md: "1.2rem" } }}
            >
              حلول مبتكرة لتوريد مواد التشطيب بأسعار تنافسية وخدمات تمويلية
              متكاملة
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 3,
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.light" },
              }}
            >
              سجل الآن
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default HeroComponent;
