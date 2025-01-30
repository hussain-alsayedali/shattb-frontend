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
import { Controller } from "react-hook-form";
import { useRegisterFormStore } from "../store";
import { useNavigate } from "react-router";

const organizationDetailsFormSchema = z.object({
  organizationName: z.string().min(3, "يرجى تزويد اسم المنظمة من 3 حروف"),
  organizationNameEnglish: z
    .string()
    .min(3, "يرجى تزويد اسم المنظمة من 3 حروف"),
  organizationType: z.enum(["Company", "Ministry"], {
    required_error: "يرجى اختيار نوع المنظمة",
    invalid_type_error: "النوع المدخل غير صحيح",
  }),
  mainLocation: z.string().min(3, "يرجى تزويد موقع المنظمة من 3 حروف"),
});

type FormFields = z.infer<typeof organizationDetailsFormSchema>;

function FormOrganizationDetails() {
  const navigate = useNavigate();
  const { setOrganiztionDetails } = useRegisterFormStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormFields>({
    defaultValues: {
      organizationName: "شركة البناء العقارية",
      organizationNameEnglish: "Real Estate Construction Company",
      mainLocation: "الرياض",
    },
    resolver: zodResolver(organizationDetailsFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setOrganiztionDetails(data);
      navigate("/form/user"); // Navigate to next step
    } catch (error) {
      setError("root", { message: "حدث خطأ أثناء حفظ البيانات" });
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
              {...register("organizationName")}
              error={!!errors.organizationName}
              helperText={errors.organizationName?.message}
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
              {...register("organizationNameEnglish")}
              error={!!errors.organizationNameEnglish}
              helperText={errors.organizationNameEnglish?.message}
              sx={{
                "& label": { color: "primary.main" },
                "& input": { color: "white" },
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="organizationType"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.organizationType}>
                  <InputLabel sx={{ color: "primary.main" }}>
                    نوع المنظمة
                  </InputLabel>
                  <Select
                    {...field}
                    label="نوع المنظمة"
                    sx={{
                      color: "white",
                      "& .MuiSvgIcon-root": { color: "primary.main" },
                    }}
                  >
                    <MenuItem value="Company">Company</MenuItem>
                    <MenuItem value="Ministry">Ministry</MenuItem>
                  </Select>
                  {errors.organizationType && (
                    <Typography color="error" variant="caption">
                      {errors.organizationType.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="الفرع الرئيسي"
              variant="outlined"
              {...register("mainLocation")}
              error={!!errors.mainLocation}
              helperText={errors.mainLocation?.message}
              inputProps={{ style: { direction: "rtl" } }}
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
