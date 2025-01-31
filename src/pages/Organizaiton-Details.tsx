import { useState, useEffect } from "react";
import { useAuthStore } from "../store";
import {
  Container,
  Grid2,
  Paper,
  Typography,
  Box,
  Skeleton,
  Alert,
  Divider,
  Card,
  CardContent,
  Stack,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import {
  Business,
  LocationOn,
  People,
  AccountBalance,
  Email,
  Phone,
  Logout,
} from "@mui/icons-material";
import axiosInstance from "../api/axios-instance";
import { useNavigate } from "react-router";

interface OrganizationResponse {
  id: string;
  organizaitionName: string;
  organizaitionNameEnglish: string;
  organizaitionType: "Company" | "Ministry";
  location: string;
  numberOfEmployees: number;
  numberOfBranches: number;
  email: string;
  phoneNumber: string;
  mainLocation: string;
}

function OrganizationDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { details, setDetails, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    async function fetchOrganizationDetails() {
      // Get token using getState() instead of hook
      const idToken = useAuthStore.getState().idToken;

      if (!idToken) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/organizaition", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        console.log("Response:", response.data);
        setDetails(response.data);
      } catch (error) {
        setError("Failed to fetch organization details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrganizationDetails();
  }, [setDetails]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid2 container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={item}>
              <Skeleton variant="rectangular" height={118} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <AppBar position="static" sx={{ bgcolor: "secondary.main" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Organization Dashboard
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={handleLogout}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            bgcolor: "secondary.main",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              {details?.organizaitionNameEnglish}
            </Typography>
            <Typography variant="h5">{details?.organizaitionName}</Typography>
          </Box>
        </Paper>

        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Business sx={{ color: "primary.main", fontSize: 30 }} />
                  <Typography variant="h6">نوع المنظمة</Typography>
                </Stack>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  {details?.organizaitionType}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <LocationOn sx={{ color: "primary.main", fontSize: 30 }} />
                  <Typography variant="h6">الموقع الرئيسي</Typography>
                </Stack>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  {details?.mainLocation}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <People sx={{ color: "primary.main", fontSize: 30 }} />
                  <Typography variant="h6">عدد الموظفين</Typography>
                </Stack>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  {details?.numberOfEmployees}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <AccountBalance
                    sx={{ color: "primary.main", fontSize: 30 }}
                  />
                  <Typography variant="h6">عدد الفروع</Typography>
                </Stack>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  {details?.numberOfBranches}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Email sx={{ color: "primary.main", fontSize: 30 }} />
                  <Typography variant="h6">البريد الإلكتروني</Typography>
                </Stack>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  {details?.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Phone sx={{ color: "primary.main", fontSize: 30 }} />
                  <Typography variant="h6">رقم الهاتف</Typography>
                </Stack>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  {details?.phoneNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default OrganizationDetails;
