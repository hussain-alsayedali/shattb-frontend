import {
  Box,
  Button,
  Container,
  Grid2,
  Typography,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import {
  CheckCircle,
  Groups,
  Assignment,
  RequestQuote,
} from "@mui/icons-material";
import HeroComponent from "../components/Hero";
import { useNavigate } from "react-router";

const theme = createTheme();

function LandingPage() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const services = [
    {
      icon: <Groups fontSize="large" />,
      title: "الشراء الجماعي",
      content:
        "خدمة الشراء الجماعي لمختلف مواد التشطيب النهائي مع جدولة المشتريات وفق احتياجات العطاء",
    },
    {
      icon: <Assignment fontSize="large" />,
      title: "الاستشارات",
      content:
        "فريق مختص في مجال المشتريات وحوكمة العقود لتقديم استشارات متخصصة",
    },
    {
      icon: <RequestQuote fontSize="large" />,
      title: "التمويل",
      content: "تمويل فواتير الشراء عبر الاستثمار الجماعي بمشاركة المستثمرين",
    },
  ];

  const benefits = [
    "تحسين ممارسات الشراء",
    "جودة فترة التوريد",
    "مركزية الطلبات",
    "خفض التكاليف",
    "شمولية مواد التشطيب",
    "تمويل فواتير الشراء",
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "" }}>
      {/* <HeroComponent /> */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="h1" gutterBottom>
                منصة شطّب للشراء الجماعي
              </Typography>
              <Typography variant="h5" paragraph>
                حلول مبتكرة لتوريد مواد التشطيب بأسعار تنافسية وخدمات تمويلية
                متكاملة
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
                onClick={() => navigate("/form/organization")}
              >
                سجل الآن
              </Button>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
          منصة شطّب هي منصة تقنية تهدف إلى تسهيل عملية شراء مواد التشطيب النهائي
          للشركات من خلال نموذج الشراء الجماعي للطلبات من مركز واحد، مع تقديم
          خدمات تمويلية متكاملة تلبي احتياجات العملاء بكفاءة عالية.
        </Typography>
      </Container>

      {/* Services Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8, pb: 16 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" color="primary" textAlign="center">
            خدماتنا
          </Typography>
          <Grid2 container spacing={4} sx={{ mt: 4 }}>
            {services.map((service, index) => (
              <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    height: "100%",
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2">{service.content}</Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" color="primary" textAlign="center">
          مميزاتنا
        </Typography>
        <Grid2 container spacing={3} sx={{ mt: 4 }}>
          {benefits.map((benefit, index) => (
            <Grid2 key={index} size={{ xs: 12, md: 6, lg: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CheckCircle color="primary" />
                <Typography variant="body1">{benefit}</Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "secondary.main", color: "white", py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            انضم إلينا الآن واستفد من خدماتنا المميزة
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            onClick={() => navigate("/form/organization")}
          >
            ابدأ الآن
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", py: 4 }}>
        <Container maxWidth="lg">
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                تواصل معنا
              </Typography>
              <Typography variant="body1">الهاتف: 966555555555+</Typography>
              <Typography variant="body1">
                البريد الإلكتروني: support@shatib.com
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                تابعنا
              </Typography>
              <Typography variant="body1">X: @Shatib.sa</Typography>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
