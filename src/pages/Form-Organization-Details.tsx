import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Grid2,
} from "@mui/material";

import { useRegisterFormStore } from "../store";

const organizationDetailsFormSchema = z.object({
  organizaitionName: z.string().min(3),
  organizaitionNameEnglish: z.string().min(3),
  orgazineationType: z.enum(["Company", "Ministry"]),
  mainLocation: z.string().min(2),
});

type FormFields = z.infer<typeof organizationDetailsFormSchema>;

function FormOrganizationDetails() {
  const { setOrganiztionDetails } = useRegisterFormStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      organizaitionName: "شركة البناء العقارية",
      organizaitionNameEnglish: "Real Estate Construction Company",
      orgazineationType: "Company",
      mainLocation: "الرياض",
    },
    resolver: zodResolver(organizationDetailsFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrganiztionDetails(data);
      console.log("Form data saved to Zustand store");
    } catch (error) {
      setError("root", {
        message: "An error occurred while saving the data",
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          backgroundColor: "secondary.main",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "primary.main", mb: 4 }}
        >
          تفاصيل المنظمة
        </Typography>

        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="اسم المنظمة (عربي)"
              variant="outlined"
              {...register("organizaitionName")}
              error={!!errors.organizaitionName}
              helperText={errors.organizaitionName?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
              }}
              inputProps={{ style: { direction: "rtl" } }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="اسم المنظمة (انجليزي)"
              variant="outlined"
              {...register("organizaitionNameEnglish")}
              error={!!errors.organizaitionNameEnglish}
              helperText={errors.organizaitionNameEnglish?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "primary.main" }}>
                نوع المنظمة
              </InputLabel>
              <Select
                {...register("orgazineationType")}
                label=""
                sx={{
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "primary.main" },
                }}
              >
                <MenuItem value="Company">Company</MenuItem>
                <MenuItem value="Ministry">Ministry</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Main Location"
              variant="outlined"
              {...register("mainLocation")}
              error={!!errors.mainLocation}
              helperText={errors.mainLocation?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 2,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "#a67425" },
                color: "secondary.main",
                fontWeight: "bold",
                py: 2,
              }}
            >
              {isSubmitting ? "جاري النقل" : "التالي"}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default FormOrganizationDetails;
